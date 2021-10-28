import React, { useState, useEffect } from 'react';
import styles from './styles';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    Alert,
    ActivityIndicator,
    Image,
} from 'react-native';
// @ts-ignore
import Entypo from 'react-native-vector-icons/Entypo';
import { Button } from 'native-base';
import Types from '../../Model/types';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../actions/auth';
import Toast from 'react-native-toast-message';
import { emailValadation, checkPassword } from '../../components/valdation';
import { ErrrorHandlerProfile } from '../../components/ErrorComponent';


import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-picker';
// @ts-ignore
import ModalBox from 'react-native-modalbox';
import storage from '@react-native-firebase/storage';
import { upadteUser } from '../../actions/auth';

const ProfileScreen = ({ navigation }: Types) => {
    const userData = useSelector((state: any) => state.user.data)
    const dispatch = useDispatch()
    const [Email, setEmail] = useState(userData?.email)
    const [Password, setPassword] = useState('')
    const [Fname, setFname] = useState(userData?.FullName)
    const [gender, setGender] = useState(userData?.gender)
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


    const selectImageG = () => {
        setModalVisible(false)
        let options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose Photo from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };
                console.log(response.assets[0].uri);
                // setImage(source);
                uploadImage(response.assets[0].uri)
            }
        });
    };
    const selectImageC = () => {
        setModalVisible(false)
        let options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose Photo from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };
                console.log(response.assets[0].uri);
                // setImage(source);
                uploadImage(response.assets[0].uri)
            }
        });
    };

    const tryUpdate = async () => {
        console.log('image state', image)
        if (Fname && address && image && gender) {
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
            // setImage(imageUri);
            uploadImage(imageUri)


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
            // setImage(imageUri);
            uploadImage(imageUri)
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
            setImage(url);
            setUploading(false);
            return url;
        } catch (e) {
            setImage(null);
            console.log(e);
            return null;
        }
    }

    return (
        <View style={styles.container}>
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                {/* <Text style={styles.text_header}>Register Now!</Text> */}
                <View style={{
                    alignSelf: "center",
                    // justifyContent: 'center'
                }}>
                    <Image
                        style={styles.imageView}
                        source={{
                            uri: image ? image : 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(true)}
                        style={{ position: 'absolute', }}>
                        <Entypo
                            name="camera"
                            size={35}
                            style={{
                                backgroundColor: '#fffff000',
                                alignSelf: "flex-end",
                            }}
                            color={'#9d9d9d'}
                        />
                    </TouchableOpacity>
                </View>

            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.text_footer}>Full Name</Text>
                    <View style={styles.action}>
                        <Entypo
                            name="user"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Full Namme"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={Fname}
                            onChangeText={(val) => setFname(val)}
                        />
                    </View>
                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Email</Text>
                    <View style={styles.action}>
                        <Entypo
                            name="email"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Email"
                            style={styles.textInput}
                            editable={false}
                            value={Email}
                        />
                    </View>
                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Address</Text>
                    <View style={styles.action}>
                        <Entypo
                            name="location-pin"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Address"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={address}
                            onChangeText={(val) => setAddress(val)}
                        />
                    </View>
                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Gender</Text>
                    <View style={styles.action}>
                        <Entypo
                            name="man"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Gender"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={gender}
                            onChangeText={(val) => setGender(val)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => tryUpdate()}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                {
                                    loader ?
                                        <ActivityIndicator size="small" color="#BBC0FF" />
                                        :
                                        <Text style={[styles.textSign, {
                                            color: '#fff'
                                        }]}>Update</Text>
                                }
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
            <ModalBox style={styles.modalBox}
                position={"bottom"}
                isOpen={modalVisible}
                swipeToClose={true}
                onClosed={() => setModalVisible(false)}
            >
                <View style={styles.devider} />
                <View style={{ width: '80%', }}>
                    <Button info block
                        onPress={() => selectImageC()}
                    ><Text> Open Camera </Text></Button>
                    <Button info block
                        onPress={() => selectImageG()}
                        style={{ marginTop: 10 }}><Text> Open Gallery </Text></Button>
                </View>
            </ModalBox>
        </View>
    );
};

export default ProfileScreen;



