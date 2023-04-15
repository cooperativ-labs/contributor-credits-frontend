import Button from '@src/components/Buttons/Button';
import Link from 'next/link';
import React, { FC, useContext } from 'react';
import UserMenu from './UserMenu';
import useWindowSize from '@hooks/useWindowSize';
import { ApplicationStoreProps, store } from '@context/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type NavBarProps = {
  transparent?: boolean;
  gaming?: boolean;
};

export const NavBar: FC<NavBarProps> = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch } = applicationStore;
  const windowSize = useWindowSize();
  return (
    <div className="flex py-2 px-2 pr-4 md:pt-4 z-30 mx-auto justify-between">
      <div className="ml-1 justify-start flex ">
        <div className="flex md:hidden">
          <Button
            onClick={() => {
              dispatch({ type: 'TOGGLE_MANAGER_SIDEBAR' });
            }}
          >
            <FontAwesomeIcon icon={['fas', 'bars']} size="lg" />
          </Button>
          <div className="m-2" />
        </div>

        <Link href="/app">
          <img
            src={
              windowSize.width < 768
                ? '/assets/images/branding/stamp_dark_blue.svg'
                : '/assets/images/branding/stamp_dark_blue.svg'
            }
            alt="logo"
            width={windowSize.width < 768 ? '30' : '50'}
          />
        </Link>
      </div>
      <div className="flex justify-end">
        <UserMenu />
      </div>
    </div>
  );
};

export default NavBar;
