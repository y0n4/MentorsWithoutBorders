import React from 'react';
// Functions needed for testing
import { configure, shallow, mount, render } from 'enzyme';
// Enzyme adapter to use with React16
import Adapter from 'enzyme-adapter-react-16';
// Configuring a new adapter
configure({ adapter: new Adapter() });


import App from '../client/components/App';

describe('Component: App', () => {
  const wrapper = shallow(<App />);

  it('should render without throwing an error', () => {
    expect(wrapper.hasClass('main')).toBe(true);
  });

  it('should have a button for Google OAuth login', () => {
    expect(wrapper.find('.theButton')).to.have.length(1);
  });
});