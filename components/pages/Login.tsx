import React, { useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { RootStackParamList } from '../NavigationBar';
import { updateUser } from '../redux/authenticate';

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

const LoginScreen = ({ navigation }: ScreenNavigationProp) => {
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
            <Button color='#2A9D8F' accessibilityLabel="Click to Login." title="Sign in" onPress={() => verifyUser(username)} />
            <Text>{error}</Text>
        </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default LoginScreen;