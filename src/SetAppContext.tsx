import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { auth } from 'firebaseConfig/firebaseConfig';
import { GetConnector } from './web3/connectors';
import { setContext } from '@apollo/client/link/context';
import { signOut } from 'firebase/auth';
import { useConnect } from 'wagmi';
import { WalletErrorCodes } from './web3/helpersChain';
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
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userLoading, setUserLoading] = useState(true);
  const { connect, connectors, error } = useConnect();

  const safeConnectorInstance = connectors.find((c) => 'safe' === c.id && c.ready);

  useEffect(() => {
    const selection = window.sessionStorage?.getItem('CHOSEN_CONNECTOR');
    const connector = safeConnectorInstance ? safeConnectorInstance : GetConnector(selection);
    if (connector) {
      connect({ connector: safeConnectorInstance });
      error && alert(`here, ${WalletErrorCodes(error)}`);
    }
  }, [connect, safeConnectorInstance, error]);

  useEffect(() => {
    const ethereum = window.ethereum;
    if (ethereum) {
      ethereum.on('accountsChanged', (accounts: Array<string>) => {
        signOut(auth)
          .then(() => router.reload())
          .catch((error) => {
            throw new Error(error);
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
