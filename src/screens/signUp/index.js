import React, {useState} from 'react';
import styles from './styles';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const signUp = props => {
  const [userName, setUserName] = useState('');

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.main}>
        <Text style={styles.title}>What is your username?</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={val => setUserName(val)}
          placeholder={'username'}
          placeholderTextColor={'#3198F7'}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>Signup</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default signUp;
