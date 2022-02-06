import React, { useEffect, useState } from 'react';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { getAuth } from 'firebase/auth';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { CustomTokenService } from 'firebaseConfig/firebaseConfig';
import { GetConnector } from './web3/connectors';
import { WalletErrorCodes } from './web3/helpersChain';

declare let window: any;

export const WalletOwnerContext = React.createContext<{
  OwnerWallet: string | undefined;
}>({
  OwnerWallet: undefined,
});

type SetAppContextProps = {
  children: React.ReactNode;
  pageProps: any;
};

const SetAuthContext: React.FC<SetAppContextProps> = ({ children, pageProps }) => {
  const { activate, active, account: walletAddress, library } = useWeb3React<Web3Provider>();
  const [tried, setTried] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userLoading, setUserLoading] = useState(true);
  const [selectedConnector, setSelectedConnector] = useState(undefined);
  const auth = getAuth();

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

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      setCurrentUser(user);
    } else if (library) {
      const signer = library.getSigner();
      const newUser = await CustomTokenService(signer, walletAddress);
      setCurrentUser(newUser);
    }
    setUserLoading(false);
    return;
  });

  if (userLoading) {
    return <></>;
  }

  const getToken = async (): Promise<any> => {
    if (currentUser) {
      return await currentUser.getIdToken(true);
    }
    return Promise.resolve();
  };

  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    credentials: 'same-origin',
  });

  const asyncMiddleware = setContext((_, { headers }) =>
    getToken().then((token) => ({
      headers: {
        ...headers,
        'X-Auth-Token': token,
        // 'DG-Auth': key ?? undefined,
      },
    }))
  );

  const createApolloClient = new ApolloClient({
    // link: token ? asyncMiddleware.concat(httpLink) : httpLink,
    link: asyncMiddleware.concat(httpLink),

    // link: httpLink,
    // link: process.env.NODE_ENV === 'production' ? asyncMiddleware.concat(httpLink) : httpLink,
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
  });

  // const apolloClient = useApollo(pageProps.initialApolloState, createApolloClient);

  return (
    <ApolloProvider client={createApolloClient}>
      <WalletOwnerContext.Provider value={{ OwnerWallet: currentUser?.id }}>{children} </WalletOwnerContext.Provider>
    </ApolloProvider>
  );
};

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const SetAppContext: React.FC<SetAppContextProps> = ({ children, pageProps }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <SetAuthContext pageProps={pageProps}>{children}</SetAuthContext>
    </Web3ReactProvider>
  );
};

export default SetAppContext;
