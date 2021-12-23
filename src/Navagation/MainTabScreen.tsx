import React, {useEffect} from 'react';
import {Alert, Vibration, Platform} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/profile/index';
import Voice from '../screens/VoiceCall';
import signup from '../screens/signUp/index';
import Home from '../screens/Home';
import notifee from '@notifee/react-native';
import Groups from '../screens/groupChat';
import Chat from '../screens/groupChat/chat';
import CallScreen from '../screens/callScreen';
import Tree from '../Archive/App';
const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
import gallery from '../screens/gallery';
import {setCall} from '../actions/auth';
import {useSelector, useDispatch} from 'react-redux';
// @ts-ignore
import RNVoipCall from 'react-native-voip-call';
const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

const ChatScreen = ({navigation}) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Groups" component={Groups} />
    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>
);

const MainTabScreen = ({navigation}) => {
  const dispatch = useDispatch();

  async function onDisplayNotification() {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'hollow',
      vibration: true,
      vibrationPattern: [300, 500],
    });

    const notificationId = await notifee.displayNotification({
      id: '123',
      title: 'Notification Title',
      body: 'Main body content of the notification',

      android: {
        channelId,
      },
    });

    // Sometime later...
    await notifee.displayNotification({
      id: '123',
      title: 'Updated Notification Title',
      body: 'Updated main body content of the notification',

      android: {
        channelId,
        vibrationPattern: [300, 500],
      },
    });
  }
  const getCall = (remoteMessage: any) => {
    if (Platform.OS === 'android') {
      let data;
      if (remoteMessage.data) {
        data = remoteMessage.data;
      }
      if (data && data.type === 'call' && data.uuid) {
        let callOptions = {
          callerId: data.uuid, // Important uuid must in this format
          ios: {
            phoneNumber: '12344', // Caller Mobile Number
            name: data.name, // caller Name
            hasVideo: true,
          },
          android: {
            ringtuneSound: true, // defualt true
            ringtune: 'ringtune', // add file inside Project_folder/android/app/res/raw --Formats--> mp3,wav
            duration: 30000, // defualt 30000
            vibration: true, // defualt is true
            channel_name: 'call', //
            notificationId: 1123,
            notificationTitle: 'Incomming Call',
            notificationBody: data.name + ' is Calling...',
            answerActionTitle: 'Answer',
            declineActionTitle: 'Decline',
          },
        };
        RNVoipCall.displayIncomingCall(callOptions)
          .then(data => {
            console.log('----------------', data);
          })
          .catch(e => console.log(e));
        RNVoipCall.onCallAnswer(data => {
          dispatch(
            setCall(true, (callBack: any) => {
              callBack && navigation.navigate('Profile');
            }),
          );
          // let Newdata = JSON.parse(data);
          RNVoipCall.stopRingtune();
          // RNVoipCall.endAllCalls();
          RNVoipCall.endCall(0);
          console.log('---------------', data);
        });
      }
    }
  };
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background---------!', remoteMessage);
      getCall(remoteMessage);
    });

    // onDisplayNotification()
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log('checking----------', JSON.stringify(remoteMessage));
      // dispatch(
      //   setCall(true, (callBack: any) => {
      //     console.log('call bacj', callBack);
      //     callBack && navigation.navigate('Profile');
      //   }),
      // );
      getCall(remoteMessage);
    });
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('Message handled in the background!innu', remoteMessage);
    //   dispatch(
    //     setCall(true, (callBack: any) => {
    //       callBack && navigation.navigate('Profile');
    //     }),
    //   );
    // });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('!1111111----------------');
          // dispatch(
          //   setCall(true, (callBack: any) => {
          //     callBack && navigation.navigate('Profile');
          //   }),
          // );
        }
        getCall(remoteMessage);
      });
    //background/initial state
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('!1111111----------------vdfbdfbf');

      // dispatch(
      //   setCall(true, (callBack: any) => {
      //     callBack && navigation.navigate('Profile');
      //   }),
      // );
      getCall(remoteMessage);
    });
    return unsubscribe;
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        // component={HomeStackScreen}
        component={Tree}
        options={{
          tabBarLabel: 'Home',
          // tabBarColor: '#009387',
          // headerShown: true,
          tabBarIcon: ({color}) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
      name="Notifications"
      component={DetailsStackScreen}
      options={{
        tabBarLabel: 'Updates',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    /> */}
      <Tab.Screen
        name="Profile"
        component={Voice}
        options={{
          headerShown: true,
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Signup"
        component={signup}
        options={{
          headerShown: true,
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: 'red',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={gallery}
        options={{
          headerShown: true,
          tabBarLabel: 'Gallery',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
        options={{
          tabBarLabel: 'Gallery',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={ChatScreen}
        options={{
          headerShown: true,
          tabBarLabel: 'Groups',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
        // options={{
        //   tabBarLabel: 'Groups',
        //   tabBarColor: '#694fad',
        //   tabBarIcon: ({color}) => (
        //     <Icon name="ios-person" color={color} size={26} />
        //   ),
        // }}
      />
      {/* <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Explore',
        tabBarColor: '#d02860',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    /> */}
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        // backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Overview',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

// const DetailsStackScreen = ({ navigation }) => (
//   <DetailsStack.Navigator screenOptions={{
//     headerStyle: {
//       backgroundColor: '#1f65ff',
//     },
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//       fontWeight: 'bold'
//     }
//   }}>
//     <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
//       headerLeft: () => (
//         <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
//       )
//     }} />
//   </DetailsStack.Navigator>
// );
