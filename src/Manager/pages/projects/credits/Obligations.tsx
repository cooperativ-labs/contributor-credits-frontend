import Card from '@src/containers/Card';
import CCClassDetails from '@src/Manager/components/containers/ClassDetails';
import ClassCardList from '@src/Manager/components/containers/ClassCardList';
import cn from 'classnames';
import FundingList from '@src/Manager/components/containers/FundingList';
import LoadingModal from '@src/Manager/components/ModalLoading';
import React, { FC, useContext, useState } from 'react';
import RevenueTokensList from '@src/Manager/components/containers/RevenueTokensList';
import useProjectUsers from 'hooks/useProjectUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { getSignatories } from '@src/utils/helpersAgreement';
import { ProjectContext } from '@src/Manager/ManagerWrapper';
import { unique } from '@src/utils/helpersGeneral';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';

export const colStyle = 'col-span-1 uppercase text-sm font-bold text-gray-700';

const Obligations: FC = () => {
  const { userId } = useContext(UserContext);
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;

  const { projectSlug } = useContext(ProjectContext);
  const { data: projectData } = useQuery(GET_PROJECT, {
    variables: { projectSlug: projectSlug },
  });
  const project = projectData?.getProject;
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(undefined);

  if (!user || !project) {
    return <LoadingModal></LoadingModal>;
  }
  const { projectUsers, isProjectManager, memberAddresses } = useProjectUsers(project, user);

  return (
    <>
      <div className="uppercase font-bold text-cLightBlue text-sm mb-4">Obligations</div>

      <div className={cn(selectedClassId ? 'grid-cols-3 gap-4' : 'grid-cols-2', 'md:grid')}>
        <div className={cn(selectedClassId ? 'hidden md:flex col-span-2' : 'flex md:col-span-2', 'flex-col')}>
          <ClassCardList user={user} setSelectedClassId={setSelectedClassId} />
          <RevenueTokensList />
          <FundingList />
        </div>
        <div className="col-span-1">
          {selectedClassId && (
            <Card className="relative bg-white rounded-xl shadow-md p-6">
              <button
                id="close-button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedClassId(undefined);
                }}
                className="absolute -top-1 right-0 hover:shadow-lg text-gray-800 w-10 h-10 m-2 rounded-full"
              >
                <FontAwesomeIcon icon="times" />
              </button>
              <CCClassDetails
                project={project}
                classId={selectedClassId}
                projectUsers={projectUsers}
                isProjectManager={!!isProjectManager}
                memberAddresses={memberAddresses}
                user={user}
              />
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Obligations;
