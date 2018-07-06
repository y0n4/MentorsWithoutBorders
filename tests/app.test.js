import React from 'react';
// Functions needed for testing
import {
  configure, shallow, mount, render,
} from 'enzyme';

import App from '../client/components/App';

describe('Component: App', () => {
  const wrapper = shallow(<App />);

  it('should render without throwing an error', () => {
    expect(wrapper.hasClass('main')).toBe(true);
  });

  it('should have a button for Google OAuth login', () => {
    expect(wrapper.hasClass('theButton')).toBe(true);
  });
});
