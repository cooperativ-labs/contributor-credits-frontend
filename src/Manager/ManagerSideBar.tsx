import Button from '@src/components/Buttons/Button';
import cn from 'classnames';
import ManagerSideBarContents from './components/ManagerSideBarContents';

import React, { FC, useContext } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { getUsersByRole } from '@hooks/useProjectUsers';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';

const ManagerSideBar: FC = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchSidebar, ManagerSidebarOpen } = applicationStore;

  const { userId } = useContext(UserContext);
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });

  const user = userData?.getUser;

  if (!user) {
    return <></>;
  }

  const projectUsers = user.projects;
  const creators = getUsersByRole(projectUsers, 'CREATOR');
  const isProjectManager = !!creators.find((creator) => creator.user.id === user.id);

  return (
    <>
      <div className="hidden md:flex flex-col bg-white w-52 z-10 shadow-lg min-h-full">
        <div className="h-full bg-opacity-0 p-1 pr-2">
          <ManagerSideBarContents />
        </div>
      </div>
      {ManagerSidebarOpen && (
        <div
          id="sidebar-curtain"
          className="w-screen h-screen absolute top-0 bottom-0 right-0 left-0 md:flex justify-center items-center z-40 bg-gray-500 bg-opacity-80 overflow-y-auto"
          onClick={(e: any) => {
            /** @TODO : fix typescript */
            if (e.target.id === 'sidebar-curtain') {
              dispatchSidebar({ type: 'TOGGLE_MANAGER_SIDEBAR' });
            }
          }}
        >
          <div className={'md:hidden h-full w-64 z-50 fixed left-0 top-0 p-3 bg-white shadow-xl'}>
            <div className="flex justify-end">
              <div className={cn(ManagerSidebarOpen ? 'flex md:hidden' : 'hidden')}>
                <Button
                  onClick={() => {
                    dispatchSidebar({ type: 'TOGGLE_MANAGER_SIDEBAR' });
                  }}
                >
                  <FontAwesomeIcon icon={['fas', 'bars']} size="lg" />
                </Button>
              </div>
            </div>
            <div className="p-1 border-b-2 border-gray-300 pt-4 pb-3 justify-center"></div>
            <ManagerSideBarContents />
          </div>
        </div>
      )}
    </>
  );
};

export default ManagerSideBar;
