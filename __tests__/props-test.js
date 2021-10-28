import React from 'react';
import Test from '../src/propsTest';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

it('test props', () => {
    const wrapper = shallow(<Test />).props();
    console.log(wrapper.children.props)
    expect(wrapper.children.props.data).toEqual('inayat')
});