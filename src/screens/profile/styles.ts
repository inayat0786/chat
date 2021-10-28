// import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     main: {
//         height: "50%",
//         alignItems: "center",
//         justifyContent: "flex-end"
//     },
//     text: {
//         fontSize: 20,
//         alignSelf: 'center',
//         alignItems: 'flex-end',
//         color: "red"
//     },
//     profileImageMain: {
//         backgroundColor: "#4d71c0",
//         width: "100%",
//         height: 100,
//         borderTopRightRadius: 0,
//         borderBottomRightRadius: 70,
//     },
//     imageMain: {
//         position: "absolute",
//         top: 25,
//         left: "32%",
//         alignSelf: "center",
//         flex: 1,
//         marginTop: 30,
//         marginLeft: 20
//     },
//     imageView: {
//         backgroundColor: '#000',
//         height: 100,
//         width: 100,
//         borderRadius: 50
//     },
//     ProfileDetailCardMain: {
//         width: "95%",
//         alignSelf: "center",
//         backgroundColor: "#F4F5F7",
//         marginTop: 5,
//         marginBottom: 5,
//         padding: 5,
//         borderRadius: 5,
//     },
//     contactDetailCard1: {
//         width: "100%",
//         alignSelf: "center",
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 10,
//         marginBottom: 10

//     },
//     contactDetailCard2: {
//         width: "90%",
//         height: 50,
//         alignSelf: "center",
//         alignItems: "center",
//         marginTop: 5,
//         backgroundColor: '#fff',
//         flexDirection: 'row',
//         borderColor: '#ddd',
//         borderWidth: 1,
//         borderRadius: 5,
//         marginBottom: 13,
//         paddingLeft: 10,
//         shadowOpacity: 0.9,
//         shadowRadius: 3,
//         shadowOffset: {
//             height: 1,
//             width: 1,
//         },
//         elevation: 5,
//     },
//     inputProfileLocation: {
//         width: "90%",
//         color: "#000",
//         height: 50,
//         borderColor: '#ddd',
//         fontFamily: 'sans-serif-medium',
//         fontSize: 14,
//     },
//     button: {
//         borderRadius: 5,
//         backgroundColor: '#2dce89',
//         width: 300,
//         marginBottom: 10
//     },
//     modalBox: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: 200,
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10,
//         width: '100%',
//     },
//     devider: {
//         backgroundColor: 'gray',
//         width: 80,
//         height: 10,
//         borderRadius: 10,
//         position: 'absolute',
//         top: 10
//     }
// });

import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },

    imageView: {
        backgroundColor: '#000',
        height: 90,
        width: 90,
        borderRadius: 50,
        alignSelf: 'center',
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        fontSize: 15
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    headerLogin: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footerLogin: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },

    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },

    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    buttonLogin: {
        alignItems: 'center',
        marginTop: 20
    },
    modalBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
    },
    devider: {
        backgroundColor: 'gray',
        width: 80,
        height: 10,
        borderRadius: 10,
        position: 'absolute',
        top: 10
    }
});