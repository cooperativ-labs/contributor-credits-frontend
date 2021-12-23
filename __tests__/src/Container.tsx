import Container from '@src/containers/Container';
import React from 'react';
import { findByTestAttr } from '__tests__/testHelpers';
import { shallow } from 'enzyme';

// Warning: If changed check props in codebase to avoid failing code and passing tests
const defaultProps = {};

/**
 * Factory function to create ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<Container {...setupProps} />);
  return wrapper;
};

describe('container component', () => {
  it('should render without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-container');
    expect(component.length).toEqual(1);
  });
});
