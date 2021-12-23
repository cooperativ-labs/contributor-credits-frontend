import React, { useEffect, useState } from 'react';
import { GET_CRYPTO_ADDRESS } from './dGraphQueries/crypto';
import { useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

export const UserContext = React.createContext<{ userId: string | undefined; loading: boolean }>({
  userId: undefined,
  loading: true,
});

const SetUserContext: React.FC<React.ReactNode> = ({ children }) => {
  const { account: walletAddress } = useWeb3React<Web3Provider>();
  const [userId, setUserId] = useState<string | undefined>(null);
  const { loading, data } = useQuery(GET_CRYPTO_ADDRESS, {
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
      setUserId(data.getCryptoAddress?.user.id);
    }
  });

  return <UserContext.Provider value={{ userId: userId, loading: loading }}>{children}</UserContext.Provider>;
};

export default SetUserContext;
