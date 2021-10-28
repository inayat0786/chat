import React, { useState, useEffect } from 'react';
import styles from './styles';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    Alert,
    ActivityIndicator,
} from 'react-native';
// @ts-ignore
import Entypo from 'react-native-vector-icons/Entypo';
import messaging from '@react-native-firebase/messaging';
import Types from '../../Model/types';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../actions/auth';
import Toast from 'react-native-toast-message';
import { ErrrorHandler } from '../../components/ErrorComponent';
import { emailValadation, checkPassword } from '../../components/valdation';

const SignInScreen = ({ navigation }: Types) => {
    const dispatch = useDispatch()
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirm] = useState('')
    const [showPassword, setShow] = useState(true)
    const [showConfirm, setShowConfirm] = useState(true)
    const loder = useSelector((state: any) => state.auth.loader)

    const trySignUp = async () => {
        if (Email && Password && ConfirmPassword) {
            if (!emailValadation(Email)) {
                ErrrorHandler('Please enter valid email!', 'error')
            }
            else if (!checkPassword(Password)) {
                ErrrorHandler('Please enter valid Password!', 'error')
            }
            else if (Password !== ConfirmPassword) {
                ErrrorHandler('Conform password not matching with password!', 'error')
            }
            else {
                const token = await messaging().getToken()
                const data = {
                    email: Email,
                    password: Password,
                    deviceToken: token
                }
                dispatch(setUser(data, navigation,))
            }
        }
        else {
            ErrrorHandler('Please fill all felids!', 'error')
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <Entypo
                            name="user"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            // onChangeText={(val) => textInputChange(val)}
                            onChangeText={(val) => setEmail(val)}
                        />
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <Entypo
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={showPassword}
                            style={styles.textInput}
                            autoCapitalize="none"
                            // onChangeText={(val) => handlePasswordChange(val)}
                            onChangeText={(val) => setPassword(val)}
                        />

                        <TouchableOpacity
                            onPress={() => setShow(!showPassword)}
                        >
                            {showPassword ?
                                <Entypo
                                    name="eye-with-line"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Entypo
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Entypo
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirm Your Password"
                            secureTextEntry={showConfirm}
                            style={styles.textInput}
                            autoCapitalize="none"
                            // onChangeText={(val) => handleConfirmPasswordChange(val)}
                            onChangeText={(val) => setConfirm(val)}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setShowConfirm(!showConfirm)
                                console.log('password is', showConfirm)
                            }}

                        >
                            {showConfirm ?
                                <Entypo
                                    name="eye-with-line"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Entypo
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                        </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { trySignUp() }}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                {
                                    loder ?
                                        <ActivityIndicator size="small" color="#BBC0FF" />
                                        :
                                        <Text style={[styles.textSign, {
                                            color: '#fff'
                                        }]}>Sign Up</Text>
                                }
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;



