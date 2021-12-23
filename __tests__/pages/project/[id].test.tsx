import ProjectProfile from '@pages/project/[id]';
import React from 'react';
import { findByTestAttr } from '__tests__/testHelpers';
import { Project } from 'types';
import { ResultProps } from '@interfaces/types';
import { shallow } from 'enzyme';

// Warning: If changed check props in codebase to avoid failing code and passing tests
const defaultProps: Project = {};

/**
 * Factory function to create ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<ProjectProfile {...setupProps} />);
  return wrapper;
};

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('project page', () => {
  it('should render without error', () => {
    useRouter.mockImplementationOnce(() => ({
      query: { id: 'lorem-IPSUM-1337' },
    }));
    const wrapper = setup();
    const application = findByTestAttr(wrapper, 'component-project');
    expect(application.length).toEqual(1);
  });
});
