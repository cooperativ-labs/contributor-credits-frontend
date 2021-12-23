import Button from '@src/components/Buttons/Button';
import ProjectChoice from './ProjectChoice';
import React, { FC, useContext, useState } from 'react';
import StandardButton from './buttons/StandardButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { ProjectContext } from '../ManagerWrapper';
import { ProjectUser } from 'types';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';

type ProjectChooserProps = {
  projectUsers: ProjectUser[];
};

const ProjectChooser: FC<ProjectChooserProps> = ({ projectUsers }) => {
  const { userId, loading: loadingUser } = useContext(UserContext);
  const { loading: userLoading, data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;
  const { projectSlug } = useContext(ProjectContext);
  const { loading, data: projectData } = useQuery(GET_PROJECT, {
    variables: { projectSlug: projectSlug },
  });
  const project = projectData?.getProject;
  const [chooserOpen, setChooserOpen] = useState<boolean>(false);

  if (!user || !project) {
    return <></>;
  }

  const MobileVersion: FC = () => {
    return (
      <Button
        aria-label={chooserOpen ? 'expand section' : 'collapse section'}
        onClick={() => setChooserOpen(!chooserOpen)}
      >
        <div className="md:hidden grid grid-cols-9 gap-3 items-center">
          <div className="col-span-2 flex overflow-hidden flex-shrink-0 items-center rounded-full h-12 w-12 border-2 border-gray-200 shadow-inner bg-gray-100">
            <img src={project?.info.logo ?? '/assets/images/company-logos/company-placeholder.jpeg'} />
          </div>
          <div className="col-span-6 ml-1 font-medium text-gray-800 justify-self-start">{project?.name}</div>
          <div className="col-span-1 font-medium flex justify-end text-gray-500">
            {chooserOpen ? <FontAwesomeIcon icon="chevron-down" /> : <FontAwesomeIcon icon="chevron-up" />}
          </div>
        </div>
      </Button>
    );
  };

  const DesktopVersion: FC = () => {
    return (
      <Button
        aria-label={chooserOpen ? 'expand section' : 'collapse section'}
        onClick={() => setChooserOpen(!chooserOpen)}
      >
        <div className="hidden md:flex flex-col items-center mb-1">
          <div className="grid grid-cols-3 gap-3 items-center">
            <div className="col-span-1" />
            <div className="col-span-1 flex overflow-hidden flex-shrink-0 items-center rounded-full h-16 w-16 border-2 border-gray-200 shadow-inner bg-gray-100">
              <img src={project?.info.logo ?? '/assets/images/company-logos/company-placeholder.jpeg'} />
            </div>
            <div className="col-span-1 font-medium  text-gray-500">
              {chooserOpen ? <FontAwesomeIcon icon="chevron-down" /> : <FontAwesomeIcon icon="chevron-up" />}
            </div>
          </div>
          <div className="flex text-center font-medium text-gray-700 mt-3">{project?.name}</div>
        </div>
      </Button>
    );
  };

  return (
    <div>
      {project ? (
        <div>
          <MobileVersion />
          <DesktopVersion />
        </div>
      ) : (
        <div className="flex justify-center mb-2">
          <StandardButton outlined link="manager/create-project" text="Create Project" />
        </div>
      )}
      {chooserOpen && (
        <div className="mt-3">
          {projectUsers?.map((pUser, i) => {
            return pUser.project !== project && <ProjectChoice key={i} project={pUser.project} />;
          })}
          <div className="flex justify-center ml-2 my-2">
            <StandardButton outlined link="/manager/create-project" text="Create Project" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectChooser;
