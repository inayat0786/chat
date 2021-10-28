import React, { useState, useEffect } from 'react'
import { GiftedChat, Send } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendPushNotification } from './helper';
import { Platform, Dimensions, StyleSheet, TextInput, View, Clipboard, Image, Text, ActivityIndicator, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { color } from 'react-native-reanimated';

const userList = [
  {
    "id": 1,
    "name": "User1",

    "image": "https://via.placeholder.com/300.png/09f/fff"
  },
  {
    "id": 2,
    "name": "User2",
    "image": "https://via.placeholder.com/300.png/09f/fff"
  },
  {
    "id": 3,
    "name": "User3",
    "image": "https://via.placeholder.com/300.png/09f/fff"
  },
  {
    "id": 4,
    "name": "User4",
    "image": "https://via.placeholder.com/300.png/09f/fff"
  },
  {
    "id": 5,
    "name": "User5",
    "image": "https://via.placeholder.com/300.png/09f/fff"
  },
  {
    "id": 6,
    "name": "User6",
    "image": "https://via.placeholder.com/300.png/09f/fff"
  }
]

var messageLimit = 20;
var myToken: any;

const user = [
  {
    id: 1,
    name: 'inayat'
  },
  {
    id: 2,
    name: 'agam'
  },
  {
    id: 3,
    name: 'raja'
  },
  {
    id: 4,
    name: 'khan'
  },
]

var setTag = false
export function HomeScreen() {

  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState([]);
  const [messageText, setMessageText] = useState([])
  // const [tagShow, setTag] = useState(false)

  useEffect(() => {
    getAllMessages()
  }, [])

  const getAllMessages = async () => {
    const email = await AsyncStorage.getItem('email')
    const user = await firestore().collection('users').doc(email).get();
    setUserId(user.id)
    const messageRef = firestore().collection('chatrooms')
      .doc('NTT2ZqreE481dbBIjWkv')
      .collection('messages')
      .orderBy('createdAt', "desc")
      .limit(messageLimit)

    const unSubscribe = messageRef.onSnapshot((querySnap) => {
      const allmsg = querySnap.docs.map(docSanp => {
        const data = docSanp.data()
        if (data.createdAt) {
          return {
            ...docSanp.data(),
            createdAt: docSanp.data().createdAt.toDate(),
            id: docSanp.id
          }
        } else {
          return {
            ...docSanp.data(),
            createdAt: new Date(),
            id: docSanp.id
          }
        }
      })
      // console.log('a;llll', allmsg)
      setMessages(allmsg)
    })
    return () => {

      unSubscribe()
    }
  }

  const onSend = async (messageArray) => {
    const msg = messageArray[0]
    let mymsg: any;
    await firestore()
      .collection('users')
      .where('email', '==', userId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async (documentSnapshot) => {
          myToken = documentSnapshot._data.deviceToken
          mymsg = {
            ...msg,
            user: {
              _id: userId,
              name: documentSnapshot._data.FullName,
              avatar: documentSnapshot._data.profileImage,
            },
            createdAt: new Date()
          }
        });
      })

    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
    firestore().collection('chatrooms')
      .doc('NTT2ZqreE481dbBIjWkv')
      .collection('messages')
      .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
    getAllMessages()
    getUsers(mymsg)

  }
  const getUsers = (data) => {
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot._data.deviceToken && documentSnapshot._data.deviceToken != myToken) {
            console.log('device token', documentSnapshot._data.deviceToken)
            // sendPushNotification(documentSnapshot._data.deviceToken, data)
          }
        });
      });
  }
  const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToTop = 80;
    return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
  }
  const loadMoreMessage = async () => {
    messageLimit = messageLimit + 20
    const messageRef = firestore().collection('chatrooms')
      .doc('NTT2ZqreE481dbBIjWkv')
      .collection('messages')
      .orderBy('createdAt', "desc")
      .limit(messageLimit)

    const unSubscribe = messageRef.onSnapshot((querySnap) => {
      const allmsg = querySnap.docs.map(docSanp => {
        const data = docSanp.data()
        if (data.createdAt) {
          return {
            ...docSanp.data(),
            createdAt: docSanp.data().createdAt.toDate()
          }
        } else {
          return {
            ...docSanp.data(),
            createdAt: new Date()
          }
        }
      })
      setMessages(allmsg)
    })
    return () => {
      unSubscribe()
    }
  }
  // const suggestion = (text: any) => {
  //   text.split(/((?:^|\s)(?:#[a-z\d-]+))/gi).filter(Boolean).map((v, i) => {
  //     console.log('item', v, i)

  //   })
  // }
  const suggestion = (value) => {
    sendPushNotification()
    setMessageText(value)
    const lastChar = messageText.slice(messageText.length - 1)
    console.log('lastChar', lastChar)
    const currentChar = value.slice(value.length - 1)
    console.log('currentChar', currentChar)
    const spaceCheck = /[^@A-Za-z_]/g

    if (value.length === 0) {
      // this.setModalVisible(false)
      console.log('yes------------------')
    } else {
      if (spaceCheck.test(lastChar) && currentChar != '@') {
        console.log('yesyyyy------------')
        // this.setModalVisible(false)
      } else {
        const checkSpecialChar = currentChar.match(/[^@A-Za-z_]/)
        if (checkSpecialChar === null || currentChar === '@') {
          const pattern = new RegExp(`\\B@[a-z0-9_-]+|\\B@`, `gi`);
          const matches = value.match(pattern) || []
          if (matches.length > 0) {
            getUserSuggestions(matches[matches.length - 1])
            // this.setModalVisible(true)
            console.log('1------------------')
          } else {
            // this.setModalVisible(false)
            console.log('2------------------')
          }
        } else if (checkSpecialChar != null) {
          // this.setModalVisible(false)
          console.log('3------------------')
          setTag = false
        }
      }
    }
  }
  const getUserSuggestions = (keyword) => {
    console.log('checking wow')
    if (Array.isArray(userList)) {
      console.log('innnnnnnn')
      if (keyword.slice(1) === '') {
        var data = [...userList]
        console.log('checking user-----------', data)
        // this.setState({
        //   userData: [...userList],
        //   userName: keyword,
        //   isLoading: false
        // })
      } else {
        const userDataList = userList.filter(obj => obj.name.indexOf(keyword.slice(1)) !== -1)
        console.log('in else', userDataList)
        setTag = true
        // this.setState({
        //   userData: [...userDataList],
        //   userName: keyword,
        //   isLoading: false
        // })
      }
    }
  }
  const renderComposer = (props) => {
    console.log('tagShow', setTag)
    return (
      <View style={styles.composerContainer}>
        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <TextInput {...props}
              placeholder={'Type something...'}
              // ref={(input) => { this.msgInput = input; }}
              onChangeText={(value) => suggestion(value, props)}
              // style={[tagShow ? styles.textInput : styles.textInput1]}
              style={{
                fontSize: 14,
                letterSpacing: 1,
                height: 50,
                minWidth: 250,
                maxWidth: 250,
                borderWidth: 0,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                color: '#000'
              }}

              // value={props.text}
              multiline={true}
              onPressIn={
                () => console.log('pressd me')
              }
            ><Text style={{
              color: setTag ? 'blue' : 'red'
            }}>{
                  messageText}</Text>
            </TextInput>

          </TouchableOpacity>
          <Send {...props} containerStyle={styles.sendWrapperStyle} >
            <View style={styles.sendContainer}>
              <Image source={require('../../assets/Send.png')} style={styles.sendIconStyle} />
            </View>
          </Send>
        </View>
      </View>
    )
  }
  const onDelete = (messageIdToDelete, id) => {
    const messageRef = firestore().collection('chatrooms')
      .doc('NTT2ZqreE481dbBIjWkv')
      .collection('messages')
    messageRef.onSnapshot((querySnap) => {
      querySnap._docs.forEach((doc) => {
        if (doc.id === id) {
          doc.ref.delete();
        }
      })
    })
  }

  const onLongPress = (context, message) => {
    if (message.user._id == userId) {
      const options = ['Copy', 'Delete Message', 'Cancle'];
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions({
        options,
        cancelButtonIndex
      }, (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(message.text);
            break;
          case 1:
            onDelete(message._id, message.id)
            break;
        }
      });
    }
    else {
      const options = ['Copy', 'Cancle'];
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions({
        options,
        cancelButtonIndex
      }, (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(message.text);
            break;
        }
      });
    }

  }
  return (
    <View style={styles.container}>
      <GiftedChat
        // renderComposer={(text) => renderComposer(text)}
        onLongPress={(context: any, message: any) => { onLongPress(context, message) }}
        renderUsernameOnMessage={true}
        messages={messages}
        onSend={messages => onSend(messages)}
        showUserAvatar={true}
        user={{
          _id: userId,
          name: 'inn'
        }}
        listViewProps={{
          scrollEventThrottle: 400,
          onScroll: ({ nativeEvent }) => { if (isCloseToTop(nativeEvent)) loadMoreMessage(); }
        }}
        alwaysShowSend={true}
        // renderSend={renderSend}
        minComposerHeight={55}
        maxComposerHeight={55}
        bottomOffset={Platform.select({
          ios: 200,
          android: 0
        })}
        onInputTextChanged={text => suggestion(text)}

      />
      <KeyboardAvoidingView behavior={'padding'} enabled
        keyboardVerticalOffset={Platform.select({
          ios: 15,
          android: 0
        })} />
    </View>
  )
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
    backgroundColor: 'rgb(245, 245, 245)',
  },
  msgListContainer: {
    width: '100%',
  },
  listContainer: {
    width: '100%',
  },
  sendIconStyle: {
    height: 30,
    width: 30,
  },
  composerContainer: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    paddingTop: 5
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '85%'
  },
  textInput: {
    fontSize: 14,
    letterSpacing: 1,
    height: 50,
    minWidth: 250,
    maxWidth: 250,
    borderWidth: 0,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'red'
  },
  textInput1: {
    fontSize: 14,
    letterSpacing: 1,
    height: 50,
    minWidth: 250,
    maxWidth: 250,
    borderWidth: 0,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#000'
  },
  sendWrapperStyle: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  suggestionClickStyle: {
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 10,
    padding: 10
  },
  suggestionRowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 5
  },
  userNameText: {
    fontSize: 13,
    letterSpacing: 1,
    width: '80%',
    marginLeft: 10
  },
  modalContainer: {
    position: 'absolute',
    bottom: Dimensions.get('window').width / 2 + 120, // Give bottom as per your requirement here I have given with keyboard height and composer input height
    justifyContent: 'flex-end',
    alignSelf: 'center',
    margin: 0,
    ...Platform.select({
      android: {
        marginBottom: 70
      },
      ios: {
        marginBottom: 95
      }
    })
  },
  suggestionContainer: {
    maxHeight: 190,
    backgroundColor: 'rgba(0,0,0,0.08)',
    width: '100%'
  },
  suggestionListStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
