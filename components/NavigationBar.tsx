import React, { useContext } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommumityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import GroceryStack from "./pages/Groceries";
import FridgeScreen from "./pages/Fridge";
import RecipeScreen from "./pages/Recipes";
import LoginScreen from "./pages/Login";

const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Logout" screenOptions={({ route }) => ({ tabBarIcon: ({ focused, color, size}) => {
                let iconName;
                if (route.name === 'Grocery') {
                    iconName = focused ? 'view-list' : 'view-list';
                } else if (route.name === 'Fridge') {
                    iconName = focused ? 'fridge' : 'fridge';
                } else if (route.name === 'Recipes') {
                    iconName = focused ? 'view-list' : 'view-list';
                } else if (route.name === 'Logout') {
                    iconName = focused ? 'logout' : 'logout';
                }
                return <MaterialCommumityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            })}>
                <Tab.Screen name="Grocery" component={GroceryStack} />
                <Tab.Screen name="Fridge" component={FridgeScreen} options={{ tabBarBadge: 3}} />
                <Tab.Screen name="Recipes" component={RecipeScreen} />
                <Tab.Screen name="Logout" component={LoginScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
