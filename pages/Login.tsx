import React, { useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Linking } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import {CheckBox, ThemeContext, ThemeProvider} from 'react-native-elements';
import Svg, {Circle, Rect, Line} from 'react-native-svg';
import axios from 'axios';

import SignUpScreen from './SignUp';
import { RootStackParamList } from '../components/NavigationBar';
import { updateUser } from '../components/redux/authenticate';
import { getUserProfile, getGroceryItems, getInventoryItems } from '../components/redux/context';
import { getUser } from '../utils/api';
import { validateEmail } from '../utils/validator';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        height: 41,
        width: 299
    }
});

type ScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Logout'>;

const Stack = createNativeStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    )
}

export type LoginStackParamList = {
    Login: undefined,
    SignUp: undefined
}

type LoginNavigationProp = NativeStackScreenProps<LoginStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: any) => {
    const [error, setError] = React.useState('');
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        console.log(error);
    },[]);
    const [username, setUsername] = React.useState('');
    const dispatch = useDispatch();
    
    const verifyUser = async (email:any) => {
        var errorMessage = 'Invalid email. Please try again.';
        try {
            const emailValidate = validateEmail(email);
            if (emailValidate) {
                const response:any = await getUserProfile(email, dispatch);
                if (response.length > 0) {
                    const user_id:number = response[0].user_id;
                    getGroceryItems(user_id, dispatch);
                    getInventoryItems(user_id, dispatch);
                } else {
                    setError(errorMessage);
                }
            } else {
                setError(errorMessage);
            }
        } catch (error:any) {
            console.error(error);
            setError(error);
        } 
    }
    
    return (
        <ScrollView>
        <SafeAreaView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{error}</Text>
            <TextInput
                placeholder="Username/Email"
                value={username}
                onChangeText={setUsername}
                style={styles.container}
            />
            <Button color='#2A9D8F' accessibilityLabel="Click to login." title="Sign in" onPress={() => verifyUser(username)} />
            <View style={{flexDirection:"row"}}>
                <View style={{flexDirection:"row", flex:1, marginRight:5}}>
                    <Text style={{color:"#C2D1D9", fontFamily:"Inter", fontStyle:"normal", fontWeight:"bold", fontSize:12, 
                    lineHeight: 18, display:"flex", alignItems:"center", textAlign:"center"}}>
                        Don't have an account? </Text>
                    <Text style={{color:"#C2D1D9", fontFamily:"Inter", fontStyle:"normal", fontWeight:"bold", fontSize:12, 
                    lineHeight: 18, display:"flex", alignItems:"center", textAlign:"center"}} 
                    onPress={() => navigation.navigate('SignUp')}>
                        Sign up here.
                    </Text>
                </View>
            </View>
        </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default LoginStack;