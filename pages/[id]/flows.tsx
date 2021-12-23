import Flows from 'src/Manager/pages/projects/Flows';
import ManagerWrapper from '@src/Manager/ManagerWrapper';
import React, { useEffect, useState } from 'react';
import { GET_CONTRIBUTOR_CREDITS } from '@src/utils/dGraphQueries/crypto';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const FlowsPage: NextPage = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <ManagerWrapper>
        <Flows />
      </ManagerWrapper>
    </div>
  );
};

export default FlowsPage;
