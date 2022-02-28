import Button from './Button';
import cn from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import router from 'next/router';
import { getAuth, signOut } from 'firebase/auth';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const LogoutButton: FC = () => {
  const { deactivate, connector } = useWeb3React<Web3Provider>();
  const [selectionStorage, setSelectionStorage] = useState(undefined);
  useEffect(() => {
    if (window) {
      setSelectionStorage(window.sessionStorage);
    }
  }, []);

  const outlinedClass = `text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white`;
  const auth = getAuth();
  function handleDisconnect() {
    signOut(auth)
      .then(() => {
        connector && selectionStorage.CHOSEN_CONNECTOR !== 'injected' && (connector as any).close();
        deactivate();
        selectionStorage?.removeItem('CHOSEN_CONNECTOR');
        selectionStorage?.removeItem('USER_ID');
        router.reload();
      })
      .catch((error) => {
        console.log('// An error happened.');
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
