import Card from '@src/containers/Card';
import CCClassDetails from '../components/containers/ClassDetails';
import ClassCardList from '../components/containers/ClassCardList';
import cn from 'classnames';
import FormattedCryptoAddress from '../components/FormattedCryptoAddress';
import React, { FC, useContext, useState } from 'react';
import { ADD_USER_EMAIL, GET_USER } from '@src/utils/dGraphQueries/user';
import { Agreement } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQuery } from '@apollo/client';
import { User } from 'types';
import { useWeb3React } from '@web3-react/core';
import { WalletOwnerContext } from '@src/SetAppContext';
import { Web3Provider } from '@ethersproject/providers';

export const ContractManager = (agreement: Agreement, user: User) => {
  return agreement.signatories.find((signatory) => signatory.user.id === user.id);
};

const Dashboard: FC = () => {
  const { account: walletAddress, chainId } = useWeb3React<Web3Provider>();
  const { uuid } = useContext(WalletOwnerContext);
  const { data: userData, error: userError } = useQuery(GET_USER, {
    variables: { uuid: uuid },
  });
  const user = userData?.queryUser[0];
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(undefined);
  ///FOR CONVERTING TO NEW EMAIL ADDRESS STRUCTURE
  const [addUserEmails, { data: emailData, error }] = useMutation(ADD_USER_EMAIL);

  if (!user) {
    return <></>;
  }

  ///FOR CONVERTING TO NEW EMAIL ADDRESS STRUCTURE

  if (user.email && !emailData && !error && user.emailAddresses.length < 1) {
    try {
      addUserEmails({
        variables: {
          userId: user.id,
          address: user.email,
          public: false,
        },
      });
    } catch (err) {}
  }

  ///-------------------------

  const { unestablishedSmartContracts, agreements } = user;

  return (
    <div className="md:mx-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-700">Hello {user.displayName}</h1>
      {walletAddress && (
        <div className="flex">
          <FormattedCryptoAddress
            address={walletAddress}
            chainId={chainId}
            className="text-base text-gray-700"
            withCopy
            label="Wallet:"
          />
        </div>
      )}

      <hr className="border-t-2 my-6 border-gray-300" />
      <div className={cn(selectedClassId ? 'grid-cols-3 gap-4' : 'grid-cols-2', 'md:grid')}>
        <div className={cn(selectedClassId ? 'hidden md:flex col-span-2' : 'flex md:col-span-2', 'flex-col')}>
          <ClassCardList
            user={user}
            setSelectedClassId={setSelectedClassId}
            agreements={agreements}
            unestablishedSmartContracts={unestablishedSmartContracts}
          />
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
              <CCClassDetails classId={selectedClassId} user={user} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
