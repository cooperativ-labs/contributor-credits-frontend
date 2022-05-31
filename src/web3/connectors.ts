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
  {
    id: 1,
    name: 'Ethereum',
    blockExplorer: 'https://etherscan.io',
    protocol: CryptoAddressProtocol.Eth,
    icon: 'assets/images/chain-logos/ethereum-eth-logo.svg',
    contractsSupported: true,
    color: 'emerald-600',
  },
  {
    id: 3,
    name: 'Ropsten',
    blockExplorer: 'https://ropsten.etherscan.io',
    faucet: 'https://faucet.dimensions.network/',
    protocol: CryptoAddressProtocol.Eth,
    contractsSupported: true,
    color: 'cYellow',
  },
  {
    id: 137,
    name: 'Polygon',
    blockExplorer: 'https://polygonscan.com',
    protocol: CryptoAddressProtocol.Eth,
    icon: 'assets/images/chain-logos/polygon-matic-logo.svg',
    contractsSupported: true,
    color: 'purple-600',
  },
  {
    id: 80001,
    name: 'Polygon Mumbai',
    blockExplorer: 'https://mumbai.polygonscan.com',
    faucet: 'https://faucet.matic.network/',
    protocol: CryptoAddressProtocol.Eth,
    contractsSupported: true,
    color: 'purple-300',
  },
  {
    id: 43114,
    name: 'Avalanche Mainnet',
    blockExplorer: 'https://arbiscan.com',
    protocol: CryptoAddressProtocol.Eth,
    icon: 'assets/images/chain-logos/arbitrum.svg',
    contractsSupported: false,
  },
  {
    id: 56,
    name: 'Binance Smart Chain',
    blockExplorer: 'https://bscscan.com',
    protocol: CryptoAddressProtocol.Eth,
    icon: 'assets/images/chain-logos/binance-chain.svg',
    contractsSupported: false,
  },
  {
    id: 10,
    name: 'Optimism',
    blockExplorer: 'https://optimistic.etherscan.io',
    protocol: CryptoAddressProtocol.Eth,
    icon: 'assets/images/chain-logos/optomism.png',
    contractsSupported: false,
  },
  {
    id: 100,
    name: 'xDAI',
    blockExplorer: 'https://blockscout.com/xdai/mainnet',
    protocol: CryptoAddressProtocol.Eth,
    icon: 'assets/images/chain-logos/xdai.svg',
    contractsSupported: false,
  },
  {
    id: 4,
    name: 'Rinkeby',
    blockExplorer: 'https://rinkeby.etherscan.io',
    protocol: CryptoAddressProtocol.Eth,

    contractsSupported: false,
  },
  {
    id: 5,
    name: 'Görli',
    blockExplorer: 'https://goerli.etherscan.io',
    protocol: CryptoAddressProtocol.Eth,
    contractsSupported: false,
  },
  {
    id: 12345678,
    name: 'AlgoTest',
    blockExplorer: 'https://testnet.algoexplorer.io',
    protocol: CryptoAddressProtocol.Algo,
    icon: 'assets/images/chain-logos/algorand-algo.svg',
    contractsSupported: true,
    color: 'grey-800',
  },
];

export const MatchSupportedChains = (chainId) => {
  return SupportedChainIds.find((chain) => chain.id === chainId);
};

const RPC_URLS: { [chainId: number]: string } = {
  1: 'https://mainnet.infura.io/v3/acfb1610d5514a998fb6c0baf20682c2',
  3: 'https://ropsten.infura.io/v3/acfb1610d5514a998fb6c0baf20682c2',
  5: 'https://ropsten.infura.io/v3/acfb1610d5514a998fb6c0baf20682c2', // remove this
  137: 'https://polygon-mainnet.infura.io/v3/acfb1610d5514a998fb6c0baf20682c2',
  80001: 'https://polygon-mumbai.infura.io/v3/acfb1610d5514a998fb6c0baf20682c2',
};

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 137, 80001] });

const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URLS[1],
    3: RPC_URLS[3],
    5: RPC_URLS[5],
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
