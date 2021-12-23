import LoadingModal from '@src/Manager/components/ModalLoading';
import React, { FC, useContext } from 'react';
import SectionBlock from '@src/Manager/components/containers/SectionBlock';
import useProjectUsers from '@hooks/useProjectUsers';
import UserList from '@src/Manager/components/ListUsers';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { ProjectContext } from '@src/Manager/ManagerWrapper';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';

const TeamInfo: FC = () => {
  const { userId } = useContext(UserContext);
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;

  const { projectSlug } = useContext(ProjectContext);
  const { data: projectData } = useQuery(GET_PROJECT, {
    variables: { projectSlug: projectSlug },
  });
  const project = projectData?.getProject;

  if (!user || !project) {
    return <LoadingModal />;
  }
  const { creators, contributors, advisors, investors, supporters } = useProjectUsers(project, user);

  return (
    <div>
      <div className="uppercase font-bold text-cLightBlue text-sm mb-4">Team</div>
      <div className="md:flex">
        {creators ? <UserList users={creators} /> : null}
        {contributors.length > 0 && (
          <SectionBlock sectionTitle="Contributors" className="mt-6">
            <UserList users={contributors} />
          </SectionBlock>
        )}
        {advisors.length > 0 && (
          <SectionBlock sectionTitle="Advisors" className="mt-6">
            <UserList users={advisors} />
          </SectionBlock>
        )}
        {investors.length > 0 && (
          <SectionBlock sectionTitle="Investors" className="mt-6">
            <UserList users={investors} />
          </SectionBlock>
        )}
        {supporters.length > 0 && (
          <SectionBlock sectionTitle="Supporters" className="mt-6">
            <UserList users={supporters} />
          </SectionBlock>
        )}
      </div>
    </div>
  );
};

export default TeamInfo;
