import AlertPopup from '@src/components/Alerts/AlertPopup';
import cn from 'classnames';
import EnsureCompatibleNetwork from '@src/web3/ensureCompatibleNetwork';
import LoadingModal from './components/ModalLoading';
import ManagerSideBar from './ManagerSideBar';
import NavBar from './NavigationBar';
import NeedAccount from './components/ModalNeedAccount';
import React, { FC, useContext } from 'react';
import router from 'next/router';
import WalletActionLockModel from './WalletActionLockModel';
import WalletChooserModal from './WalletChooserModal';
import WarningBanner from '@src/components/Alerts/WarningBanner';
import { ADD_USER_WITH_WALLET, GET_USER } from '@src/utils/dGraphQueries/user';
import { useMutation, useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { WalletOwnerContext } from '@src/SetAppContext';
import { Web3Provider } from '@ethersproject/providers';

const BackgroundGradient = 'bg-gradient-to-b from-gray-100 to-blue-50';

type ManagerProps = {
  children: React.ReactNode;
};

const Manager: FC<ManagerProps> = ({ children }) => {
  return (
    <div className="mx-auto" style={{ maxWidth: '1580px' }}>
      <div className="md:mx-8">
        <NavBar />
      </div>
      <div className="flex md:w-screen h-full">
        <div className="flex z-30 md:z-10 min-h-full min-h-screen">
          <ManagerSideBar />
        </div>
        <div className="flex-grow h-full z-10">
          <div className="h-full px-4 md:px-8 py-2 md:my-12">
            <div className={'mx-auto min-h-full'} style={{ maxWidth: '1580px' }}>
              {children}
            </div>
            <div className={'mx-auto min-h-full p-10'} style={{ maxWidth: '1580px' }}>
              We would love to hear your questions and suggestions. Please email us at{' '}
              <span className="font-bold">feedback@cooperativ.io</span>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type ManagerWrapperProps = {
  children: React.ReactNode;
  loadingComponent?: boolean;
};

const ManagerNavigationFrame: FC<ManagerWrapperProps> = ({ children, loadingComponent }) => {
  const { uuid } = useContext(WalletOwnerContext);
  const { account: walletAddress } = useWeb3React<Web3Provider>();
  const [addUser, { data, error }] = useMutation(ADD_USER_WITH_WALLET);

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }

  if (data && data.addUser !== null) {
    router.reload();
  }

  if (loadingComponent) {
    return <LoadingModal />;
  } else if (!uuid) {
    return <NeedAccount addUser={addUser} />;
  }

  return (
    <>
      {walletAddress !== uuid && (
        <WarningBanner
          color="cYellow"
          textClass="font-medium text-white text-xs md:text-sm"
          text={`You are currently using a wallet that does not match your account: ${walletAddress}`}
        />
      )}
      <Manager>{children}</Manager>
    </>
  );
};

const ManagerWrapper: FC<ManagerWrapperProps> = ({ children, loadingComponent }) => {
  return (
    <div className="h-full">
      <div className={cn(BackgroundGradient, 'min-h-full w-screen min-h-screen')}>
        <AlertPopup />
        <EnsureCompatibleNetwork>
          <WalletChooserModal />
          <WalletActionLockModel />
          <ManagerNavigationFrame loadingComponent={loadingComponent}>{children}</ManagerNavigationFrame>
        </EnsureCompatibleNetwork>
      </div>
    </div>
  );
};

export default ManagerWrapper;
