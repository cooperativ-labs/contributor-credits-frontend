//access to user's settings
import MajorActionButton from '../components/buttons/MajorActionButton';
import ProjectCard from '../components/cards/ProjectCard';
import React, { FC, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import ClassCardList from '../components/containers/ClassCardList';
import cn from 'classnames';
import Card from '@src/containers/Card';
import CCClassDetails from '../components/containers/ClassDetails';

const Dashboard: FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const { account: walletAddress } = useWeb3React<Web3Provider>();
  const { userId } = useContext(UserContext);
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(undefined);
  if (!user) {
    return <></>;
  }
  return (
    <div className="md:mx-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-700">Hello {user.displayName}</h1>
      {walletAddress && (
        <div className="flex">
          <div className="truncate w-64 md:w-auto mr-3">{walletAddress}</div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(walletAddress);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 1000);
            }}
          >
            {copied ? <FontAwesomeIcon icon="check" /> : <FontAwesomeIcon icon="copy" />}
          </button>
        </div>
      )}

      <hr className="border-t-2 my-6 border-gray-300" />
      <div className={cn(selectedClassId ? 'grid-cols-3 gap-4' : 'grid-cols-2', 'md:grid')}>
        <div className={cn(selectedClassId ? 'hidden md:flex col-span-2' : 'flex md:col-span-2', 'flex-col')}>
          <ClassCardList user={user} setSelectedClassId={setSelectedClassId} />
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
              {/* <CCClassDetails classId={selectedClassId} memberAddresses={memberAddresses} user={user} /> */}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
