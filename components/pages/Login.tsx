import React, { useContext } from 'react';
import { Text, View, ScrollView, TextInput, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootStackParamList from '../NavigationBar';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        //border: '1px solid #C2D1D9',
        //boxSizing: 'border-box',
        borderRadius: 3,
        height: 41,
        width: 299
    }
});

type ScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Groceries'>;
//const AuthContext = React.createContext();
const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }: ScreenNavigationProp) => {
    const [username, setUsername] = React.useState('');
    //const { signIn } = React.useContext(AuthContext);
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
            <Button color='#2A9D8F' accessibilityLabel="Click to Login." title="Sign in" onPress={() => /*signIn({username})*/ console.log('Sign in')} />
        </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default LoginScreen;