import Link from 'next/link';
import React, { FC, useContext } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { ApplicationStoreProps, store } from '@context/store';

interface ManagerSidebarItemProps {
  title: string;
  link: string;
}

const ManagerSidebarItem: FC<ManagerSidebarItemProps> = ({ title, link }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchSidebar } = applicationStore;
  const windowSize = useWindowSize();
  const buttonClass =
    'p-2 m-1 w-full text-xs text-left font-semibold uppercase text-gray-500 hover:text-cDarkBlue hover:bg-gray-100 rounded-md focus:outline-none';
  return (
    <Link href={link}>
      {windowSize.width < 768 ? (
        <button onClick={() => dispatchSidebar({ type: 'TOGGLE_MANAGER_SIDEBAR' })} className={buttonClass}>
          {title}
        </button>
      ) : (
        <button className={buttonClass}>{title}</button>
      )}
    </Link>
  );
};

export default ManagerSidebarItem;
