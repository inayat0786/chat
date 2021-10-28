import React, { useState } from 'react'
import { SafeAreaView, Dimensions, StyleSheet, View, ActivityIndicator, Image, ScrollView, Text, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Video as vedio, Image as xyz } from 'react-native-compressor';
import RNFetchBlob from 'rn-fetch-blob'
import { createThumbnail } from "react-native-create-thumbnail";

const { width, height } = Dimensions.get('screen');

function Gallery() {
    const [images, setImages] = useState([]);
    const [loader, setLoader] = useState(false);

    const getImages = async () => {
        setLoader(true)
        const images = await ImagePicker.openPicker({
            mediaType: 'any',
            multiple: true,
        });
        let data: any = []
        await images.map(async (item, i) => {
            await filter(item).then(async (url) => {
                await data.push({
                    item: item,
                    url: url,
                })
            })
            if (data.length == images.length) {
                setLoader(false)
                setImages(data)
            }
        })
    }
    async function filter(item: any) {
        let res = null;
        let size = null;
        let img = null;
        if (item.mime === 'image/jpeg' || item.mime === 'image/png') {
            res = await xyz.compress(item.path, {
                maxWidth: 1000,
                quality: 0.5,
            });
        }
        else {
            res = await vedio.compress(
                item.path,
                {
                    compressionMethod: 'auto',
                },
                (progress) => {
                    console.log('Compression Progress: ', progress);
                }
            );
            await createThumbnail({
                url: res,
            }).then(response => {
                img = response.path
            })
        }
        await RNFetchBlob.fs.stat(res)
            .then((stats) => {
                size = stats.size
            })
        const result = {
            url: item.mime === 'image/jpeg' || item.mime === 'image/png' ? res : img,
            size: size,
        }
        return result;
    }
    if (loader) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Button title={'upload'}
                onPress={() => getImages()} />
            <View style={styles.sectionContainer}>
                <ScrollView>
                    {
                        images && images.length > 0 && images.map((item, i) =>
                            <View key={i} style={styles.boxContainer}>
                                <View style={styles.leftView}>
                                    <Image style={styles.image}
                                        source={{
                                            uri: item.item.path,
                                        }} />
                                    {
                                        item.item.mime !== "image/jpeg" && item.item.mime !== "image/png" ?
                                            <Text
                                                style={styles.playText}>
                                                Play
                                            </Text>
                                            : null
                                    }
                                    <Text style={styles.size}>size : {item.item.size / 1000 / 1024}</Text>
                                </View>
                                <View
                                    style={styles.leftView}>
                                    <Image style={styles.image}
                                        source={{
                                            uri: item.url.url,
                                        }} />
                                    <Text style={styles.size}>size : {item.url.size / 1000 / 1024}</Text>
                                </View>
                            </View>
                        )
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
    },
    sectionContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    boxContainer: {
        marginTop: 5,
        width: width,
        height: height / 5,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    leftView: {
        height: height / 5,
        width: width / 2.2,
        borderWidth: 2,
        borderRadius: 5
    },
    image: {
        height: '90%',
        width: '100%',
    },
    playText: {
        alignSelf: 'center',
        fontSize: 25,
        color: '#000',
        position: 'absolute',
        alignItems: 'center'
    },
    size: {
        color: '#000',
        fontSize: 12
    },
    loader: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default Gallery;