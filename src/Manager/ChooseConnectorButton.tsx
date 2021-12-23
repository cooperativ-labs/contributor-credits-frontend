import Button from './components/buttons/Button';
import cn from 'classnames';
import React, { FC, useContext } from 'react';
import { ApplicationStoreProps, store } from '@context/store';

const outlinedClass = `text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white`;

type ChooseConnectorButtonProps = {
  buttonText: string;
  large?: boolean;
};

const ChooseConnectorButton: FC<ChooseConnectorButtonProps> = ({ buttonText, large }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletModal } = applicationStore;

  return (
    <Button
      className={cn(
        outlinedClass,
        large ? 'p-2 px-4' : 'text-xs p-1 px-3',
        'font-semibold rounded-full relative mr-2 w-full'
      )}
      onClick={(e) => {
        e.preventDefault();
        dispatchWalletModal({ type: 'TOGGLE_WALLET_MODAL' });
      }}
    >
      {buttonText}
    </Button>
  );
};

export default ChooseConnectorButton;
