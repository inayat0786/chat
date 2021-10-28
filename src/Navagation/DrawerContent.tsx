import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import * as cookie from '../service/cookie';
import {useSelector, useDispatch} from 'react-redux';
import {LOGOUT} from '../types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthContext} from '../../components/context';
export function DrawerContent(props) {
  const userData = useSelector((state: any) => state.user.data);
  const [Email, setEmail] = useState('');

  const [Fname, setFname] = useState(userData?.FullName);
  const [image, setImage] = useState(userData?.profileImage);
  const dispatch = useDispatch();

  const paperTheme = useTheme();
  const {toggleTheme} = React.useContext(AuthContext);
  React.useEffect(() => {
    allData();
    console.log('all data', userData);
  }, []);
  // const allData = async () => {
  //     console.log('yeh in drawer', userData)
  //     setFname(userData ? userData.FullName : 'inayat')
  //     setEmail(userData?.email)
  //     setImage(userData?.profileImage)
  // }
  React.useEffect(() => {
    allData();
  }, []);
  const allData = async () => {
    var email = await cookie.getCookie('email');
    console.log('email-----', email);
    try {
      await firestore()
        .collection('users')
        .where('email', '==', email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            console.log(
              'in search---------------',
              documentSnapshot.data.profileImage,
            );
            setEmail(documentSnapshot._data.email);
            setFname(documentSnapshot._data.FullName);
            setImage(documentSnapshot._data.profileImage);
          });
        })
        .catch(error => {});
    } catch (e) {
      console.log(e);
    }
  };
  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    dispatch({type: LOGOUT});
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: image
                    ? image
                    : 'https://api.adorable.io/avatars/50/abott@adorable.png',
                }}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{Fname}</Title>
                <Caption style={styles.caption}>{Email}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              {/* <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View> */}
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
