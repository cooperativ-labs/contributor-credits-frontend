import ActionsBlock from '@src/Manager/pages/projects/ProjectActionsBlock';
import Card from '@src/containers/Card';
import CCClassCard from '../cards/CCClassCard';
import ChooseConnectorButton from '@src/Manager/ChooseConnectorButton';
import React, { FC } from 'react';
import UnestablishedContractCard from '../cards/UnestablishedContractCard';
import { ContributorCreditClass, User } from 'types';
import { unique } from '@src/utils/helpersGeneral';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import CompensationPackage from '@src/components/CompensationPackage';

interface ClassCardListProps {
  user: User;
  setSelectedClassId: any;
  agreements: ContributorCreditClass[];
  unestablishedSmartContracts;
  memberAddresses: string[];
}

export const colStyle = 'col-span-1 uppercase text-sm font-bold text-gray-700';

const ClassCardList: FC<ClassCardListProps> = ({
  setSelectedClassId,
  user,
  agreements,
  unestablishedSmartContracts,
  memberAddresses,
}) => {
  const { active, chainId } = useWeb3React<Web3Provider>();

  if (!user) {
    return <></>;
  }

  const contributorCreditClassesOwned = () => {
    const ccClasses = agreements.map((signatory) => {
      return signatory.agreement.contributorCreditClass;
    });
    return unique(ccClasses);
  };

  // const contributorCreditClassesReceived = () => {
  //   const ccClasses = agre.payments.map((payment) => {
  //     return payment.agreement.contributorCreditClass;
  //   });
  //   return unique(ccClasses);
  // };

  // const existingClasses = contributorCreditClassesOwned().length > 0 || contributorCreditClassesReceived().length > 0;
  const existingClasses = contributorCreditClassesOwned().length > 0;
  if (active) {
    return (
      <Card className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-cDarkBlue text-xl font-semiBold">Contributor Credits</h1>
        <div className="text-cLightBlue text-sm mb-10">
          Contributor Credits let you easily commit to paying your contributors in the future. Each Credit is worth 1
          unit of backing currency (USD, EUR, etc.) at the trigger defined in the associated legal text.
        </div>
        {existingClasses && (
          <div className="hidden md:grid grid-cols-4 p-1 px-2">
            <div className={colStyle}>Class</div>
            <div className={colStyle}>Triggers</div> <div className={colStyle}>Numbers</div>
            <div className={colStyle}>Funding</div>
          </div>
        )}
        <div className="flex flex-wrap">
          {contributorCreditClassesOwned().map((cClass, index) => {
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
          {unestablishedSmartContracts.map((unestablishedContract, index) => {
            if (unestablishedContract?.cryptoAddress.chainId === chainId && !unestablishedContract.used)
              return (
                <div key={index} className="my-2 w-full ">
                  <UnestablishedContractCard unestablishedContract={unestablishedContract} />
                </div>
              );
          })}
          {/* {contributorCreditClassesReceived().map((cClass, index) => {
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
          })} */}
        </div>
        <ActionsBlock userId={user.id} />
      </Card>
    );
  }
  return <ChooseConnectorButton buttonText="Connect your Ethereum wallet to see Contributor Credits" large />;
};

export default ClassCardList;
