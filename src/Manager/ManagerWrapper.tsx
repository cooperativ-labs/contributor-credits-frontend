import cn from 'classnames';
import EnsureCompatibleNetwork from '@src/web3/ensureCompatibleNetwork';
import LoadingModal from './components/ModalLoading';
import NavBar from './NavigationBar';
import NeedAccount from './components/ModalNeedAccount';
import React, { FC, useContext } from 'react';
import SetUserContext, { UserContext } from '@src/utils/SetUserContext';
import SetWalletContext from '@src/web3/SetWalletContext';
import WalletChooserModal from './WalletChooserModal';
import ManagerSideBar from './ManagerSideBar';
import DemoWarning from '@src/components/DemoWarning/DemoWarning';

const BackgroundGradient = 'bg-gradient-to-b from-gray-100 to-blue-50';

type ManagerProps = {
  children: React.ReactNode;
};

const Manager: FC<ManagerProps> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="flex md:w-screen h-full">
        <div className="flex z-30 md:z-10 min-h-full min-h-screen">
          <ManagerSideBar />
        </div>
        <div className="flex-grow h-full z-10">
          <div className="h-full px-4 md:px-8 py-2 md:my-12">
            <div className={'mx-auto min-h-full'} style={{ maxWidth: '1580px' }}>
              <EnsureCompatibleNetwork>{children}</EnsureCompatibleNetwork>
            </div>
            <div className={'mx-auto min-h-full p-10'} style={{ maxWidth: '1580px' }}>
              Contributor Credits currently work on Ethereum, Polygon, and the Ropsten testnet.{' '}
              <a
                className="text-blue-600 underline font-semibold"
                target="_blank"
                href="https://cooperativ.medium.com/a-new-way-to-compensate-contributors-to-early-stage-projects-fa7d83985fde"
              >
                Click here to read about what they are and how they work.
              </a>
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
  const { userId, loading: idLoading } = useContext(UserContext);

  if (idLoading || loadingComponent) {
    return <LoadingModal />;
  } else if (!userId) {
    return <NeedAccount />;
  }

  return <Manager>{children}</Manager>;
};

const ManagerWrapper: FC<ManagerWrapperProps> = ({ children, loadingComponent }) => {
  return (
    <SetWalletContext>
      <SetUserContext>
        <div className="h-full">
          <div className={cn(BackgroundGradient, 'min-h-full w-screen min-h-screen')}>
            <DemoWarning />
            <WalletChooserModal />
            <ManagerNavigationFrame loadingComponent={loadingComponent}>{children}</ManagerNavigationFrame>
          </div>
        </div>
      </SetUserContext>
    </SetWalletContext>
  );
};

export default ManagerWrapper;
