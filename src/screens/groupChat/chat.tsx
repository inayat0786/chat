import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity, Text, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
var img = 'https://wallpaperaccess.com/full/1146264.jpg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export function Chat(props: any) {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState('');
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  useEffect(() => {
    getAllMessages();
  }, []);

  const getAllMessages = async () => {
    const email: any = await AsyncStorage.getItem('email');
    const user = await firestore().collection('users').doc(email).get();
    setUserId(user.id);
    const messageRef = firestore()
      .collection('groups')
      .doc(props.route.params.id)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unSubscribe = messageRef.onSnapshot(querySnap => {
      const allmsg: any = querySnap.docs.map(docSanp => {
        const data = docSanp.data();
        if (data.createdAt) {
          return {
            ...docSanp.data(),
            createdAt: docSanp.data().createdAt.toDate(),
            id: docSanp.id,
          };
        } else {
          return {
            ...docSanp.data(),
            createdAt: new Date(),
            id: docSanp.id,
          };
        }
      });
      setMessages(allmsg);
    });
    return () => {
      unSubscribe();
    };
  };

  const onSend = async (messageArray, image) => {
    const msg = {
      text: '',
      image: image,
    };
    console.log('message', msg);
    let mymsg: any;
    await firestore()
      .collection('users')
      .where('email', '==', userId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async documentSnapshot => {
          mymsg = {
            ...msg,
            // audio:
            //   'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav',

            // image: image,
            // video:
            //   'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            user: {
              _id: userId,
            },
            createdAt: new Date(),
          };
        });
      });
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    firestore()
      .collection('groups')
      .doc(props.route.params.id)
      .collection('messages')
      .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()});
    getAllMessages();
    setImage(null);
  };

  const getImages = async () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      uploadImage(imageUri);
    });
  };

  const uploadImage = async (image: any) => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    setUploading(true);
    setTransferred(0);
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      console.log('url getted-------------', url);
      setImage(url);
      setUploading(false);
      return url;
    } catch (e) {
      setImage(null);
      console.log(e);
      return null;
    }
  };
  const customSendPress = (text, onSend) => {
    if (image && !text && onSend) {
      onSend({text: text.trim()}, true);
    } else if (text && onSend) {
      onSend({text: text.trim()}, true);
      0;
    } else {
      return false;
    }
  };
  const customSend = ({onSend, text, sendButtonProps, ...sendProps}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('ok working', onSend, text, sendButtonProps);
        }}
        style={{
          backgroundColor: 'gray',
          padding: 10,
          borderRadius: 5,
          marginHorizontal: 10,
        }}>
        <Text style={{color: '#fff'}}>Image</Text>
      </TouchableOpacity>
      // <Send
      //   {...sendProps}
      //   textStyle={styles.sendButton}
      //   sendButtonProps={{
      //     ...sendButtonProps,
      //     onPress: () => customSendPress(text, onSend),
      //   }}
      // />
    );
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages, img)}
      user={{
        _id: userId,
      }}
      renderActions={() => (
        <React.Fragment>
          <TouchableOpacity
            onPress={() => {
              getImages();
            }}
            style={{
              backgroundColor: 'gray',
              padding: 10,
              borderRadius: 5,
              marginHorizontal: 10,
            }}>
            <Text style={{color: '#fff'}}>Image</Text>
          </TouchableOpacity>
          {/* <ImgPicker setmsgImgUrl={this.setmsgImgUrl} /> */}
        </React.Fragment>
      )}
      renderSend={customSend}
      alwaysShowSend
      messageIdGenerator={() => 'hhvh'}
      // videoProps
    />
  );
}

export default Chat;
