import ManagerWrapper from '@src/Manager/ManagerWrapper';
import ProjectDetails from '@src/Manager/pages/projects/ProjectDetails';
import React from 'react';
import { NextPage } from 'next';

const ProjectDetailsPage: NextPage = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <ManagerWrapper>
        <ProjectDetails />
      </ManagerWrapper>
    </div>
  );
};

export default ProjectDetailsPage;
