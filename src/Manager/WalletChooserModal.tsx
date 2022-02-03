import BaseCard from './components/cards/BaseCard';
import ChooseConnector from './ChooseConnector';
import cn from 'classnames';
import React, { FC, useContext, useEffect } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { ApplicationStoreProps, store } from '@context/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type WalletChooserModalProps = {
  noModal?: boolean;
};

const WalletChooserModal: FC<WalletChooserModalProps> = ({ noModal }) => {
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
          onClick={(e: any) => {
            if (e.target.id === 'dialog-curtain') {
              dispatchWalletModal({ type: 'TOGGLE_WALLET_MODAL' });
            }
          }}
        >
          <BaseCard
            className="mx-4 absolute right-0 left-0 top-14 md:top-0 py-6 md:relative flex-col md:w-96 rounded-xl md:rounded-lg shadow-modal"
            style={{ overflow: 'smooth' }}
          >
            <button
              id="close-button"
              onClick={(e) => {
                e.preventDefault();
                dispatchWalletModal({ type: 'TOGGLE_WALLET_MODAL' });
              }}
              className="absolute hover:shadow-lg text-gray-800 -top-1 -right-1 w-10 h-10 m-2 rounded-full"
            >
              <FontAwesomeIcon icon="times" />
            </button>
            <div>
              <ChooseConnector />
            </div>
          </BaseCard>
        </div>
      </div>
    );
  }
  return <></>;
};

export default WalletChooserModal;
