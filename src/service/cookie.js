import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwt_decode from "jwt-decode";
export async function setCookie(name, value) {
  try {
    await AsyncStorage.setItem(name, value);

  } catch (error) {

  }
  return
}

export function deleteCookie(name) {
  AsyncStorage.removeItem(name);
  return
}

export async function getCookie(name) {
  var token = '';
  try {
    token = await AsyncStorage.getItem(name) || 'none';

  } catch (error) {

  }

  return token;

}
export const removeAccessToken = async () => {
  try {
    await AsyncStorage.removeItem('idToken');
    return true;
  }
  catch (exception) {
    return false;
  }
}
export const isAuthed = async () => {
  try {
    const token = await AsyncStorage.getItem('idToken');
    console.log('om cokie,', token)
    if (!token) { return false; }
    else { return true; }
  } catch (error) {
    return false;
  }
};
// export async function getUSerId(name) {
//   var id = '';
//   try {
//     token = await AsyncStorage.getItem(name) || 'none';
//     var decoded = jwt_decode(token);
//     id = decoded.userId
//   } catch (error) {
//   }
//   return id;
// }

