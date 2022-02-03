import React, { useEffect, useState } from 'react';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { getAuth } from 'firebase/auth';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import useApollo from './utils/apolloClient';
import { CustomTokenService } from 'firebaseConfig/firebaseConfig';
import { GetConnector } from './web3/connectors';
import { WalletErrorCodes } from './web3/helpersChain';

import { useAuthState } from 'react-firebase-hooks/auth';
import { ContributorCreditClassOrderable } from 'types/';

declare let window: any;

export const WalletOwnerContext = React.createContext<{
  OwnerWallet: string | undefined;
  // loading: boolean;
}>({
  OwnerWallet: undefined,
  // loading: false,
});

type SetAppContextProps = {
  children: React.ReactNode;
  pageProps: any;
};

const SetAuthContext: React.FC<SetAppContextProps> = ({ children, pageProps }) => {
  const { activate, active, account: walletAddress, library } = useWeb3React<Web3Provider>();
  // const [token, setToken] = useState<string | undefined>(undefined);
  const [tried, setTried] = useState(false);
  const [selectedConnector, setSelectedConnector] = useState(undefined);
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

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
  console.log(walletAddress);
  const signer = library?.getSigner();
  const getToken = async (): Promise<any> => {
    if (user) {
      const token = await user.getIdToken();
      // setToken(token);
      return token;
    }

    const token = await CustomTokenService(signer, walletAddress);
    // setToken(token);
    return token;
  };

  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    credentials: 'same-origin',
  });

  const authLink = setContext(() => {
    getToken().then((token) => {
      console.log(token);
      return {
        headers: {
          'X-Auth-Token': token ?? undefined,
          // 'DG-Auth': key ?? undefined,
        },
      };
    });
    return {
      headers: {
        'X-Auth-Token': undefined,
        // 'DG-Auth': key ?? undefined,
      },
    };
  });

  const createApolloClient = new ApolloClient({
    // link: token ? authLink.concat(httpLink) : httpLink,
    link: authLink.concat(httpLink),
    // link: httpLink,
    // link: process.env.NODE_ENV === 'production' ? authLink.concat(httpLink) : httpLink,
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
  });

  const apolloClient = useApollo(pageProps.initialApolloState);

  return <ApolloProvider client={apolloClient}>{children} </ApolloProvider>;
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
