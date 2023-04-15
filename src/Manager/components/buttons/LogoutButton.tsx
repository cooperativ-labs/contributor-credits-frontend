import Button from './Button';
import cn from 'classnames';
import React, { FC, useContext } from 'react';
import router from 'next/router';
import { getAuth, signOut } from 'firebase/auth';
import { useDisconnect } from 'wagmi';
import { ApplicationStoreProps, store } from '@context/store';

const LogoutButton: FC = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: setLogoutModal } = applicationStore;
  const { disconnect } = useDisconnect();

  const outlinedClass = `text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white`;
  const auth = getAuth();
  async function handleDisconnect() {
    signOut(auth)
      .then(() => {
        setLogoutModal({ type: 'TOGGLE_LOADING_MODAL' });
        disconnect();
        window.sessionStorage?.removeItem('CHOSEN_CONNECTOR');
        router.reload();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  return (
    <Button
      className={cn(outlinedClass, 'text-xs p-1 px-3 font-semibold rounded-full relative mr-2')}
      onClick={() => handleDisconnect()}
    >
      Log out
    </Button>
  );
};

export default LogoutButton;
