import ActionsBlock from '@src/Manager/pages/projects/ProjectActionsBlock';
import Card from '@src/containers/Card';
import CCClassCard from '../cards/CCClassCard';
import ChooseConnectorButton from '@src/Manager/ChooseConnectorButton';
import React, { FC, useState } from 'react';
import UnestablishedContractCard from '../cards/UnestablishedContractCard';
import { ContributorCreditClass, User } from 'types';
import { GET_PAYMENTS } from '@src/utils/dGraphQueries/agreement';
import { unique } from '@src/utils/helpersGeneral';
import { useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { GET_CC_CONTRACTS, GET_CRYPTO_ADDRESS } from '@src/utils/dGraphQueries/crypto';

interface ClassCardListProps {
  user: User;
  setSelectedClassId: any;
  agreements: ContributorCreditClass[];
  unestablishedSmartContracts;
}

export const colStyle = 'col-span-1 uppercase text-sm font-bold text-gray-700';

const ClassCardList: FC<ClassCardListProps> = ({
  setSelectedClassId,
  user,
  agreements,
  unestablishedSmartContracts,
}) => {
  const { active, chainId, account } = useWeb3React<Web3Provider>();

  const { data: paymentsData, loading } = useQuery(GET_PAYMENTS, {
    variables: { recipient: account },
  });

  console.log({ paymentsData, loading });

  const paymentsToMe = [];

  const getUniqueSenders = unique(
    paymentsToMe.map((payment) => {
      return payment.sender;
    })
  );
  //get sender addresses from payments
  //look up CC contracts via sender
  const {
    data: CcClassesData,
    error: ClassesError,
    loading: ClassesLoading,
  } = useQuery(GET_CC_CONTRACTS, {
    variables: { cryptoAddresses: getUniqueSenders },
  });

  console.log({ CcClassesData, ClassesError, ClassesLoading });
  const myClasses = CcClassesData?.queryContributorCreditClass;

  if (!user || !paymentsToMe) {
    return <></>;
  }

  const contributorCreditClasses = () => {
    const ccClassesPaid = agreements.map((signatory) => {
      return signatory.agreement.contributorCreditClass;
    });
    // myClasses.push(...ccClassesPaid);
    return unique(ccClassesPaid);
  };
  console.log(contributorCreditClasses());
  const existingClasses = contributorCreditClasses().length > 0;
  if (active) {
    return (
      <Card className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-cDarkBlue text-xl font-semiBold">Contributor Credits</h1>
        <div className="text-cLightBlue text-sm">
          Contributor Credits let you easily commit to paying your contributors in the future. Each Credit is worth 1
          unit of backing currency (USDC, DAI, etc.) at the trigger defined in the associated legal text.
        </div>
        {existingClasses && (
          <div className="hidden mt-10 md:grid grid-cols-4 p-1 px-2">
            <div className={colStyle}>Class</div>
            <div className={colStyle}>Triggers</div> <div className={colStyle}>Numbers</div>
            <div className={colStyle}>Funding</div>
          </div>
        )}
        <div className="flex flex-wrap">
          {contributorCreditClasses().map((cClass, index) => {
            if (cClass && cClass.chainId === chainId)
              return (
                <div key={index} className="my-2 w-full">
                  <CCClassCard cClass={cClass} setSelectedClassId={setSelectedClassId} user={user} />
                </div>
              );
          })}
          {unestablishedSmartContracts.map((unestablishedContract, index) => {
            if (unestablishedContract?.chainId === chainId && !unestablishedContract.used)
              return (
                <div key={index} className="my-2 w-full ">
                  <UnestablishedContractCard unestablishedContract={unestablishedContract} />
                </div>
              );
          })}
        </div>
        <ActionsBlock userId={user.id} />
      </Card>
    );
  }
  return <ChooseConnectorButton buttonText="Connect your Ethereum wallet to see Contributor Credits" large />;
};

export default ClassCardList;
