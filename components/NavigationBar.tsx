import React, { useContext, useState, useReducer } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommumityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import GroceryStack from "./pages/Groceries";
import FridgeScreen from "./pages/Fridge";
import RecipeScreen from "./pages/Recipes";
import LoginScreen from "./pages/Login";

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

    return (
        login ? <NavigationContainer theme={containerTheme}>
            <Tab.Navigator initialRouteName="Groceries" screenOptions={({ route }) => ({ tabBarIcon: ({ focused, color, size}) => {
                let iconName: any;
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
                        setLogin(false);
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
