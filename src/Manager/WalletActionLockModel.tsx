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
  const { WalletActionLockModalOpen } = applicationStore;
  const windowSize = useWindowSize();
  useEffect(() => {
    if (WalletActionLockModalOpen && windowSize.width > 768) {
      // setScrollY(window.scrollY);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      // window.scrollTo(0, parseInt(scrollY));
    }
  }, [WalletActionLockModalOpen]);

  if (WalletActionLockModalOpen) {
    return (
      <div data-test="component-payment-send">
        <div
          id="dialog-curtain"
          className={cn(
            noModal
              ? 'absolute top-0 bottom-0 right-0 left-0 md:relative'
              : 'w-screen md:h-screen absolute top-0 bottom-0 right-0 left-0 md:flex justify-center items-center z-50 bg-gray-500 bg-opacity-20 md:bg-opacity-80'
          )}
        >
          <BaseCard
            className="mx-4 p-6 absolute right-0 left-0 top-32 md:top-0 md:relative flex-col md:w-96 rounded-xl md:rounded-lg shadow-modal"
            style={{ overflow: 'smooth' }}
          >
            <div>
              <div className="animate-pulse">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex h-20 w-24 mb-5 md:mr-3 md:mb-0 items-center">
                    <img src="/favicon.ico" />
                  </div>
                  <div>
                    <div className="ml-1 font-bold text-cDarkBlue md:text-xl">
                      Communicating with the blockchain network...
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-orange-700 font-semibold mt-5">Confirm this transaction in your wallet.</div>
              <div className="text-gray-700 mt-5">
                Please do not refresh. This can take a few minutes. You can check the status of the transaction in your
                wallet.
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    );
  }
  return <></>;
};

export default WalletActionLockModel;
