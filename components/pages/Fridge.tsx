import React, { useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const FridgeScreen = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const getData = async() => {
        try {
            const response = await fetch('https://food-ping.herokuapp.com/getInventory?user_id=5');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
            var fridge_dict:any = {}
            let error_message: string = "Your fridge is empty";
            fridge_dict["inventory_item_name"] = error_message;
            setData(fridge_dict);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <ScrollView>
        <SafeAreaView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Fridge</Text>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList data={data} keyExtractor={(item:any) => item['inventory_item_id'].toString()/*({id}, index) => id*/} renderItem={({item}) => (
                    <Text>{item.inventory_item_name}, {item.expiry_date}</Text>
                )}
                />
            )}
        </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default FridgeScreen;