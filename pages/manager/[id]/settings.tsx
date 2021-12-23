import ManagerWrapper from '@src/Manager/ManagerWrapper';
import React from 'react';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';

import ProjectSettings from '@src/Manager/pages/settings/ProjectSettings';
import { NextPage } from 'next';
import { Project } from 'types';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

interface ProjectSettingsPageProps {
  project: Project;
}

const ProjectSettingsPage: NextPage<ProjectSettingsPageProps> = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <ManagerWrapper>
        <ProjectSettings />
      </ManagerWrapper>
    </div>
  );
};

export default ProjectSettingsPage;
