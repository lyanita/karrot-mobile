import React, { useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import {CheckBox, ThemeContext, ThemeProvider} from 'react-native-elements';
import Svg, {Circle, Rect, Line} from 'react-native-svg';
import axios from 'axios';

import SearchScreen from './Search';
import { RootStackParamList } from '../components/NavigationBar';
import { updateList } from '../components/redux/list';
import { getGrocery, editGroceryTag, editDisplayTag } from '../utils/api';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFF2F4',
        borderRadius: 3,
        height: 41,
        width: 299
    }
});

type ScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Groceries'>;

const Stack = createNativeStackNavigator();

const GroceryStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="List" component={GroceryScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
    )
}

export type GroceryStackParamList = {
    List: undefined,
    Search: undefined
}

type GroceryNavigationProp = NativeStackScreenProps<GroceryStackParamList, 'List'>;

const GroceryScreen = ({ navigation }: any) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getGroceryData();
    }, []);
    const [checkedItems, setCheckedItems] = useState([]);
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        console.log(checkedItems);
    }, [checkedItems]);
    const [isLoading, setLoading] = useState(true);
    const user = useSelector((state:any) => state.user);
    let user_id = user[0].id;
    const dispatch = useDispatch();

    const setGroceryError = () => {
        var grocery_dict:any = {}
        let error_message: string = "Your grocery list is empty";
        grocery_dict["grocery_item_name"] = error_message;
        var grocery_arr:any = [];
        grocery_arr.push(grocery_dict);
        setData(grocery_arr);
    }

    const setGroceryData = (response:any) => {
        if (response.indexOf("Invalid") === -1) {
            setData(response);
            setCheckedData(response);
            dispatch(updateList(response));
        } else {
            setGroceryError();
        }
    }

    const setCheckedData = (response:any) => {
        let checked:any = {};
        response.forEach((element:any) => {
            if (element['grocery_tag'] === "not bought") {
                checked[element['grocery_item_id']] = false;
            } else if (element['grocery_tag'] === "bought") {
                checked[element['grocery_item_id']] = true;
            }
        });
        setCheckedItems(checked);
    }

    const getGroceryData = async() => {
        try {
            const response:any = await getGrocery(user_id);
            console.log(response);
            setGroceryData(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = useCallback(async (item) => {
        const item_id = item.grocery_item_id;
        let currentItems:any = checkedItems;
        let checkedState = currentItems[item_id];
        let tag = checkedState ? 'not bought':'bought';
        try {
            const response = await editGroceryTag(user_id, item_id, tag);
            console.log(response);
        } catch (error) {
            console.error(error);
        } finally {
            getGroceryData();
        }
    }, [checkedItems]);


    const deleteItems = async(item_id:number=0) => {
        try {
            if (item_id === 0) {
                let grocery_data = data.filter((item) => item['display_tag'] === 'not deleted');
                let ids_arr = grocery_data.map(item => item['grocery_item_id']);
                let item_ids = ids_arr.join();
                const response = await editDisplayTag(user_id, item_ids, "deleted");
                console.log(response);
            } else {
                const response = await editDisplayTag(user_id, item_id, "deleted");
                console.log(response);
            }
        } catch (error) {
            console.error(error);
        } finally {
            getGroceryData();
        }
    }

    return (
        <ScrollView>
        <SafeAreaView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection:"row"}}>
                <View style={{flex:1, marginRight:5}}>
                    <TouchableOpacity style={{backgroundColor:'#EAF5F5', width:128, height:41, borderRadius:20, borderWidth:1, borderColor:"#2A9D8F", justifyContent:"center"}} 
                    accessibilityLabel="Click to add an item." onPress={() => navigation.navigate('Search')}>
                        <Text style={{textAlign:"center", color:"#2A9D8F", fontStyle: "normal", fontWeight:"bold", fontFamily:"Inter", fontSize:13, lineHeight:18, alignItems:"center"}}>
                            ADD ITEM
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1, marginLeft:5}}>
                    <TouchableOpacity style={{backgroundColor:'#FFEDE9', width:128, height:41, borderRadius:20, borderWidth:1, borderColor:"#E76F51", justifyContent:"center"}} 
                    accessibilityLabel="Click to delete all items." onPress={() => deleteItems()}>
                        <Text style={{textAlign:"center", color:"#E76F51", fontStyle: "normal", fontWeight:"bold", fontFamily:"Inter", fontSize:13, lineHeight:18, alignItems:"center"}}>
                            DELETE ALL
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList data={data.filter((item) => item['display_tag'] === 'not deleted')} keyExtractor={(item:any) => item['grocery_item_id'].toString()} renderItem={({item, index}) => {
                    return (
                        <View style={{flexDirection:"row"}}>
                            <CheckBox 
                                title={item['grocery_item_name']}
                                onPress={() => handleChange(item)}
                                checked={checkedItems[item.grocery_item_id]}
                                style={{flex:1}}
                                uncheckedIcon={<Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                                    <Circle cx="9.5" cy="9.5" r="9" fill="white" stroke="#2A9D8F"/>
                                </Svg>}
                                checkedIcon={<Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                                    <Circle cx="9.5" cy="9.5" r="9" fill="#2A9D8F" stroke="#2A9D8F"/>
                                        <Rect width="6.71535" height="2.77135" rx="1.38567" transform="matrix(0.816833 0.576874 -0.548666 0.836042 4.74023 9.70703)" fill="white"/>
                                        <Rect width="12.4565" height="2.43489" rx="1.21744" transform="matrix(0.53413 -0.845402 0.826606 0.56278 6.73438 14.5308)" fill="white"/>
                                </Svg>}>
                            </CheckBox>
                            <TouchableOpacity style={{flex:1, justifyContent:"center"}} onPress={() => deleteItems(item['grocery_item_id'],)}>
                                <Svg width="16" height="15" viewBox="0 0 16 15" fill="none">
                                    <Line x1="13.7027" y1="1.4106" x2="2.41794" y2="12.7531" stroke="#2A9D8F" strokeWidth="4"/>
                                    <Line x1="13.7315" y1="12.7245" x2="2.38894" y2="1.43967" stroke="#2A9D8F" strokeWidth="4"/>
                                </Svg>
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