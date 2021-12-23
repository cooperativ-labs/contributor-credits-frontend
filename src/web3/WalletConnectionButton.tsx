import Button from '@src/components/Buttons/Button';
import cn from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { GetConnector, MatchSupportedChains } from './connectors';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { WalletErrorCodes, WalletErrorMessages } from './helpersChain';
import { Web3Provider } from '@ethersproject/providers';
declare let window: any;

interface WalletConnectButtonProps {
  children: React.ReactChild;
  className?: string;
  nextLink?: string;
}

export const WalletConnectButton: FC<WalletConnectButtonProps> = ({ children, className, nextLink }) => {
  const [walletExists, setWalletExists] = useState<boolean>(false);
  const [selectedConnector, setSelectedConnector] = useState(undefined);
  useEffect(() => {
    const selection = window.sessionStorage?.getItem('CHOSEN_CONNECTOR');
    setSelectedConnector(GetConnector(selection));
  }, [setSelectedConnector]);
  const router = useRouter();
  const { activate, error, chainId } = useWeb3React<Web3Provider>();

  useEffect(() => {
    const ethereum = window.ethereum;
    setWalletExists(ethereum !== undefined);
  }, [setWalletExists]);

  function TestAndActivateWallet() {
    if (walletExists) {
      if (MatchSupportedChains(chainId)) {
        activate(selectedConnector).catch((err) => {
          alert(WalletErrorCodes(err));
        });
      } else {
        alert(
          chainId === undefined ? WalletErrorMessages.NeedToApproveConnection : WalletErrorMessages.OnIncompatibleChain
        );
      }
      error && alert(WalletErrorCodes(error));
      nextLink && router.push(nextLink);
    } else {
      alert('Using Cooperativ requires an Ethereum wallet. You can get one for free at MetaMask.io');
    }
  }

  return (
    <Button
      className={cn(className)}
      onClick={() => {
        TestAndActivateWallet();
      }}
    >
      {children}
    </Button>
  );
};

export default WalletConnectButton;
