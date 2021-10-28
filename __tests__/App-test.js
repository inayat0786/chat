/**
 * @format
 */

import React from 'react';
import renderer from 'react-test-renderer';
import Intro from '../src/intro';

// let findElement = function (tree, element) {
//   let result = undefined;
//   for (node in tree.children) {
//     if (tree.children[node].children[0] === element) {
//       result = true
//       console.log(node, element)
//     }

//   }
//   return result
// }
// it('find Element', () => {
//   let tree = renderer.create(
//     <Intro />
//   ).toJSON();
//   expect(findElement(tree, 'Welcome to React Native')).toBeDefined()
// })

// it('renders correctly', () => {
//   renderer.create(<Login />).toJSON();
//   expect(snap).toMatchSnapshot()
// });

test('renders correctly', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});