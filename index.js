/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import RNVoipCall from 'react-native-voip-call';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background   innnn-----!', remoteMessage);
    //   if (Platform.OS === 'android') {
    //   let data;
    //   if (remoteMessage.data) {
    //     data = remoteMessage.data;
    //   }
    //   if (data && data.type === 'call' && data.uuid) {
    //     let callOptions = {
    //       callerId: data.uuid, // Important uuid must in this format
    //       ios: {
    //         phoneNumber: '12344', // Caller Mobile Number
    //         name: data.name, // caller Name
    //         hasVideo: true,
    //       },
    //       android: {
    //         ringtuneSound: true, // defualt true
    //         ringtune: 'ringtune', // add file inside Project_folder/android/app/res/raw --Formats--> mp3,wav
    //         duration: 30000, // defualt 30000
    //         vibration: true, // defualt is true
    //         channel_name: 'call', //
    //         notificationId: 1123,
    //         notificationTitle: 'Incomming Call',
    //         notificationBody: data.name + ' is Calling...',
    //         answerActionTitle: 'Answer',
    //         declineActionTitle: 'Decline',
    //       },
    //     };
    //     RNVoipCall.displayIncomingCall(callOptions)
    //       .then(data => {
    //         console.log('-------------------------------', data);
    //       })
    //       .catch(e => console.log(e));
    //   }
    // }
});
AppRegistry.registerComponent(appName, () => App);
