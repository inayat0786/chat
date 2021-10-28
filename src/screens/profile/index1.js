import React, { useState, useEffect } from 'react';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    TextInput,
    ScrollView,
    Alert,
    Image,
    Platform,
    ActivityIndicator
} from 'react-native';

// @ts-ignore
import Entypo from 'react-native-vector-icons/Entypo';
import Types from '../../Model/types';
import { Button } from 'native-base';
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-crop-picker';
// @ts-ignore
import ModalBox from 'react-native-modalbox';
import storage from '@react-native-firebase/storage';
import { useSelector, useDispatch } from 'react-redux';
import { upadteUser } from '../../actions/auth';
import Toast from 'react-native-toast-message';
import { ErrrorHandlerProfile } from '../../components/ErrorComponent';

const ProfileScreen = ({ navigation, route }: Types) => {
    const userData = useSelector((state: any) => state.user.data)
    const dispatch = useDispatch()
    const [Email, setEmail] = useState(userData?.email)
    const [Password, setPassword] = useState('')
    const [Fname, setFname] = useState(userData?.FullName)
    const [gender, setGender] = useState(userData?.address)
    const [image, setImage] = useState(userData?.profileImage);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);
    const [uId, setUid] = useState(null);
    const [modalVisible, setModalVisible] = useState(false)
    const [address, setAddress] = useState(userData?.address)
    const loader = useSelector((state: any) => state.auth.loader)

    React.useEffect(() => {
    }, []);

    const tryUpdate = async () => {
        if (Fname && address && image) {
            const data = {
                FullName: Fname,
                address: address,
                gender: gender,
                email: Email,
                profileImage: image
            }
            dispatch(upadteUser(data))
        }
        else {
            ErrrorHandlerProfile('Please fill all felids!', 'error')
        }
    };
    const choosePhotoFromLibrary = () => {
        setModalVisible(false)
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        });
    };
    const takePhotoFromCamera = () => {
        setModalVisible(false)
        ImagePicker.openCamera({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        });
    };
    const uploadImage = async () => {
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
        task.on('state_changed', (taskSnapshot) => {
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
            console.log('url getted-------------', url)
            setImage(imageUri);
            setUploading(false);
            setImage(null);
            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
    return (


        <View style={styles.container}>
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <StatusBar backgroundColor={'#4d71c0'} />
            <View style={{ width: '100%', height: '30%' }}>
                <View style={styles.profileImageMain}>
                    <View
                        style={styles.imageMain}
                    >
                        <View style={{
                        }}>
                            <Image
                                style={styles.imageView}
                                source={{
                                    uri: image ? image : 'https://reactnative.dev/img/tiny_logo.png',
                                }}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setModalVisible(true)}
                            style={{ position: 'absolute' }}>
                            <Entypo
                                name="camera"
                                size={30}
                                style={{
                                    backgroundColor: '#fffff000',
                                    alignSelf: "flex-end",
                                }}
                                color={'#9d9d9d'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* <SafeAreaView > */}
            <ScrollView>
                <Animatable.View
                    useNativeDriver
                    animation={"fadeInDown"}
                    delay={400}>
                    <View style={styles.ProfileDetailCardMain}>
                        <View style={styles.contactDetailCard1}>
                            <View
                                style={styles.contactDetailCard2} >
                                <Entypo
                                    name="user"
                                    size={14}
                                    style={{ backgroundColor: '#fffff000' }}
                                    color={'#9d9d9d'}
                                />
                                <TextInput style={styles.inputProfileLocation}
                                    placeholder={'Full Name'}
                                    value={Fname}
                                    onChangeText={(val) => setFname(val)}
                                />
                            </View>
                            <View
                                style={styles.contactDetailCard2}
                            >
                                <Entypo
                                    name="user"
                                    size={14}
                                    style={{ backgroundColor: '#fffff000' }}
                                    color={'#9d9d9d'}
                                />
                                <TextInput style={styles.inputProfileLocation}
                                    placeholder={'email'}
                                    value={Email}
                                    editable={false}
                                    onChangeText={(val) => setEmail(val)}
                                />
                            </View>

                            <View
                                style={styles.contactDetailCard2}
                            >
                                <TextInput style={styles.inputProfileLocation}
                                    placeholder={address}
                                    keyboardType='number-pad'
                                    value={address}
                                    onChangeText={(val) => setAddress(val)}
                                />
                            </View>
                            <View
                                style={styles.contactDetailCard2}
                            >
                                <TextInput style={styles.inputProfileLocation}
                                    placeholder={'gender'}
                                    value={gender}
                                    onChangeText={(val) => setGender(val)}
                                />
                            </View>
                        </View>
                    </View>
                </Animatable.View>
                <View style={{ alignSelf: "center" }}>
                    <Button style={styles.button}
                        onPress={() => tryUpdate()}
                        block>
                        {
                            loader ?
                                <ActivityIndicator size="small" color="#BBC0FF" />
                                :
                                <Text style={{ color: '#fff', fontSize: 15, }}>Update</Text>
                        }
                    </Button>
                </View>
            </ScrollView>
            {/* </SafeAreaView> */}
            <ModalBox style={styles.modalBox}
                position={"bottom"}
                isOpen={modalVisible}
                swipeToClose={true}
                onClosed={() => setModalVisible(false)}
            >
                <View style={styles.devider} />
                <View style={{ width: '80%', }}>
                    <Button info block
                        onPress={() => takePhotoFromCamera()}
                    ><Text> Open Camera </Text></Button>
                    <Button info block
                        onPress={() => choosePhotoFromLibrary()}
                        style={{ marginTop: 10 }}><Text> Open Gallery </Text></Button>
                </View>
            </ModalBox>
        </View>

    );
}

export default ProfileScreen;