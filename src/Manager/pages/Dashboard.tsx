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

const Dashboard: FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const { account: walletAddress } = useWeb3React<Web3Provider>();
  const { userId } = useContext(UserContext);
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;

  if (!user) {
    return <></>;
  }

  const projects = user.projects;
  const hasProjects = projects.length > 0;

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

      <hr className="border-t-2 mt-6 border-gray-300" />
      <section>
        {hasProjects && <h2 className="text-xl font-bold text-gray-800 my-5">Projects</h2>}
        <div className="div ">
          {hasProjects &&
            projects.map((projectUser, i) => {
              return (
                <div className="flex-grow mb-4">
                  <ProjectCard
                    key={i}
                    projectName={projectUser.project.name}
                    shortDescription={projectUser.project.info.shortDescription}
                    title={projectUser.title}
                    slug={projectUser.project.slug}
                  />
                </div>
              );
            })}
          <MajorActionButton className="w-full md:w-96" link="manager/create-project">
            Create Project
          </MajorActionButton>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
