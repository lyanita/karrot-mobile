import React, { useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import MaterialCommumityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import GroceryStack from "../pages/Groceries";
import FridgeScreen from "../pages/Fridge";
import RecipeScreen from "../pages/Recipes";
import LoginScreen from "../pages/Login";
import { updateUser } from './redux/authenticate';

const containerTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#EFF2F4"
    },
}

export type RootStackParamList = {
    Logout: undefined,
    Groceries: undefined,
    Fridge: undefined,
    Recipes: undefined
}

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator();

const Navigation = () => {
    const [login, setLogin] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state:any) => state.user);
    const userTest = user[0].id > 0 ? true : false;
    useEffect(() => {
        setLogin(userTest);
    });

    return (
        login ? <NavigationContainer theme={containerTheme}>
            <Tab.Navigator initialRouteName="Groceries" screenOptions={({ route }) => ({ tabBarIcon: ({ focused, color, size}) => {
                let iconName: any;
                //update this section to utilize custom icons
                if (route.name === 'Groceries') {
                    iconName = focused ? 'view-list' : 'view-list';
                } else if (route.name === 'Fridge') {
                    iconName = focused ? 'fridge' : 'fridge';
                } else if (route.name === 'Recipes') {
                    iconName = focused ? 'view-list' : 'view-list';
                } else if (route.name === 'Logout') {
                    iconName = focused ? 'logout' : 'logout';
                }
                return <MaterialCommumityIcons name={iconName!} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            })}>
                <Tab.Screen name="Groceries" component={GroceryStack} />
                <Tab.Screen name="Fridge" component={FridgeScreen} options={{ tabBarBadge: 3}} />
                <Tab.Screen name="Recipes" component={RecipeScreen} />
                <Tab.Screen name="Logout" component={LoginScreen} 
                    listeners={{tabPress: (e) => {
                        e.preventDefault();
                        dispatch(updateUser([{email:'', user_id: 0}])); //resets user to scrub redux
                    }}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    : <NavigationContainer>
        <Stack.Navigator>
            <Tab.Screen name="Logout" component={LoginScreen} />
        </Stack.Navigator>
    </NavigationContainer>);
}

export default Navigation;
