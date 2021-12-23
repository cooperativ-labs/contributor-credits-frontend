import ActionsBlock from '@src/Manager/pages/projects/ProjectActionsBlock';
import Card from '@src/containers/Card';
import CCClassCard from '../cards/CCClassCard';
import ChooseConnectorButton from '@src/Manager/ChooseConnectorButton';
import React, { FC, useContext } from 'react';
import UnestablishedContractCard from '../cards/UnestablishedContractCard';
import useProjectUsers from '@hooks/useProjectUsers';
import { colStyle } from '@src/Manager/pages/projects/credits/Obligations';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { getSignatories } from '@src/utils/helpersAgreement';
import { Project, User } from 'types';
import { ProjectContext } from '@src/Manager/ManagerWrapper';
import { unique } from '@src/utils/helpersGeneral';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

interface ClassCardListProps {
  user: User;
  setSelectedClassId: any;
}

const ClassCardList: FC<ClassCardListProps> = ({ setSelectedClassId, user }) => {
  const { active, chainId } = useWeb3React<Web3Provider>();
  const { projectSlug } = useContext(ProjectContext);
  const { data: projectData } = useQuery(GET_PROJECT, {
    variables: { projectSlug: projectSlug },
  });
  const project = projectData?.getProject;
  if (!user || !project) {
    return <></>;
  }
  const { unestablishedSmartContracts } = project;
  const { projectUsers, isProjectManager, memberAddresses } = useProjectUsers(project, user);

  const contributorCreditClasses = () => {
    const withCCs = getSignatories(projectUsers).filter((signatory) => {
      return signatory.agreement.contributorCreditClass;
    });
    const ccClasses = withCCs.map((signatory) => {
      return signatory.agreement.contributorCreditClass;
    });
    return unique(ccClasses);
  };

  if (active) {
    return (
      <Card className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-cDarkBlue text-xl font-semiBold ">Contributor Credits</h1>
        <div className="text-cLightBlue text-sm mb-10">
          Contributor Credits let you easily commit to paying your contributors in the future. Each Credit is worth 1
          unit of backing currency (USD, EUR, etc.) at the trigger defined in the associated legal text.
        </div>
        <div className="hidden md:grid grid-cols-4 p-1 px-2">
          <div className={colStyle}>Class</div>
          <div className={colStyle}>Triggers</div> <div className={colStyle}>Numbers</div>
          <div className={colStyle}>Funding</div>
        </div>
        <div className="flex flex-wrap">
          {contributorCreditClasses().map((cClass, index) => {
            if (cClass && cClass.cryptoAddress.chainId === chainId)
              return (
                <div key={index} className="my-2 w-full">
                  <CCClassCard
                    cClass={cClass}
                    setSelectedClassId={setSelectedClassId}
                    memberAddresses={memberAddresses}
                  />
                </div>
              );
          })}
          {!!isProjectManager &&
            unestablishedSmartContracts.map((unestablishedContract, index) => {
              if (unestablishedContract?.cryptoAddress.chainId === chainId && !unestablishedContract.used)
                return (
                  <div key={index} className="my-2 w-full ">
                    <UnestablishedContractCard unestablishedContract={unestablishedContract} />
                  </div>
                );
            })}
        </div>
        <ActionsBlock isProjectManager={!!isProjectManager} projectId={project.id} userId={user.id} />
      </Card>
    );
  }
  return <ChooseConnectorButton buttonText="Connect your Ethereum wallet to see Contributor Credits" large />;
};

export default ClassCardList;
