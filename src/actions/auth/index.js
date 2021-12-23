import firestore from '@react-native-firebase/firestore';
// import BcryptReactNative from 'bcrypt-react-native';
import * as storage from '../../service/cookie';
import {LOGIN, SET_LOADER, USER_DATA, CALL} from '../../types/auth/index';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const setLogin = (email, Password) => {
  return async dispatch => {
    dispatch({ type: SET_LOADER, value: true });
    await firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size < 1) {
          dispatch({type: SET_LOADER, value: false});
          Alert.alert('Invalid User!', 'please enter valid email', [
            {text: 'Okay'},
          ]);
        } else {
          querySnapshot.forEach(async doc => {
            const isValid = null;
            //   await BcryptReactNative.compareSync(
            //   Password,
            //   doc._data.password,
            // );
            if (isValid) {
              const token = await messaging().getToken();
              firestore().collection('users').doc(doc.id).update({
                deviceToken: token,
              });
              await storage.setCookie('userToken', Password);
              await storage.setCookie('email', email);
              dispatch({type: SET_LOADER, value: false});
              dispatch(getUserData(email));
              dispatch({
                type: LOGIN,
                id: email,
                token: Password,
              });
            } else {
              dispatch({type: SET_LOADER, value: false});
              Alert.alert('Invalid User!', 'wrong passwordl', [{text: 'Okay'}]);
            }
          });
        }
      });
  };
};

export const getUserData = email => {
  return async dispatch => {
    await firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async documentSnapshot => {
          console.log('value seeted back');
          dispatch({
            type: USER_DATA,
            value: documentSnapshot._data,
          });
          await storage.setCookie('id', documentSnapshot.id);
        });
      })
      .catch(error => {});
  };
};
export const setUser = (data, navigation) => {
  return async dispatch => {
    dispatch({ type: SET_LOADER, value: true });
    const hash =0
    // const salt = await BcryptReactNative.getSalt(10);
    // const hash = await BcryptReactNative.hash(salt, data.password);

    await firestore()
      .collection('users')
      .where('email', '==', data.email)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          dispatch({type: SET_LOADER, value: false});
          let str = '#{name} already Exists';
          Alert.alert(str.interpolate({name: 'email'}));
        } else {
          firestore()
            .collection('users')
            .add({
              email: data.email,
              password: hash,
              deviceToken: data.deviceToken,
            })
            .then(() => {
              dispatch({type: SET_LOADER, value: false});
              console.log('Post Added!');
              Alert.alert(
                'Account created!',
                'Your account has been  Successfully created!',
              );
            })
            .catch(error => {
              console.log(
                'Something went wrong with added post to firestore.',
                error,
              );
            });
        }
      })
      .catch(error => {
        dispatch({type: SET_LOADER, value: false});
        console.log('Something went wrong with added post to firestore', error);
      });
  };
};
export const upadteUser = data => {
  return async dispatch => {
    dispatch({type: SET_LOADER, value: true});
    const id = await storage.getCookie('id');
    firestore()
      .collection('users')
      .doc(id)
      .update({
        FullName: data.FullName,
        address: data.address,
        gender: data.gender,
        profileImage: data.profileImage,
      })
      .then(() => {
        dispatch({type: SET_LOADER, value: false});
        dispatch(getUserData(data.email));
      });
  };
};

export const setCall = (value,callBack) => {
  return async dispatch => {
      dispatch({ type: CALL, value: value });
      callBack(true)
  };
};
