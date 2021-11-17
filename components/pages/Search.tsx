import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import {CheckBox, ThemeContext, ThemeProvider} from 'react-native-elements';
import Svg, {Circle, Rect, Line} from 'react-native-svg';
import axios from 'axios';

import { GroceryStackParamList } from './Groceries';

type GroceryNavigationProp = NativeStackScreenProps<GroceryStackParamList, 'Search'>;

const SearchScreen = () => {
    const [search, setSearch] = React.useState('');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [itemID, setItemID] = useState('');
    const getData = async() => {
        try {
            const response:any = await axios.get('https://food-ping.herokuapp.com/searchItem', {
                params: { item: "fresh" },
              });
            //const json = await response;
            console.log(response['data']);
            setData(response['data']);
            setSuggestions(response['data']);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (entry:any) => {
        console.log(entry.text);
        let items:any = data;
        let matches:any = [];
        if (entry.text.length > 0) {
            let matches = items.filter((item:any) => {
                const regex = new RegExp(`${entry.text}`, "gi");
                return item['name'].match(regex);
            });
            console.log(matches);
            setSuggestions(matches);
            console.log(suggestions);
        }
        setSearch(entry.text);
    }

    const handleSuggestion = (text:string, id:string) => {
        setSearch(text);
        setItemID(id);
        setSuggestions([]);
    }

    const addGroceryItem = async (item_name:string, user_id:string, query_id:string) => {
        try {
            const response = await axios.post(`https://food-ping.herokuapp.com/addGroceryItem?user_id=${user_id}&item_name=${item_name}&query_id=${query_id}`);
            console.log(response);
        } catch (error) {
            console.error(error);
        } finally {

        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <ScrollView>
        <SafeAreaView>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center', width: 355}}>
                    <View style={{flexDirection: "row", flex: 4, width: 280, height: 44, borderRadius: 5, backgroundColor: "#F5F5F5"}}>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Svg width="18" height="20" viewBox="0 0 18 20" fill="none" /*xmlns="http://www.w3.org/2000/svg"*/>
                                <Circle cx="7" cy="7" r="6" stroke="#A1AEB7" strokeWidth="2"/>
                                <Line x1="11.4142" y1="12" x2="15" y2="15.5858" stroke="#A1AEB7" strokeWidth="2" strokeLinecap="round"/>
                            </Svg>
                        </View>
                        <View style={{flex:10}}>
                            <TextInput placeholder="Search to Add Items"
                                placeholderTextColor="#C2D1D9" 
                                value={search}
                                onChangeText={text => handleChange({text})}
                                style={{width: 263, height: 44, backgroundColor: "#F5F5F5", borderWidth: 0}}>
                            </TextInput>
                        </View>
                    </View>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', width:71, height:43}}>
                        <TouchableOpacity style={{backgroundColor: '#FFEDE9', width: 71, height: 43, borderRadius: 5, borderWidth: 1, borderColor: "#E76F51", justifyContent: "center", alignItems: 'center'}} accessibilityLabel="Click to Add an Item." onPress={() => addGroceryItem(search, '3', itemID)}>
                            <Text style={{textAlign: "center", color: "#E76F51", fontStyle: "normal", fontWeight: "bold", fontFamily: "Inter", fontSize: 13, lineHeight: 18, alignItems: "center"}}>ADD</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                <FlatList data={suggestions} keyExtractor={(item:any) => item['id'].toString()} renderItem={({item, index}) => {
                    return (
                        <View style={{backgroundColor: "#F0F0F0", width: 280, height: 55}}>
                        <TouchableWithoutFeedback style={{backgroundColor: "#F0F0F0", width: 280, height: 55}} onPress={() => handleSuggestion(item['name'], item['id'].toString())}>
                            <View>
                                <Text style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: "normal", fontSize: 14, lineHeight: 18, display: "flex", alignItems: "center", color: "#424B5A", position: "absolute"}}>
                                    {item['name']}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        </View>
                    )
                }}/>
                </View>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: "500", fontSize: 15, lineHeight: 38, display: "flex", alignItems: "center", textAlign: "center", color: "#424B5A"}}>Search for items to add</Text>
                    <Text style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: "normal", fontSize: 12, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: "#C2D1D9"}}>Tap on the search bar to look for ingredients</Text>
                </View>
            </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default SearchScreen;