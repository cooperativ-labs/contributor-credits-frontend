import Button from '@src/components/Buttons/Button';
import cn from 'classnames';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { CustomTokenService } from 'firebaseConfig/firebaseConfig';
import { GetConnector, MatchSupportedChains } from './connectors';
import { useRouter } from 'next/router';

import { useAccount, useChainId, useConnect, useSigner } from 'wagmi';
import { WalletErrorCodes, WalletErrorMessages } from './helpersChain';

declare let window: any;

type WalletConnectButtonProps = {
  children: ReactNode;
  className?: string;
  nextLink?: string;
};

export const WalletConnectButton: FC<WalletConnectButtonProps> = ({ children, className, nextLink }) => {
  const [walletExists, setWalletExists] = useState<boolean>(false);
  const [selectedConnector, setSelectedConnector] = useState(undefined);
  useEffect(() => {
    const selection = window.sessionStorage?.getItem('CHOSEN_CONNECTOR');
    setSelectedConnector(GetConnector(selection));
  }, [setSelectedConnector]);
  const router = useRouter();
  const { address: walletAddress } = useAccount();
  const chainId = useChainId();
  const { data: signer } = useSigner();
  const { connect, error } = useConnect();

  useEffect(() => {
    const ethereum = window.ethereum;
    setWalletExists(ethereum !== undefined);
  }, [setWalletExists]);

  async function TestAndActivateWallet() {
    if (walletExists) {
      if (MatchSupportedChains(chainId)) {
        const connector = selectedConnector;
        try {
          await connect({ connector });
          await CustomTokenService(signer, walletAddress);
          nextLink && router.push(nextLink);
        } catch (err) {
          alert(WalletErrorCodes(err));
        }
      } else {
        alert(
          chainId === undefined ? WalletErrorMessages.NeedToApproveConnection : WalletErrorMessages.OnIncompatibleChain
        );
      }
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
