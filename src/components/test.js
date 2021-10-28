import React from 'react';
import { Text, View } from 'react-native';

const TestProps = ({ props }) => {

    return (
        <View>
            <Text>{props.data}</Text>
        </View>
    );
}

export default TestProps;