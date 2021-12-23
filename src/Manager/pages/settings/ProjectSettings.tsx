import CreateProjectUsers from '@src/Manager/forms/CreateProjectUsers';
import FormCard from '@src/Manager/components/cards/FormCard';
import LoadingModal from '@src/Manager/components/ModalLoading';
import React, { FC, useContext } from 'react';
import SettingsProjectDocuments from '@src/Manager/forms/SettingsProjectDocuments';
import SettingsProjectFullDescription from '@src/Manager/forms/SettingsProjectFullDescription';
import SettingsProjectMainProfile from '@src/Manager/forms/SettingsProjectMainProfile';
import SettingsProjectUserFinancialInvestment from '@src/Manager/forms/SettingsProjectUserFinancialInvestment';
import useProjectUsers from '@hooks/useProjectUsers';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { ProjectContext } from '@src/Manager/ManagerWrapper';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';

const ProjectSettings: FC = () => {
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
  const { myProjectUser, isProjectManager } = useProjectUsers(project, user);

  return (
    <div>
      {isProjectManager ? (
        <>
          <div className="lg:grid grid-flow-row-dense grid-cols-2 gap-4">
            <FormCard>
              <SettingsProjectMainProfile project={project} />
            </FormCard>
            <FormCard>
              <SettingsProjectFullDescription project={project} />
            </FormCard>
          </div>
          <div>
            <FormCard maxWidth>
              <SettingsProjectDocuments project={project} />
            </FormCard>

            <FormCard maxWidth>
              <SettingsProjectUserFinancialInvestment projectUser={myProjectUser} />
            </FormCard>
          </div>
        </>
      ) : (
        <div>
          <FormCard>
            <SettingsProjectUserFinancialInvestment projectUser={myProjectUser} />
          </FormCard>
        </div>
      )}
    </div>
  );
};

export default ProjectSettings;
