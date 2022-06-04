import Button from '@src/components/Buttons/Button';
import Card from '@src/containers/Card';
import ChooseConnectorButton from './ChooseConnectorButton';
import FormattedCryptoAddress from './components/FormattedCryptoAddress';
import Link from 'next/link';
import LogoutButton from './components/buttons/LogoutButton';
import NetworkIndicator, { networkIcon, NetworkIndicatorDot } from './components/indicators/NetworkIndicator';
import React, { FC, useContext, useState } from 'react';
import RecipientStats from './components/RecipientStats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { MatchSupportedChains } from '@src/web3/connectors';
import { useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { WalletOwnerContext } from '@src/SetAppContext';
import { Web3Provider } from '@ethersproject/providers';

type UserMenuProps = {};

const UserMenu: FC<UserMenuProps> = ({}) => {
  const { account: walletAddress, chainId, active } = useWeb3React<Web3Provider>();
  const [open, setOpen] = useState<boolean>(false);

  const networkImage = networkIcon(chainId, walletAddress);

  return (
    <>
      {open && <div className="absolute top-0 bottom-0 left-0 right-0 z-40" onClick={() => setOpen(!open)} />}
      <div className="relative flex flex-col items-center ">
        {walletAddress ? (
          <Button
            className={`border-gray-300 hover:border-${MatchSupportedChains(chainId)?.color}
              border-2 focus:outline-none pr-2 flex items-center rounded-full font-semibold text-xs text-gray-700`}
            aria-label={open ? 'expand section' : 'collapse section'}
            onClick={() => setOpen(!open)}
          >
            <div className="pr-2">
              {networkImage !== undefined ? (
                <img src={networkImage} className="p-2 w-8 h-8 bg-gray-200 rounded-full" />
              ) : (
                <div className="py-2 pl-2">
                  <NetworkIndicatorDot chainId={chainId} walletAddress={walletAddress} />
                </div>
              )}
              {/* <img src={userInfo?.image ?? '/assets/images/user-images/placeholder.png'} /> */}
            </div>
            Account: {walletAddress.slice(-4)}
            <div className="p-1">
              <FontAwesomeIcon icon="chevron-down" />
            </div>
          </Button>
        ) : (
          <ChooseConnectorButton buttonText={'Connect wallet'} />
        )}
        {open && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-40" onClick={() => setOpen(!open)}>
            <Card className="absolute top-12 right-0 p-3 w-56 rounded-xl shadow-lg">
              {active && (
                <div className="flex flex-col items-center">
                  <NetworkIndicator />
                  <div className="mt-3" />
                  <FormattedCryptoAddress chainId={chainId} address={walletAddress} withCopy />
                </div>
              )}
              <hr className="my-5" />
              <div className="flex flex-col items-center my-1 p-2 justify-center text-sm text-gray-500 hover:bg-gray-200 rounded-lg">
                <Link href="/app/account/">Account Settings</Link>
              </div>
              <div className="flex flex-col items-center my-1 p-2 justify-center text-sm text-gray-500 hover:bg-gray-200 rounded-lg">
                <LogoutButton />
              </div>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;
