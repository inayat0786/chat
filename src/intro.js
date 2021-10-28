// Intro.js
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Intro extends Component {
    constructor() {
        super();
        this.state = {
            data: 0
        };
    }
    change(x) {
        this.setState({ data: x * 5 })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native</Text>
                <Text style={styles.instructions} onPress={() => this.change()}>
                    This is a React Native snapshot test.
                </Text>
                <Text style={styles.instructions} onPress={() => this.change()}>
                    Adding Text.
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',
    },
    instructions: {
        color: '#333333',
        marginBottom: 5,
        textAlign: 'center',
    },
    welcome: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
});

export default Intro;


// import React, { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// const Intro = () => {

//     const [data, setData] = useState(0);

//     const change = (x) => {
//         // setData(x * 5)
//         return x * 5
//     }
//     return (
//         <View style={styles.container}>
//             <Text style={styles.welcome}>Welcome to React Native</Text>
//             <Text style={styles.instructions} onPress={() => change()}>
//                 This is a React Native snapshot test.
//             </Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//         flex: 1,
//         justifyContent: 'center',
//     },
//     instructions: {
//         color: '#333333',
//         marginBottom: 5,
//         textAlign: 'center',
//     },
//     welcome: {
//         fontSize: 20,
//         margin: 10,
//         textAlign: 'center',
//     },
// });

// export default Intro;
