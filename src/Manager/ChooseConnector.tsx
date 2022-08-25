import Button from '@src/components/Buttons/Button';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWeb3React } from '@web3-react/core';

import BaseCard from './components/cards/BaseCard';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { connectors, GetConnector } from '@src/web3/connectors';
import { WalletErrorCodes } from '@src/web3/helpersChain';
import { Web3Provider } from '@ethersproject/providers';

type ConnectorProps = {
  index: number;
  connector: {
    id: string;
    name: string;
    logo: string;
    isSquare?: boolean;
    experimental?: boolean;
    description: string;
  };
  length: number;
};

const Connector: FC<ConnectorProps> = ({ index, connector, length }) => {
  return (
    <div key={index} className={cn(index < length - 1 && 'border-b-2', 'px-8 py-4 border-gray-200')}>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-2">
          <div
            className={cn(
              connector.isSquare ? 'h-12 w-12' : 'h-14 w-14',
              'flex overflow-hidden items-center rounded-full'
            )}
          >
            <img src={connector.logo} className="min-w-full" />
          </div>
        </div>
        <div className="col-span-7 p-2 flex flex-col items-start justify-center">
          <div className="text font-semibold align-start">{connector.name}</div>
          {connector.experimental ? (
            <div className="text-xs text-red-500 font-medium">EXPERIMENTAL</div>
          ) : (
            <div className="text-xs text-gray-500 font-medium align-start">{connector.description}</div>
          )}
        </div>
        <div className="col-span-1 self-center text-gray-400 text-sm">
          <FontAwesomeIcon icon="arrow-right" />
        </div>
      </div>
    </div>
  );
};

const ChooseConnector: FC = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletModal } = applicationStore;
  const { activate } = useWeb3React<Web3Provider>();
  const [selection, setSelection] = useState(undefined);
  useEffect(() => {
    setSelection(window.sessionStorage);
  });

  return (
    <>
      <h2 className="text-lg font-bold text-center my-8">Connect Your Wallet</h2>
      {connectors.map((connector, i) => {
        const selectedConnector = GetConnector(connector.id);
        return (
          <Button
            key={i}
            className="w-full"
            onClick={() => {
              selection?.setItem('CHOSEN_CONNECTOR', connector.id);
              activate(selectedConnector).catch((err) => {
                alert(WalletErrorCodes(err));
              });
              dispatchWalletModal({ type: 'TOGGLE_WALLET_MODAL' });
            }}
          >
            <Connector index={i} connector={connector} length={connectors.length} />
          </Button>
        );
      })}
      <h2 className="text-lg font-medium text-center text-gray-600 my-6">
        <span>Don't have a wallet?</span>{' '}
        <span className="underline">
          <a href="https://metamask.io/">Download Here</a>
        </span>
      </h2>
    </>
  );
};

export default ChooseConnector;
