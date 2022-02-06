import React, { useContext, useEffect, useState } from 'react';
import { GET_CRYPTO_ADDRESS } from './dGraphQueries/crypto';
import { useQuery } from '@apollo/client';
import { WalletOwnerContext } from '@src/SetAppContext';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

export const UserContext = React.createContext<{ userId: string | undefined; loading: boolean }>({
  userId: undefined,
  loading: true,
});

const SetUserContext: React.FC<React.ReactNode> = ({ children }) => {
  const { account: walletAddress } = useWeb3React<Web3Provider>();
  const { OwnerWallet } = useContext(WalletOwnerContext);
  const [userId, setUserId] = useState<string | undefined>(null);
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
    }
    if (walletAddress && data) {
      console.log(data.getCryptoAddress?.user.id);
      setUserId(data.getCryptoAddress?.user.id);
    }
  });

  return <UserContext.Provider value={{ userId: userId, loading: walletLoading }}>{children}</UserContext.Provider>;
};

export default SetUserContext;
