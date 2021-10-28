/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import { DrawerContent } from './DrawerContent';
import MainTabScreen from './MainTabScreen';
import { AuthContext } from '../../components/context';
import RootStackScreen from './RootStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RETRIEVE_TOKEN, LOGIN } from '../types/auth';
import { getUserData } from '../actions/auth'
const Drawer = createDrawerNavigator();
const App = () => {
    // const [isLoading, setIsLoading] = React.useState(true);
    // const [userToken, setUserToken] = React.useState(null); 

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const dispatch = useDispatch()
    const auth = useSelector((state: any) => state.auth.userToken);
    const isLoading = useSelector((state: any) => state.auth.isLoading)
    console.log('userTokrn', auth)
    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null,
    };

    const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            background: '#ffffff',
            text: '#333333'
        }
    }

    const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            background: '#333333',
            text: '#ffffff'
        }
    }
    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

    const authContext = React.useMemo(() => ({
        toggleTheme: () => {
            setIsDarkTheme(isDarkTheme => !isDarkTheme);
        }
    }), []);

    useEffect(() => {
        setTimeout(async () => {
            // setIsLoading(false);
            let userToken;
            let email;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                email = await AsyncStorage.getItem('email');
                dispatch(getUserData(email))

            } catch (e) {
                console.log(e);
            }
            // console.log('user token: ', userToken);
            dispatch({ type: RETRIEVE_TOKEN, token: userToken });
            dispatch({
                type: LOGIN,
                id: email,
                token: userToken
            });
        }, 1000);
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color='#000' />
            </View>
        );
    }
    return (
        <PaperProvider theme={theme}>
            <AuthContext.Provider value={authContext}>
                <NavigationContainer theme={theme}>
                    {auth !== null ? (
                        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                            <Drawer.Screen name="Home" component={MainTabScreen}
                                options={{
                                    // drawerLabel: 'First Page Option',
                                    headerShown: false,
                                    // headerTitle: null,
                                    // headerTitle: "fgbdf",

                                }}
                            />
                        </Drawer.Navigator>
                    )
                        :
                        <RootStackScreen />
                    }
                </NavigationContainer >
            </AuthContext.Provider>
        </PaperProvider >
    );
}
export default App;

