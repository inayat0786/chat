import React from 'react';
import renderer from 'react-test-renderer';
import Intro from '../src/intro';

// check function 

it('function and state tes case', () => {
    let Data = renderer.create(<Intro />).getInstance();
    expect(Data.change(2)).toEqual(20)
});

// check state

// it('function and state tes case', () => {
//     let Data = renderer.create(<Intro />).getInstance();
//     Data.change(2)
//     console.log(Data.state.data)
//     expect(Data.state.data).toEqual(10)
// });