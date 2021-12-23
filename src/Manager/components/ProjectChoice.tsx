import Button from '@src/components/Buttons/Button';
import React, { FC } from 'react';
import { Project } from 'types';
import { useRouter } from 'next/router';

type ProjectChoiceProps = {
  project: Project;
};

const ProjectChoice: FC<ProjectChoiceProps> = ({ project }) => {
  const router = useRouter();
  return (
    <Button
      className="w-full"
      onClick={() => {
        // dispatch({ type: 'SET_PROJECT', payload: project });
        window.sessionStorage.setItem('CHOSEN_PROJECT', project.slug);
        router.push(`/manager/${project.slug}`);
      }}
    >
      <div className="grid grid-cols-9 gap-3 items-center p-2 hover:bg-gray-200 rounded-xl">
        <div className="col-span-2 flex justify-center">
          <div className="flex overflow-hidden items-center rounded-full h-8 w-8 border-2 border-gray-200 shadow-inner bg-gray-100">
            <img src={project.info.logo ?? '/assets/images/company-logos/company-placeholder.jpeg'} />
          </div>
        </div>
        <div className="col-span-7 text-sm text-left ml-1 font-medium text-gray-600 justify-self-start">
          {project.name}
        </div>
      </div>
    </Button>
  );
};

export default ProjectChoice;
