import React, { useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import {CheckBox, ThemeContext, ThemeProvider} from 'react-native-elements';
import Svg, {Circle, Rect, Line} from 'react-native-svg';
import axios from 'axios';

import SignUpScreen from './SignUp';
import { RootStackParamList } from '../components/NavigationBar';
import { updateUser } from '../components/redux/authenticate';

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
        try {
            const response = await axios.get(`https://food-ping.herokuapp.com/getUser?email=${email}`);
            console.log(response);
            let res:any = response;
            if (res['data'].length > 0) {
                dispatch(updateUser(res['data'][0]));
            } else {
                setError('Username/Email invalid. Please try again.');
            }
        } catch (error:any) {
            console.error(error);
            setError(error);
        } finally {
            
        }
    }
    
    return (
        <ScrollView>
        <SafeAreaView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
                placeholder="Username/Email"
                value={username}
                onChangeText={setUsername}
                style={styles.container}
            />
            <Button color='#2A9D8F' accessibilityLabel="Click to login." title="Sign in" onPress={() => verifyUser(username)} />
            <Text>{error}</Text>
            <View style={{flexDirection:"row"}}>
                <View style={{flex:1, marginRight:5}}>
                    <TouchableOpacity style={{backgroundColor:'#EAF5F5', width:128, height:41, borderRadius:20, borderWidth:1, borderColor:"#2A9D8F", justifyContent:"center"}} 
                    accessibilityLabel="Click to create a new account." onPress={() => navigation.navigate('SignUp')}>
                        <Text style={{textAlign:"center", color:"#2A9D8F", fontStyle: "normal", fontWeight:"bold", fontFamily:"Inter", fontSize:13, lineHeight:18, alignItems:"center"}}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default LoginStack;