import React, { useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import {CheckBox, ThemeContext, ThemeProvider} from 'react-native-elements';
import Svg, {Circle, Rect, Line} from 'react-native-svg';
import axios from 'axios';

import { GroceryStackParamList } from './Groceries';
import { addGrocery, searchItem } from '../utils/api';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFF2F4',
        borderRadius: 3,
        height: 41,
        width: 299
    }
});

type GroceryNavigationProp = NativeStackScreenProps<GroceryStackParamList, 'Search'>;

const SearchScreen = () => {
    const [isLoading, setLoading] = useState(true);
    const user = useSelector((state:any) => state.user);
    let user_id = user[0].id;
    
    const [searchData, setSearchData] = useState([]);
    useEffect(() => {
        getSearchData();
    }, []);
    const [search, setSearch] = React.useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [itemID, setItemID] = useState('');
    
    const getSearchData = async() => {
        try {
            const response:any = await searchItem();
            setSearchData(response);
            setSuggestions(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (entry:any) => {
        let items:any = searchData;
        let matches:any = [];
        if (entry.text.length > 0) {
            let matches = items.filter((item:any) => {
                const regex = new RegExp(`${entry.text}`, "gi");
                return item['name'].match(regex);
            });
            setSuggestions(matches);
        }
        setSearch(entry.text);
    }

    const handleSuggestion = (text:string, id:string) => {
        setSearch(text);
        setItemID(id);
        setSuggestions([]);
    }

    const addGroceryItem = async (item_name:string, query_id:string) => {
        try {
            const response = await addGrocery(user_id, item_name, query_id);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView>
        <SafeAreaView>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center', width: 355}}>
                    <View style={{flexDirection: "row", flex: 4, width: 280, height: 44, borderRadius: 5, backgroundColor: "#F5F5F5"}}>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
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
                        <TouchableOpacity style={{backgroundColor: '#FFEDE9', width: 71, height: 43, borderRadius: 5, borderWidth: 1, borderColor: "#E76F51", justifyContent: "center", alignItems: 'center'}} 
                        accessibilityLabel="Click to add an item." onPress={() => addGroceryItem(search, itemID)}>
                            <Text style={{textAlign: "center", color: "#E76F51", fontStyle: "normal", fontWeight: "bold", fontFamily: "Inter", fontSize: 13, lineHeight: 18, alignItems: "center"}}>
                                ADD
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                <FlatList data={suggestions} keyExtractor={(item:any) => item['id'].toString()} renderItem={({item, index}) => {
                    return (
                        <View style={{backgroundColor: "#F0F0F0", width: 280, height: 55}}>
                        <TouchableWithoutFeedback style={{backgroundColor: "#F0F0F0", width: 280, height: 55}} onPress={() => handleSuggestion(item['name'], item['id'].toString())}>
                            <View>
                                <Text style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: "normal", fontSize: 14, lineHeight: 18, display: "flex", alignItems: "center", color: "#424B5A", 
                                position: "absolute"}}>
                                    {item['name']}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        </View>
                    )
                }}/>
                </View>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: "500", fontSize: 15, lineHeight: 38, display: "flex", alignItems: "center", textAlign: "center", color: "#424B5A"}}>
                        Search for items to add
                    </Text>
                    <Text style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: "normal", fontSize: 12, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: "#C2D1D9"}}>
                        Tap on the search bar to look for ingredients
                    </Text>
                </View>
            </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default SearchScreen;