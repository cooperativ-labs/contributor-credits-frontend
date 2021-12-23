import React from 'react';
import RoundedImage from '@src/components/RoundedImage/RoundedImage';
import { findByTestAttr } from '__tests__/testHelpers';
import { shallow } from 'enzyme';

// Warning: If changed check props in codebase to avoid failing code and passing tests
const defaultProps = { src: '' };

/**
 * Factory function to create ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<RoundedImage {...setupProps} />);
  return wrapper;
};

describe('card component', () => {
  it('should render without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-profile-thumbnail');
    expect(component.length).toEqual(1);
  });
});
