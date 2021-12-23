import Link from 'next/link';
import LoadingModal from '@src/Manager/components/ModalLoading';
import React, { FC, useContext } from 'react';
import useProjectUsers from '@hooks/useProjectUsers';
import UserList from '@src/Manager/components/ListUsers';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { ProjectContext } from '@src/Manager/ManagerWrapper';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';

const ProjectDetails: FC = () => {
  const { userId } = useContext(UserContext);
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });

  const { projectSlug } = useContext(ProjectContext);
  const { data: projectData } = useQuery(GET_PROJECT, {
    variables: { projectSlug: projectSlug },
  });
  const user = userData?.getUser;
  const project = projectData?.getProject;

  if (!user || !project) {
    return <LoadingModal />;
  }

  const { name, info, slug } = project;

  const { creators, contributors } = useProjectUsers(project, user);

  return (
    <div className="px-4 md:py-10 h-full" style={{ backgroundColor: '#f3f5fb' }}>
      <div className="md:mx-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-2 text-gray-800 md:mb-5">{name}</h1>
        <div className="mb-4 flex">
          <a href={`/project/${slug}`} target="_blank" rel="noreferrer">
            <div className="p-2 px-3 m-2 text-sm rounded-full border-2 border-cLightBlue text-cLightBlue font-semibold">
              View Profile
            </div>
          </a>
        </div>
        <div className="my-3 text-sm">{info.shortDescription}</div>
        <hr className="border-t-2 mt-6 border-gray-300" />
        <div className="md:flex">
          <div className="mt-6">{creators ? <UserList users={creators} /> : null}</div>

          {contributors && (
            <div className="mt-6">
              <UserList users={contributors} />
            </div>
          )}
        </div>
        <hr className="border-t-2 my-6 border-gray-300" />
      </div>
    </div>
  );
};

export default ProjectDetails;
