import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AuthContext = React.createContext();
const Stack = createNativeStackNavigator();

const Authentication = ({navigation}) => {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState, userToken: action.token, isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState, isSignout: false, userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState, isSignout: true, userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );
    
    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {

            }
            dispatch({type: 'RESTORE_TOKEN', token: userToken});
        };
        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(() => ({
        signIn: async data => {
            dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
        },
        signOut: () => dispatch({type: 'SIGN_OUT'}),
        signUp: async data => {
            dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
        },
    }),
    []);
    return (
        <AuthContext.Provider value={authContext}>
            <Stack.Navigator>
                {state.userToken == null ? (
                    <Stack.Screen name="SignIn" component={SignInScreen} />
                ) : (
                    <Stack.Screen name="Home" component={HomeScreen} />
                )}
            </Stack.Navigator>
        </AuthContext.Provider>
    );
}

export default Authentication;