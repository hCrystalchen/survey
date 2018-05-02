import React from 'react';
import Register from 'survey/components/Register';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Register />).toJSON();
  expect(tree).toMatchSnapshot();
});