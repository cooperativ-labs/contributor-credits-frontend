import ManagerWrapper from '@src/Manager/ManagerWrapper';
import Obligations from 'src/Manager/pages/projects/credits/Obligations';
import React from 'react';
import { NextPage } from 'next';
const ObligationsPage: NextPage = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <ManagerWrapper>
        <Obligations />
      </ManagerWrapper>
    </div>
  );
};

export default ObligationsPage;
