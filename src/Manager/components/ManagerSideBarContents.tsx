import LogoutButton from './buttons/LogoutButton';
import ManagerSidebarItem from './buttons/ManagerSidebarItem';
import React, { FC } from 'react';

const ManagerSideBarContents: FC = () => {
  return (
    <div className="flex flex-col">
      <div className="md:hidden ml-4">
        <div className="flex items-center my-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default ManagerSideBarContents;
