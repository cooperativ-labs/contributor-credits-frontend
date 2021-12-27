import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useMemo } from 'react';

// using setup from: https://www.apollographql.com/blog/apollo-client/next-js/building-a-next-js-app-with-slash-graphql/

let apolloClient;

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  credentials: 'same-origin',
});

const KeyFromEnv = process.env.NETLIFY_CLIENT_CC;
const authLink = setContext((_, { headers }) => {
  // const token = localStorage.getItem('token');
  const key = KeyFromEnv;
  return {
    headers: {
      ...headers,
      'DG-Auth': key ?? undefined,
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    link: process.env.NODE_ENV === 'production' ? authLink.concat(httpLink) : httpLink,
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

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
