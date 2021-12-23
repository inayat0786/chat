import React, {useState} from 'react';
import styles from './styles';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Switch from './switch';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const signUp = props => {
  const [userName, setUserName] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
console.log("isEnabled---------",isEnabled)
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.main}>
          <Text
            style={[
              styles.title,
              {
                color: '#fff',
                textAlign: 'center',
              },
            ]}>
            You are "user-a"
          </Text>
          <Text style={styles.title}>You can take or receive calls.</Text>
          <Text style={styles.title}>
            .{'  '}If you want receive calls, please toggle the switch to ON.
          </Text>
          <Text style={styles.title}>
            .{'  '}If you want call another user, please enter their username
            and click the call button.
          </Text>
        <View style={styles.callMain}>
          <Text style={[styles.title, {color: '#fff', marginBottom: hp(2)}]}>
            a.Call Availability Switch
          </Text>
          <Switch
            parentViewHeight={50}
            parentViewWidth={90}
            childViewActiveColor={'#fff'}
            childViewInActiveColor={'#fff'}
            parentViewActiveColor={'#76ED58'}
            parentViewInActiveColor={'#76ED58'}
            onValueChange={() => setIsEnabled(!isEnabled)}
          />
          <Text style={[styles.title, {color: '#fff', marginTop: hp(2)}]}>
            a.Call Another User
          </Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={val => setUserName(val)}
            placeholder={'username'}
            placeholderTextColor={'#3198F7'}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTitle}>Call</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default signUp;
