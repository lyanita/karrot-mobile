import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { RootStackParamList } from '../components/NavigationBar';
import { updateInventory } from '../components/redux/inventory';
import { getInventory, getRecipes } from '../utils/api';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        height: 41,
        width: 299
    }
});

type ScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Recipes'>;

const RecipeScreen = () => {
    const [isLoading, setLoading] = useState(true);
    const user = useSelector((state:any) => state.user);
    let user_id = user[0].id;
    const inventory = useSelector((state:any) => state.inventory);
    const dispatch = useDispatch();

    const [recipeData, setRecipeData] = useState([]);
    useEffect(() => {
        //getRecipeData();
    }, []);

    const getRecipeData = async(ingredients:any, number:number) => {
        try {
            const response = await getRecipes(ingredients, 3);
            console.log(response);
            //setRecipeData(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView>
        <SafeAreaView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text></Text>
        </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default RecipeScreen;