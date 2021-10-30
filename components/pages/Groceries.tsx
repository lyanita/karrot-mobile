import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {CheckBox, ThemeProvider} from 'react-native-elements';
import axios from 'axios';

import SearchScreen from './Search';
import { deleteItemAsync } from 'expo-secure-store';
import RootStackParamList from '../NavigationBar';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        //border: '1px solid #C2D1D9',
        //boxSizing: 'border-box',
        borderRadius: 3,
        height: 41,
        width: 299
    }
});

type ScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Groceries'>;

const Stack = createNativeStackNavigator();

const GroceryStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Groceries" component={GroceryScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
    )
}

const GroceryScreen = ({ navigation }: ScreenNavigationProp) => {
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
        let items:any[] = [...checkedItems];
        items[index].isChecked = e.target.checked;
        setCheckedItems(items);
    }, [checkedItems]);

    const deleteItem = async (user_id:any, item_id:any) => {
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
            <Button color='#2A9D8F' accessibilityLabel="Click to Add Item." title="ADD ITEM" color='green' onPress={() => navigation.navigate('Search')} />
            <Button color='#e76f51' accessibilityLabel="Click to Delete All Items." title="DELETE ALL" onPress={() => deleteAll()} />
            <Text>Grocery</Text>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList data={data.filter((item) => item['display_tag'] === 'not deleted')} keyExtractor={(item) => item['grocery_item_id'].toString()} renderItem={({item, index}) => {
                    return (
                        <View>
                            <CheckBox 
                                title={item['grocery_item_name']}
                                checked={checkedItems}
                                onPress={() => handleChange()}>
                            </CheckBox>
                            <TouchableOpacity onPress={() => deleteItem(item['user_id'], item['grocery_item_id'],)}>
                                <Text>X</Text>
                            </TouchableOpacity>
                        </View>
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