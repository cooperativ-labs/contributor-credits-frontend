import React, { useContext, useEffect, useState } from 'react';
import { GET_CRYPTO_ADDRESS } from './dGraphQueries/crypto';
import { useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { WalletOwnerContext } from '@src/SetAppContext';
import { Web3Provider } from '@ethersproject/providers';

export const UserContext = React.createContext<{ userId: string | undefined; walletExists: boolean; loading: boolean }>(
  {
    userId: undefined,
    loading: true,
    walletExists: false,
  }
);

const SetUserContext: React.FC<React.ReactNode> = ({ children }) => {
  const { account: walletAddress } = useWeb3React<Web3Provider>();
  const [userId, setUserId] = useState<string | undefined>(null);
  const [walletExists, setWalletExists] = useState<boolean>(false);
  const { data, loading: walletLoading } = useQuery(GET_CRYPTO_ADDRESS, {
    variables: { walletAddress: walletAddress },
  });

  const [selection, setSelection] = useState(undefined);
  useEffect(() => {
    setSelection(window.sessionStorage);
  });

  const storedUserId = selection?.getItem('USER_ID');

  useEffect(() => {
    if (storedUserId && storedUserId !== 'undefined') {
      setUserId(storedUserId);
    } else if (walletAddress && data) {
      if (data.getCryptoAddress?.user) {
        setUserId(data.getCryptoAddress?.user.id);
      } else setWalletExists(!!data.getCryptoAddress?.id);
    }
  });

  useEffect(() => {});

  return (
    <UserContext.Provider value={{ userId: userId, walletExists: walletExists, loading: walletLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default SetUserContext;
