import React, {useState, useEffect} from 'react';
import styles from './styles';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator,
  Animated,
  Platform,
} from 'react-native';
// import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken, LoginButton} from 'react-native-fbsdk-next';
// @ts-ignore
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import {setLogin} from '../../actions/auth';
import types from '../../Model/types';
import Toast from 'react-native-toast-message';
import {ErrrorHandler} from '../../components/ErrorComponent';
import {emailValadation} from '../../components/valdation';

const SignInScreen = ({navigation}: types) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [showPassword, setShow] = useState(true);
  const dispatch = useDispatch();
  const loder = useSelector((state: any) => state.auth.loader);
  var scrollY = new Animated.Value(0);
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const {colors} = useTheme();
  const loginUser = async () => {
    if (Email && Password) {
      if (!emailValadation(Email)) {
        ErrrorHandler('Please enter valid email', 'error');
      } else {
        dispatch(setLogin(Email, Password));
      }
    } else {
      ErrrorHandler('Please fill all Felids', 'error');
    }
  };

  async function onGoogleButtonPress() {
    GoogleSignin.configure({
      webClientId:
        '646603043532-f1i16r6oqpfd3emp9j95clt613ihgpet.apps.googleusercontent.com',
    });
    // Get the users ID token
    console.log('-------------------------------');

    const {idToken} = await GoogleSignin.signIn();
    console.log('idToken--------------', idToken);
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log('-------------------------------1');

    console.log('googleCredential', googleCredential);
    console.log('-------------------------------11');

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        console.log('logget in');
        navigation.navigate('Home', {
          loginId: 2,
        });
      })
      .catch(error => {
        console.error('error is --', error);
      });
  }

  useEffect(() => {}, []);

  Animated.timing(scrollY, {
    toValue: 0.9,
    duration: 500,
    useNativeDriver: true,
  }).start();
  return (
    <View style={styles.container}>
      <Toast ref={ref => Toast.setRef(ref)} />
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.headerLogin}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animated.View
        // animation="fadeInUpBig"
        style={[
          styles.footerLogin,
          {
            // transform: [{
            //     translateY: scrollY.interpolate({
            //         inputRange: [0, 1],
            //         outputRange: [200, 0]
            //     }),
            // }],
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}>
          Email
        </Text>
        <View style={styles.action}>
          <Entypo name="user" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            // onChangeText={(val) => textInputChange(val)}
            // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            onChangeText={val => setEmail(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <Entypo name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={showPassword ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            // onChangeText={(val) => handlePasswordChange(val)}
            onChangeText={val => setPassword(val)}
          />
          <TouchableOpacity onPress={() => setShow(!showPassword)}>
            {showPassword ? (
              <Entypo name="eye-with-line" color="grey" size={20} />
            ) : (
              <Entypo name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}
        <TouchableOpacity>
          <Text style={{color: '#009387', marginTop: 15}}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonLogin}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              //  loginHandle(data.username, data.password)
              loginUser();
            }}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              {loder ? (
                <ActivityIndicator size="small" color="#BBC0FF" />
              ) : (
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Sign In
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles.signIn,
              {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#009387',
                },
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <GoogleSigninButton
            style={{width: 192, height: 40, marginBottom: 10, marginTop: 10}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() =>
              onGoogleButtonPress().then(() =>
                console.log('Signed in with Google!'),
              )
            }
          />
          <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  console.log(data.accessToken.toString());
                });
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default SignInScreen;
