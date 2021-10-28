import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert, Vibration } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { Root } from 'native-base';
import { store, persistor } from './src/store';
import AppView from './src/screens/AppViewContainer';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

export default function App() {

  const constTopic = 'F881';

  React.useEffect(() => {
    // Vibration.vibrate(1000)

    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   console.log(JSON.stringify(remoteMessage));
    // });
    // Error on here
    messaging().subscribeToTopic(constTopic);
    // return () => unsubscribe;
  }, []);
  return (
    <Provider store={store}>
      <Root>

        <PersistGate
          loading={
            <View style={styles.container}>
              <ActivityIndicator color="red" />
            </View>
          }
          persistor={persistor}
        >
          <AppView />
        </PersistGate>

      </Root>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});