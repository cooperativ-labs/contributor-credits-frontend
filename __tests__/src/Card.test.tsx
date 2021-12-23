import Card from '@src/containers/Card';
import React from 'react';
import { checkProps, findByTestAttr } from '__tests__/testHelpers';
import { shallow } from 'enzyme';

// Warning: If changed check props in codebase to avoid failing code and passing tests
const defaultProps = {
  children: undefined,
  name: 'test',
};

/**
 * Factory function to create ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<Card {...setupProps} />);
  return wrapper;
};

describe('card component', () => {
  it('should render without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-card');
    expect(component.length).toEqual(1);
  });
  it('should not throw an error with expected props', () => {
    const expectedProps = { children: 'lorem ipsum' };
    checkProps(Card, expectedProps);
  });
});
