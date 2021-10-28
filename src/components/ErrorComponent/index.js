import Toast from 'react-native-toast-message';

export const ErrrorHandler = (text, type,) => {
  return Toast.show({
    type: type,
    position: 'top',
    text1: text,
    // text2: 'This is some something 👋',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
    bottomOffset: 40,
  });
};

export const ErrrorHandlerProfile = (text, type,) => {
  return Toast.show({
    type: type,
    position: 'top',
    text1: text,
    // text2: 'This is some something 👋',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 82,
    bottomOffset: 0,
  });
};
