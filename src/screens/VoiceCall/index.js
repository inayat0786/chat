import React, {useState} from 'react';
import {SafeAreaView, View, Text, TextInput, Alert} from 'react-native';
import {useInitializeAgora, useRequestAudioHook} from './hooks';
import Button from '../../components/Button';
import styles from './styles';
import messaging from '@react-native-firebase/messaging';
import {sendNotification} from '../helper';
import {useSelector, useDispatch} from 'react-redux';
import {setCall} from '../../actions/auth';
import * as storage from '../../service/cookie';
import firestore from '@react-native-firebase/firestore';

const VoiceCall = props => {
  useRequestAudioHook();
  const {
    channelName,
    isMute,
    isSpeakerEnable,
    joinSucceed,
    peerIds,
    setChannelName,
    joinChannel,
    leaveChannel,
    toggleIsMute,
    toggleIsSpeakerEnable,
  } = useInitializeAgora();


  const dispatch = useDispatch();
  const isCall = useSelector((state: any) => state.auth.call);
  React.useEffect(() => {
    if (isCall) {
    join()
    }
  }, [isCall]);
  
  const joinChannelAuto = () => {
    if (joinSucceed) {
      leaveChannel();
    } else {
      getUser();
      joinChannel();
    }
    // joinSucceed ? leaveChannel : joinChannel
  };

  const callAlert = () =>
    Alert.alert('Call', 'Someone is calling', [
      {
        text: 'reject',
        onPress: () => setOff(),
        style: 'cancel',
      },
      {
        text: 'Accept',
        onPress: () => {
          setOff();
          join();
        },
      },
    ]);

  const setOff = async () => {
    await dispatch(setCall(false));
  };

  const join = () => {
    setOff()
    console.log("yesss----------------------------")
    setChannelName('inayat');
    joinChannel();
  };

  const getUser = async () => {
    const id = await storage.getCookie('id');
    const token = await messaging().getToken();
    console.log('id', id);
    await firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async doc => {
          if (doc?.id !== id && doc._data.deviceToken !== token) {
            sendNotification(doc._data.deviceToken);
          }
        });
      });
  };
 
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.channelInputContainer}>
          <Text>Enter Channel Name:</Text>

          <TextInput
            style={styles.input}
            onChangeText={text => setChannelName(text)}
            placeholder={'Channel Name'}
            value={channelName}
          />
        </View>

        <View style={styles.joinLeaveButtonContainer}>
          <Button
            onPress={() => {
              joinChannelAuto();
            }}
            title={`${joinSucceed ? 'Leave' : 'Join'} channel`}
          />
        </View>

        <View style={styles.floatRight}>
          <Button onPress={toggleIsMute} title={isMute ? 'UnMute' : 'Mute'} />
        </View>

        <View style={styles.floatLeft}>
          <Button
            onPress={toggleIsSpeakerEnable}
            title={isSpeakerEnable ? 'Disable Speaker' : 'Enable Speaker'}
          />
        </View>

        <View style={styles.usersListContainer}>
          {peerIds.map(peerId => {
            return (
              <View key={peerId}>
                <Text>{`Joined User ${peerId}`}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VoiceCall;
