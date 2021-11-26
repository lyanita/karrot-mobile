import React, { useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { LoginStackParamList } from './Login';
import { updateUser } from '../components/redux/authenticate';
import { addUser } from '../utils/api';
import { validateEmail } from '../utils/validator';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        height: 41,
        width: 299
    }
});

type LoginNavigationProp = NativeStackScreenProps<LoginStackParamList, 'SignUp'>;

const SignUpScreen = ({ navigation }: any) => { 
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

    const createUser = async (email:any) => {
        try {
            const emailValidate = validateEmail(email);
            if (emailValidate) {
                const response:any = await addUser(email);
                console.log(response);
                if (response.indexOf("exists") === -1) {
                    setError('');
                } else {
                    setError(response);
                }
            } else {
                setError("Not a valid email.")
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
            <TextInput
                placeholder="Email"
                value={username}
                onChangeText={setUsername}
                style={styles.container}
            />
            <Button color='#2A9D8F' accessibilityLabel="Click to create a new account." title="Submit" onPress={() => createUser(username)} />
            <Text>{error}</Text>
            <Text style={{color:"#C2D1D9", fontFamily:"Inter", fontStyle:"normal", fontWeight:"bold", fontSize:12, 
                lineHeight: 18, display:"flex", alignItems:"center", textAlign:"center"}} 
                onPress={() => navigation.navigate('Login')}>
                    Back to login.
            </Text>
        </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default SignUpScreen;

