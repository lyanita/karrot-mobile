import React, { useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import {CheckBox, ThemeContext, ThemeProvider} from 'react-native-elements';
import Svg, {Circle, Rect, Line} from 'react-native-svg';
import axios from 'axios';

import { RootStackParamList } from '../components/NavigationBar';
import { updateInventory } from '../components/redux/inventory';
import { getInventory, editInventoryTag, editUsageTag } from '../utils/api';
import { expiry } from '../utils/expiry';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFF2F4',
        borderRadius: 3,
        height: 41,
        width: 299
    }
});

type ScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Fridge'>;

const FridgeScreen = ({ navigation }: any) => {
    const [isLoading, setLoading] = useState(true);
    const user = useSelector((state:any) => state.user);
    let user_id = user[0].id;
    const dispatch = useDispatch();

    const [fridgeData, setFridgeData] = useState([]);
    useEffect(() => {
        getInventoryData();
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

    const setInventoryError = () => {
        var fridge_dict:any = {}
        let error_message: string = "Your fridge is empty";
        fridge_dict["inventory_item_name"] = error_message;
        var fridge_arr:any = [];
        fridge_arr.push(fridge_dict);
        setFridgeData(fridge_arr);
    }

    const setInventoryData = (response:any) => {
        if (response.indexOf("Invalid") === -1) {
            setFridgeData(response);
            setCheckedData(response);
            dispatch(updateInventory(response));
        } else {
            setInventoryError();
        }
    }

    const setCheckedData = (response:any) => {
        let checked:any = {};
        response.forEach((element:any) => {
            checked[element['inventory_item_id']] = false;
        });
        setCheckedItems(checked);
    }

    const getInventoryData = async() => {
        try {
            const response:any = await getInventory(user_id);
            console.log(response);
            setInventoryData(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = useCallback(async (item) => {
        const item_id:any = item.inventory_item_id;
        const user_id = item.user_id;
        let currentItems:any = checkedItems;
        let checkedState = currentItems[item_id] ? true : false;
        console.log(checkedState);
        setCheckedItems((prevState:any) => ({
            ...prevState, 
            [item_id]: !checkedState
        }));
    }, [checkedItems]);

    const markStatus = async (tag:string) => {
        let checked_data = Object.keys(checkedItems).filter((key:any) => checkedItems[key] === true)
        let item_ids = checked_data.join();
        try {
            if (tag === "used") {
                const response = await editUsageTag(user_id, item_ids, "used");
                console.log(response);
            } else if (tag === "tossed") {
                const response = await editUsageTag(user_id, item_ids, "tossed");
                console.log(response);
            }
        } catch (error) {
            console.error(error);
        } finally {
            getInventoryData();
        }
    }

    return (
        <ScrollView>
        <SafeAreaView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection:"row"}}>
                <View style={{flex:1, marginRight:5}}>
                    <TouchableOpacity style={{backgroundColor:'#EAF5F5', width:128, height:41, borderRadius:20, borderWidth:1, borderColor:"#2A9D8F", justifyContent:"center"}} 
                    accessibilityLabel="Click to mark item as used." onPress={() => markStatus("used")}>
                        <Text style={{textAlign:"center", color:"#2A9D8F", fontStyle: "normal", fontWeight:"bold", fontFamily:"Inter", fontSize:13, lineHeight:18, alignItems:"center"}}>
                            MARKED AS USED
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1, marginLeft:5}}>
                    <TouchableOpacity style={{backgroundColor:'#FFEDE9', width:128, height:41, borderRadius:20, borderWidth:1, borderColor:"#E76F51", justifyContent:"center"}} 
                    accessibilityLabel="Click to mark item as tossed." onPress={() => markStatus("tossed")}>
                        <Text style={{textAlign:"center", color:"#E76F51", fontStyle: "normal", fontWeight:"bold", fontFamily:"Inter", fontSize:13, lineHeight:18, alignItems:"center"}}>
                            TOSS
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList data={fridgeData.filter((item) => item['usage_tag'] === null)} keyExtractor={(item:any) => item['inventory_item_id'].toString()} renderItem={({item, index}) => {
                    return (
                        <View style={{flexDirection:"row"}}>
                            <CheckBox 
                                title={item['inventory_item_name']}
                                onPress={() => handleChange(item)}
                                checked={checkedItems[item.inventory_item_id]}
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
                            <Text style={{fontFamily:"Inter", fontStyle:"normal", fontWeight:"500", fontSize:8, lineHeight:38, display:"flex", alignItems:"center", textAlign:"center"}}>
                                {expiry(item['expiry_date']) > 0 ? "expires in " + expiry(item['expiry_date']) + " days" : "expired"}
                            </Text>
                        </View>
                    )
                }
                }
                />
            )}
        </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default FridgeScreen;