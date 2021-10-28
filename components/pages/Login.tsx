import React, { useContext } from 'react';
import { Text, View, ScrollView, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const AuthContext = React.createContext();
const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }) => {
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
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            />
            <Button title="Sign in" onPress={() => /*signIn({username})*/ console.log('Sign in')} />
        </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default LoginScreen;