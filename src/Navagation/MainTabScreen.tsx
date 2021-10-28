import React, {useEffect} from 'react';
import {Alert, Vibration} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/profile/index';
import notifee from '@notifee/react-native';
import Groups from '../screens/groupChat';
import Chat from '../screens/groupChat/chat';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
import gallery from '../screens/gallery';

const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

const ChatScreen = ({navigation}) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Groups" component={Groups} />
    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>
);

const MainTabScreen = ({navigation}) => {
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

  useEffect(() => {
    // onDisplayNotification()
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('checking----------', JSON.stringify(remoteMessage));
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // onDisplayNotification()
      // onDisplayNotification()
      console.log('Message handled in the background!innu', remoteMessage);
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
        component={HomeStackScreen}
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
        component={ProfileScreen}
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
