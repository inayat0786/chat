import React from 'react';
import { create } from 'react-test-renderer';
import MyScreen from '../src/navigation';

const navigation = {
    navigate: jest.fn()
};

const tree = create(<MyScreen navigation={navigation} />)

test('navigate to profile screen', () => {
    const button = tree.root.findByProps({ testID: 'myBotton' }).props;
    button.onPress();
    expect(navigation.navigate).toBeCalledWith('Profile');
});