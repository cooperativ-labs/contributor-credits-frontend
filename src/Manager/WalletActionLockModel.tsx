import BaseCard from './components/cards/BaseCard';
import cn from 'classnames';
import React, { FC, useContext, useEffect } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { ApplicationStoreProps, store } from '@context/store';

type WalletActionLockModelProps = {
  noModal?: boolean;
};

const WalletActionLockModel: FC<WalletActionLockModelProps> = ({ noModal }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletModal, WalletModalOpen } = applicationStore;
  const windowSize = useWindowSize();
  useEffect(() => {
    if (WalletModalOpen && windowSize.width > 768) {
      // setScrollY(window.scrollY);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      // window.scrollTo(0, parseInt(scrollY));
    }
  }, [WalletModalOpen]);

  if (WalletModalOpen) {
    return (
      <div data-test="component-payment-send">
        <div
          id="dialog-curtain"
          className={cn(
            noModal
              ? 'absolute top-0 bottom-0 right-0 left-0 md:relative'
              : 'w-screen md:h-screen absolute top-0 bottom-0 right-0 left-0 md:flex justify-center items-center z-50 bg-gray-500 bg-opacity-0 md:bg-opacity-80'
          )}
        >
          <BaseCard
            className="mx-4 absolute right-0 left-0 top-14 md:top-0 py-6 md:relative flex-col md:w-96 rounded-xl md:rounded-lg shadow-modal"
            style={{ overflow: 'smooth' }}
          >
            <div>
              <div className="animate-pulse">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="h-20 w-20 md:h-14 md:w-14 mb-5 md:mr-3 md:mb-0">
                    <img src="/favicon.ico" />
                  </div>
                  <div>
                    <div className="text-center font-bold text-cDarkBlue md:text-xl">
                      Communicating with the network...
                    </div>
                  </div>
                </div>
              </div>
              How long this takes depends on network traffic, so it may take a few minutes
            </div>
          </BaseCard>
        </div>
      </div>
    );
  }
  return <></>;
};

export default WalletActionLockModel;
