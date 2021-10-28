import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {CheckBox, ThemeProvider} from 'react-native-elements';
import axios from 'axios';

import SearchScreen from './Search';
import { deleteItemAsync } from 'expo-secure-store';

const Stack = createNativeStackNavigator();

const GroceryStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Groceries" component={GroceryScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
    )
}

const GroceryScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [checkedItems, setCheckedItems] = useState();
    const getData = async() => {
        try {
            const response = await fetch('https://food-ping.herokuapp.com/getGroceries?user_id=1');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
            setData([{"grocery_item_name": "Your grocery list is empty"}]);
        } finally {
            setLoading(false);
        }
    }
    const handleChange = useCallback((e) => {
        const index = e.target.name;
        let items = [...checkedItems];
        items[index].isChecked = e.target.checked;
        setCheckedItems(items);
    }, [checkedItems]);

    const deleteItem = async (user_id, item_id) => {
        try {
            const response = await axios.put(`https://food-ping.herokuapp.com/editDisplayTag?tag=deleted&user_id=${user_id}&item_id=${item_id}`);
            console.log(response);
        } catch (error) {
            console.error(error);
        } finally {

        }
    }

    const deleteAll = async () => {
        console.log(data);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <ScrollView>
        <SafeAreaView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button title="ADD ITEM" color='green' onPress={() => navigation.navigate('Search')} />
            <Button title="DELETE ALL" onPress={() => deleteAll()} />
            <Text>Grocery</Text>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList data={data.filter((item) => item.display_tag === 'not deleted')} keyExtractor={(item) => item.grocery_item_id.toString()} renderItem={({item, index}) => {
                    return (
                        <div>
                        <CheckBox 
                        title={item.grocery_item_name}
                        checked={checkedItems}
                        onPress={() => handleChange()}>
                        </CheckBox>
                        <Button title="X" onPress={() => deleteItem(item.user_id, item.grocery_item_id,)}></Button>
                        </div>
                    );
                }}
                />
            )}
        </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default GroceryStack;