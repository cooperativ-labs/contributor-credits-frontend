import LogoutButton from './buttons/LogoutButton';
import ManagerSidebarItem from './buttons/ManagerSidebarItem';
import React, { FC } from 'react';

type ManagerSideBarContentsProps = { projectSlug?: string; isProjectManager: boolean };

const ManagerSideBarContents: FC<ManagerSideBarContentsProps> = ({ projectSlug, isProjectManager }) => {
  return (
    <div className="flex flex-col">
      <ManagerSidebarItem link={`/manager/${projectSlug}`} title="Overview" />
      {isProjectManager && <ManagerSidebarItem link={`/manager/${projectSlug}/team`} title="Team" />}
      {isProjectManager && <ManagerSidebarItem link={`/manager/${projectSlug}/obligations`} title="Obligations" />}
      {isProjectManager && <ManagerSidebarItem link={`/manager/${projectSlug}/flows`} title="Payment flows" />}
      {isProjectManager && <ManagerSidebarItem link={`/manager/${projectSlug}/settings`} title="Settings" />}
      <div className="md:hidden ml-4">
        <div className="flex items-center my-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default ManagerSideBarContents;
