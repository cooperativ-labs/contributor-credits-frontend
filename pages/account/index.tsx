import ManagerWrapper from '../../src/Manager/ManagerWrapper';
import React, { FC } from 'react';
import UserSettings from '@src/Manager/pages/members/UserSettings';

const UserSettingsPage: FC = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <ManagerWrapper>
        <UserSettings />
      </ManagerWrapper>
    </div>
  );
};

export default UserSettingsPage;
