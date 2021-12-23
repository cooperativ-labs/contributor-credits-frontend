import React, { useEffect, useState } from 'react';
import { GetConnector } from './connectors';
import { useWeb3React } from '@web3-react/core';
import { WalletErrorCodes } from './helpersChain';
import { Web3Provider } from '@ethersproject/providers';
declare let window: any;

const SetWalletContext: React.FC<React.ReactNode> = ({ children }) => {
  const [tried, setTried] = useState(false);
  const { activate, active } = useWeb3React<Web3Provider>();
  const [selectedConnector, setSelectedConnector] = useState(undefined);

  useEffect(() => {
    const selection = window.sessionStorage?.getItem('CHOSEN_CONNECTOR');
    setSelectedConnector(GetConnector(selection));
  }, [setSelectedConnector]);

  if (selectedConnector && !tried && !active) {
    activate(selectedConnector)
      .catch((err) => {
        alert(WalletErrorCodes(err));
      })
      .then((res) => setTried(true));
  }

  // Managing chain and address changes
  useEffect(() => {
    const ethereum = window.ethereum;
    if (ethereum) {
      // ethereum.send('eth_requestAccounts').then((accounts: string[]) => {
      //   console.log(`User's address is ${accounts[0]}`);
      // });
      // ethereum.on('accountsChanged', (accounts: Array<string>) => {
      //   console.log('Changed Account', accounts);
      //   router.reload();
      // });
      // ethereum.on('chainChanged', (chainId: Array<string>) => {
      //   console.log('Changed Chain', chainId);
      // });
      // ethereum.on('disconnect', (code: number, reason: string) => {
      //   console.log(code, reason);
      // });
    }
  });

  return <>{children}</>;
};

export default SetWalletContext;
