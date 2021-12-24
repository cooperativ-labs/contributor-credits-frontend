import Button from '@src/components/Buttons/Button';
import Link from 'next/link';
import LogoutButton from './components/buttons/LogoutButton';
import React, { FC, useContext } from 'react';
import UserMenu from './UserMenu';
import useWindowSize from '@hooks/useWindowSize';
import { ApplicationStoreProps, store } from '@context/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NavBarProps {
  transparent?: boolean;
  gaming?: boolean;
}

export const NavBar: FC<NavBarProps> = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);

  const { dispatch } = applicationStore;
  const windowSize = useWindowSize();

  return (
    <div className="h-14 b-1 z-30 flex min-h-full md:bg-white bg-opacity-50 md:border-b-2">
      <header className="py-2 px-2 md:px-6 pr-4 flex justify-between w-full mx-auto self-center items-center">
        <div className="ml-1 justify-start flex items-center">
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

          <Link href="/">
            <img
              src={
                windowSize.width < 768
                  ? '/assets/images/branding/symbol_dark_blue.svg'
                  : '/assets/images/branding/full_dark_blue.svg'
              }
              alt="logo"
              width={windowSize.width < 768 ? '50' : '200'}
            />
          </Link>
        </div>
        <div className="flex justify-end">
          <span className="hidden md:flex items-center">
            <LogoutButton />
          </span>
          <UserMenu />
        </div>
      </header>
    </div>
  );
};

export default NavBar;
