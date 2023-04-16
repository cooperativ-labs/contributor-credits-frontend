// const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://blue-surf-550072.us-east-1.aws.cloud.dgraph.io/graphql'
    : 'http://localhost:8080/graphql';

module.exports = {
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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://app.safe.global',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  devServer: function (configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function (proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      config.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      };

      // Return your customised Webpack Development Server config.
      return config;
    };
  },
};
