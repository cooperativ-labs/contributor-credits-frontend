import Index from '@pages/index';
import React from 'react';
import { findByTestAttr } from '__tests__/testHelpers';
import { ResultProps } from '@interfaces/types';
import { shallow } from 'enzyme';

// Warning: If changed check props in codebase to avoid failing code and passing tests
const defaultProps: ResultProps = { result: { projects: [] } };

/**
 * Factory function to create ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<Index {...setupProps} />);
  return wrapper;
};

describe('index page', () => {
  it('should render without error', () => {
    const wrapper = setup();
    const application = findByTestAttr(wrapper, 'component-landing');
    expect(application.length).toEqual(1);
  });
});
