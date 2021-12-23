import ManagerWrapper from '@src/Manager/ManagerWrapper';
import React, { FC } from 'react';
import RecruitingSettings from '@src/Manager/pages/settings/Recruiting';
import TeamInfo from '@src/Manager/pages/members/TeamInfo';

const RecruitingSettingsPage: FC = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <ManagerWrapper>
        <TeamInfo />
        <hr className="border-t-2 my-6 border-gray-300" />
        <RecruitingSettings />
      </ManagerWrapper>
    </div>
  );
};

export default RecruitingSettingsPage;
