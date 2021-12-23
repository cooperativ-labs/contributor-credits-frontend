import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { CryptoAddressProtocol } from 'types';

export const liveChain = (chainId) => {
  if (chainId === 1 || chainId === 137) {
    return true;
  }
  return false;
};
export const SupportedChainIds = [
  { id: 1, name: 'Ethereum', blockExplorer: 'https://etherscan.io', protocol: CryptoAddressProtocol.Eth },
  {
    id: 3,
    name: 'Ropsten',
    blockExplorer: 'https://ropsten.etherscan.io',
    faucet: 'https://faucet.dimensions.network/',
    protocol: CryptoAddressProtocol.Eth,
  },
  { id: 137, name: 'Polygon', blockExplorer: 'https://polygonscan.com', protocol: CryptoAddressProtocol.Matic },
  {
    id: 80001,
    name: 'Polygon Mumbai',
    blockExplorer: 'https://mumbai.polygonscan.com/',
    faucet: 'https://faucet.matic.network/',
    protocol: CryptoAddressProtocol.Matic,
  },
];

export const MatchSupportedChains = (chainId) => {
  return SupportedChainIds.find((chain) => chain.id === chainId);
};

const RPC_URLS: { [chainId: number]: string } = {
  1: 'https://mainnet.infura.io/v3/acfb1610d5514a998fb6c0baf20682c2',
  3: 'https://ropsten.infura.io/v3/acfb1610d5514a998fb6c0baf20682c2',
  137: 'https://polygon-mainnet.infura.io/v3/acfb1610d5514a998fb6c0baf20682c2',
  80001: 'https://polygon-mumbai.infura.io/v3/acfb1610d5514a998fb6c0baf20682c2',
};

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 137, 80001] });

const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URLS[1],
    3: RPC_URLS[3],
    137: RPC_URLS[137],
    80001: RPC_URLS[80001],
  },
  qrcode: true,
});

const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'Cooperativ',
  darkMode: false,
  appLogoUrl: 'https://www.cooperativ.io/assets/android-chrome-192x192.png',
});

export const connectors = [
  {
    id: 'injected',
    name: 'MetaMask',
    logo: '/assets/images/wallet-logos/metamask-fox.svg',
    experimental: false,
    description: 'Mobile app and extension',
  },
  {
    id: 'walletlink',
    name: 'WalletLink',
    logo: '/assets/images/wallet-logos/walletlink-logo.png',
    isSquare: true,
    experimental: false,
    description: 'Link to Coinbase Wallet',
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    logo: '/assets/images/wallet-logos/walletconnect-logo.svg',
    experimental: true,
    description: 'Link wallet with a QR code',
  },
];

export const GetConnector = (id) => {
  switch (id) {
    case 'injected':
      return injected;
    case 'walletconnect':
      return walletconnect;
    case 'walletlink':
      return walletlink;
    default:
      return undefined;
  }
};
