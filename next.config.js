// const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://blue-surf-550072.us-east-1.aws.cloud.dgraph.io/graphql'
    : 'http://localhost:8080/graphql';

module.exports = {
  swcMinify: true,
  env: {
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: GRAPHQL_ENDPOINT,
  },
  plugin: (schema, documents, config) => {
    return ['typescript', 'typescript-react-query', 'typescript-react-apollo'];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //this is to fix an issue with webpack not finding the electron module
    config.module.rules.push({
      test: /\.md$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'markdown-loader',
        },
      ],
    });
    // if (process.env.NODE_ENV === 'production') {
    //   config.plugins.push(
    //     new SentryWebpackPlugin({
    //       authToken: process.env.SENTRY_TOKEN,
    //       org: process.env.SENTRY_ORG,
    //       project: process.env.SENTRY_PROJECT,
    //       include: '.',
    //       ignore: ['node_modules', 'next.config.js'],
    //     })
    //   );
    // }
    return config;
  },
};
