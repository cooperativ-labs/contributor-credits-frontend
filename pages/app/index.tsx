import Dashboard from '../../src/Manager/pages/Dashboard';
import ManagerWrapper from '../../src/Manager/ManagerWrapper';
import ShutdownWarningModal from '../../src/components/Alerts/ShutdownWarningModal';
import React from 'react';
import { NextPage } from 'next';
import { ResultProps } from '@interfaces/types';

const DashboardPage: NextPage<ResultProps> = () => {
  return (
    <div data-test="component-landing" className="h-full flex">
      <title>Contributor Credits</title>
      <ShutdownWarningModal />
      <ManagerWrapper>
        <Dashboard />
      </ManagerWrapper>
    </div>
  );
};
export default DashboardPage;
