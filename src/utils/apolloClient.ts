import { useMemo } from 'react';
import fireApp from 'firebaseConfig/firebaseConfig';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// // const analytics = getAnalytics(app);

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  credentials: 'same-origin',
});

const auth = getAuth();

const authLink = setContext(() => {
  auth.onAuthStateChanged(async (user) => {
    console.log(user);
    if (user) {
      user.getIdToken().then((token) => {
        console.log(token);
        return {
          headers: {
            'X-Auth-Token': token,
            // 'DG-Auth': key ?? undefined,
          },
        };
      });
    }
    return {
      headers: {
        'X-Auth-Token': undefined,
        // 'DG-Auth': key ?? undefined,
      },
    };
  });
});

const createApolloClient = new ApolloClient({
  // link: token ? authLink.concat(httpLink) : httpLink,
  link: authLink.concat(httpLink),
  // link: httpLink,
  // link: process.env.NODE_ENV === 'production' ? authLink.concat(httpLink) : httpLink,
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
});

export function initializeApollo(initialState = null) {
  let apolloClient;

  const _apolloClient = apolloClient ?? createApolloClient;

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

export default useApollo;
