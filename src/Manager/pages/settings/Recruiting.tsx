import CreateProjectUsers from '@src/Manager/forms/CreateProjectUsers';
import FormCard from '@src/Manager/components/cards/FormCard';
import LoadingModal from '@src/Manager/components/ModalLoading';
import React, { FC, useContext } from 'react';
import SettingsOpportunityJob from '@src/Manager/forms/SettingsOpportunityJob';
import SettingsProjectNeeds from '@src/Manager/forms/SettingsProjectNeeds';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { ProjectContext } from '@src/Manager/ManagerWrapper';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';

const RecruitingSettings: FC = () => {
  const { userId, loading: loadingUser } = useContext(UserContext);
  const { loading: userLoading, data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;

  const { projectSlug } = useContext(ProjectContext);
  const { loading, data: projectData } = useQuery(GET_PROJECT, {
    variables: { projectSlug: projectSlug },
  });
  const project = projectData?.getProject;

  if (!user || !project) {
    return <LoadingModal />;
  }
  const projectId = project && project.id;
  return (
    <div>
      <FormCard>
        <CreateProjectUsers project={project} />
      </FormCard>
      <FormCard>
        <SettingsProjectNeeds project={project} />
      </FormCard>
      <hr className="my-10" />
      <FormCard>
        <SettingsOpportunityJob projectId={projectId} />
      </FormCard>
      <hr className="my-10" />
      <h1 className="text-xl md:text-2xl font-semibold md:mb-10 ">Update existing job descriptions</h1>
      {project.jobs?.map((job) => {
        return (
          <FormCard>
            <SettingsOpportunityJob job={job} />
          </FormCard>
        );
      })}
    </div>
  );
};

export default RecruitingSettings;
