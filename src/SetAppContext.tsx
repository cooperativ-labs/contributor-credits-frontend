import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { auth, CustomTokenService } from 'firebaseConfig/firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import { GetConnector } from './web3/connectors';
import { setContext } from '@apollo/client/link/context';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { WalletErrorCodes } from './web3/helpersChain';
import { Web3Provider } from '@ethersproject/providers';
import router from 'next/router';

declare let window: any;

export const WalletOwnerContext = React.createContext<{
  uuid: string | undefined;
}>({
  uuid: undefined,
});

type SetAppContextProps = {
  children: React.ReactNode;
};

const SetAppContext: React.FC<SetAppContextProps> = ({ children }) => {
  const { activate, active } = useWeb3React<Web3Provider>();
  const [tried, setTried] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userLoading, setUserLoading] = useState(true);
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

  useEffect(() => {
    const ethereum = window.ethereum;
    if (ethereum) {
      ethereum.on('accountsChanged', (accounts: Array<string>) => {
        signOut(auth)
          .then(() => router.reload())
          .catch((error) => {
            console.log('// An error happened.');
          });
      });
    }
  });

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
      }
      setUserLoading(false);
      return;
    });
  }, [currentUser]);

  if (userLoading) {
    return <></>;
  }

  const getToken = async (): Promise<any> => {
    if (currentUser) {
      const token = await currentUser.getIdToken(true);
      return token;
    }
    return Promise.resolve();
  };

  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    credentials: 'same-origin',
  });

  const key = process.env.NEXT_PUBLIC_NETLIFY_CLIENT_CC;
  const setHeaders = (headers, token) => {
    if (process.env.NODE_ENV === 'production')
      return {
        headers: {
          ...headers,
          'X-Auth-Token': token ? token : '',
          'DG-Auth': key,
        },
      };
    return {
      headers: {
        ...headers,
        'X-Auth-Token': token ? token : '',
      },
    };
  };

  const asyncMiddleware = setContext((_, { headers }) => getToken().then((token) => setHeaders(headers, token)));

  const createApolloClient = new ApolloClient({
    link: asyncMiddleware.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
  });

  return (
    <ApolloProvider client={createApolloClient}>
      <WalletOwnerContext.Provider value={{ uuid: currentUser?.uid }}>{children} </WalletOwnerContext.Provider>
    </ApolloProvider>
  );
};

export default SetAppContext;
