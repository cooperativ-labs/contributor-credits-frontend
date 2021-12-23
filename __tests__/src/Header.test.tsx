import Header from '@src/containers/Header/Header';
import React from 'react';
import { findByTestAttr } from '__tests__/testHelpers';
import { ProjectInfoIntention } from 'types';
import { shallow, ShallowWrapper } from 'enzyme';

// Warning: If changed check props in codebase to avoid failing code and passing tests
const defaultProps = {};

/**
 * Factory function to create ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (
  props = {
    projectSlug: 'project',
    projectName: 'Project Name',
    projectCategory: 'Project Category',
    projectThumbnail: 'thumbnail',
    projectIntention: ProjectInfoIntention.BuildingABusiness,
    brandColor: '#CCCCCC',
    lightBrand: true,
    primaryHeader: true,
    page: 'test',
  }
): ShallowWrapper => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<Header {...setupProps} />);
  return wrapper;
};

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('header component', () => {
  it('should render without error', () => {
    useRouter.mockImplementationOnce(() => ({
      query: { id: 'lorem-IPSUM-1337' },
    }));
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'molecule-header');
    expect(component.length).toEqual(1);
  });
});
