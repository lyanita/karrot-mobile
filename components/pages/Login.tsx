import React, { useContext, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../NavigationBar';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useLinkProps } from '@react-navigation/native';

import { updateUser } from '../redux/authenticate';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        height: 41,
        width: 299
    }
});

type ScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Groceries'>;
const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }: ScreenNavigationProp) => {
    const [username, setUsername] = React.useState('');
    //const user = useSelector((state:any) => state.user);
    //console.log(user);
    const dispatch = useDispatch();
    
    const verifyUser = async (email:any) => {
        try {
            const response = await axios.get(`https://food-ping.herokuapp.com/getUser?email=${email}`);
            console.log(response);
            let res:any = response;
            dispatch(updateUser(res['data'][0]));
        } catch (error) {
            console.error(error);
        } finally {
            //console.log(userID);
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
        </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default LoginScreen;