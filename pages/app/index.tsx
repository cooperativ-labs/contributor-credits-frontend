import Dashboard from '../../src/Manager/pages/Dashboard';
import ManagerWrapper from '../../src/Manager/ManagerWrapper';
import React from 'react';
import { NextPage } from 'next';
import { ResultProps } from '@interfaces/types';

const DashboardPage: NextPage<ResultProps> = () => {
  return (
    <div data-test="component-landing" className="h-full flex">
      <title>Contributor Credits</title>
      <ManagerWrapper>
        <Dashboard />
      </ManagerWrapper>
    </div>
  );
};
export default DashboardPage;
