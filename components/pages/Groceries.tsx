import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {CheckBox, ThemeProvider} from 'react-native-elements';
import axios from 'axios';

import SearchScreen from './Search';
import { deleteItemAsync } from 'expo-secure-store';
import { RootStackParamList } from '../NavigationBar';

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

export type GroceryStackParamList = {
    Groceries: undefined,
    Search: undefined
}

type GroceryNavigationProp = NativeStackScreenProps<GroceryStackParamList, 'Groceries'>;

const GroceryScreen = ({ navigation }: any) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const getData = async() => {
        try {
            const response = await fetch('https://food-ping.herokuapp.com/getGroceries?user_id=1');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
            var grocery_dict:any = {}
            let error_message: string = "Your grocery list is empty";
            grocery_dict["grocery_item_name"] = error_message;
            setData(grocery_dict);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = useCallback((item) => {
        console.log(item);
        const id = item.grocery_item_id;
        //console.log(...checkedItems);
        let items:any[] = [...checkedItems];
        console.log(items);
        setCheckedItems((prevState) => ({
            ...prevState, id: 'isChecked'
        }));
        console.log(items);
        //items[index].isChecked = e.target.checked;
        //setCheckedItems(items);
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
            <Button color='#2A9D8F' accessibilityLabel="Click to Add Item." title="ADD ITEM" onPress={() => navigation.navigate('Search')} />
            <Button color='#e76f51' accessibilityLabel="Click to Delete All Items." title="DELETE ALL" onPress={() => deleteAll()} />
            <Text>Grocery</Text>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList data={data.filter((item) => item['display_tag'] === 'not deleted')} keyExtractor={(item:any) => item['grocery_item_id'].toString()} renderItem={({item, index}) => {
                    return (
                        <View>
                            <CheckBox 
                                title={item['grocery_item_name']}
                                /*status={item['grocery_tag'] ? 'bought': 'not bought'}*/
                                onPress={() => handleChange(item)}>
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