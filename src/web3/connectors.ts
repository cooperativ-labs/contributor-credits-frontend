import { CryptoAddressProtocol } from 'types';
import { configureChains, createClient, goerli } from 'wagmi';
import { mainnet, sepolia, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { LedgerConnector } from 'wagmi/connectors/ledger';
import { SafeConnector } from 'wagmi/connectors/safe';

export const liveChain = (chainId) => {
  if (chainId === 1 || chainId === 137) {
    return true;
  }
  return false;
};

export const SupportedChains = [mainnet, sepolia, polygon, polygonMumbai];

const { chains, provider, webSocketProvider } = configureChains(SupportedChains, [
  publicProvider(),
  infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
]);

export const wagmiClient = createClient({
  autoConnect: false,
  provider,
  webSocketProvider,
});

export const SupportedChainsAddendum = [
  {
    id: mainnet.id,
    name: mainnet.name,
    blockExplorer: mainnet.blockExplorers.default.url,
    protocol: CryptoAddressProtocol.Eth,
    icon: '/assets/images/chain-logos/ethereum-eth-logo.svg',
    contractsSupported: true,
    color: 'emerald-600',
  },
  {
    id: sepolia.id,
    name: sepolia.name,
    blockExplorer: sepolia.blockExplorers.default.url,
    protocol: CryptoAddressProtocol.Eth,
    icon: '/assets/images/chain-logos/sepolia-logo.png',
    contractsSupported: true,
    color: 'blue-300',
  },
  // {
  //   id: goerli.id,
  //   name: goerli.name,
  //   blockExplorer: goerli.blockExplorers.default.url,
  //   protocol: CryptoAddressProtocol.Eth,
  //   icon: '/assets/images/chain-logos/sepolia-logo.png',
  //   contractsSupported: true,
  //   color: 'blue-300',
  // },
  // {
  //   id: 100001,
  //   name: 'Jupiter',
  //   blockExplorer: 'https://polygonscan.com',
  //   protocol: CryptoAddressProtocol.Eth,
  //   icon: '/assets/images/chain-logos/jupiter-logo.svg',
  //   contractsSupported: true,
  //   color: 'black',
  // },
  {
    id: polygon.id,
    name: polygon.name,
    blockExplorer: polygon.blockExplorers.default.url,
    protocol: CryptoAddressProtocol.Eth,
    icon: '/assets/images/chain-logos/polygon-matic-logo.svg',
    contractsSupported: true,
    color: 'purple-600',
  },
  {
    id: polygonMumbai.id,
    name: polygonMumbai.name,
    blockExplorer: polygonMumbai.blockExplorers.default.url,
    faucet: 'https://faucet.matic.network/',
    protocol: CryptoAddressProtocol.Eth,
    contractsSupported: true,
    color: 'purple-300',
  },
  // {
  //   id: 43114,
  //   name: 'Avalanche Mainnet',
  //   blockExplorer: 'https://arbiscan.com',
  //   protocol: CryptoAddressProtocol.Eth,
  //   icon: '/assets/images/chain-logos/arbitrum.svg',
  //   contractsSupported: false,
  // },
  // {
  //   id: 56,
  //   name: 'Binance Smart Chain',
  //   blockExplorer: 'https://bscscan.com',
  //   protocol: CryptoAddressProtocol.Eth,
  //   icon: '/assets/images/chain-logos/binance-chain.svg',
  //   contractsSupported: false,
  // },
  // {
  //   id: 10,
  //   name: 'Optimism',
  //   blockExplorer: 'https://optimistic.etherscan.io',
  //   protocol: CryptoAddressProtocol.Eth,
  //   icon: '/assets/images/chain-logos/optomism.png',
  //   contractsSupported: false,
  // },
  // {
  //   id: 100,
  //   name: 'xDAI',
  //   blockExplorer: 'https://blockscout.com/xdai/mainnet',
  //   protocol: CryptoAddressProtocol.Eth,
  //   icon: '/assets/images/chain-logos/xdai.svg',
  //   contractsSupported: false,
  // },

  // {
  //   id: 12345678,
  //   name: 'Algo',
  //   blockExplorer: 'https://algoexplorer.io',
  //   protocol: CryptoAddressProtocol.Algo,
  //   icon: '/assets/images/chain-logos/algorand-algo.svg',
  //   contractsSupported: true,
  //   color: 'grey-800',
  // },
  // {
  //   id: 654321,
  //   name: 'AlgoTest',
  //   blockExplorer: 'https://testnet.algoexplorer.io',
  //   protocol: CryptoAddressProtocol.Algo,
  //   icon: '/assets/images/chain-logos/algorand-algo.svg',
  //   contractsSupported: true,
  //   color: 'grey-800',
  // },
];
export const MatchSupportedChains = (chainId) => {
  return SupportedChainsAddendum.find((chain) => chain.id === chainId);
};

export type WalletConnectorIdType = 'metamask' | 'coinbasewallet' | 'walletconnect' | 'ledger' | 'safewallet';

export type WalletConnectorType = {
  id: WalletConnectorIdType;
  name: string;
  logo: string;
  isSquare?: boolean;
  experimental?: boolean;
  description: string;
};

export const SupportedEthConnectors = [
  {
    id: 'metamask',
    name: 'MetaMask',
    logo: 'assets/images/wallet-logos/metamask-fox.svg',
    experimental: false,
    description: 'Mobile app and extension',
    connector: new InjectedConnector({
      chains: SupportedChains,
    }),
  },
  {
    id: 'coinbasewallet',
    name: 'Coinbase Wallet',
    logo: '/assets/images/wallet-logos/coinbasewallet-logo.png',
    isSquare: true,
    experimental: false,
    description: 'Link to Coinbase Wallet',
    connector: new CoinbaseWalletConnector({
      chains: SupportedChains,
      options: {
        appName: 'Syndicate by Cooperativ Labs',
        jsonRpcUrl: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
      },
    }),
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    logo: '/assets/images/wallet-logos/walletconnect-logo.svg',
    experimental: true,
    description: 'Link wallet with a QR code',
    connector: new WalletConnectConnector({
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
        isNewChainsStale: false,
      },
    }),
  },
  {
    id: 'ledger',
    name: 'Ledger Connect',
    logo: '/assets/images/wallet-logos/ledger-logo.webp',
    experimental: true,
    description: 'Connect to Ledger',
    connector: new LedgerConnector({
      chains: SupportedChains,
    }),
  },
  {
    id: 'safewallet',
    name: 'Safe Connect',
    logo: '/assets/images/wallet-logos/safe-logo.png',
    experimental: false,
    description: 'Connect to Safe',
    connector: new SafeConnector({
      chains: SupportedChains,
      options: {
        allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
        debug: false,
      },
    }),
  },
];

export const GetConnector = (id: WalletConnectorIdType) => {
  switch (id) {
    case 'metamask':
      return SupportedEthConnectors[0].connector;
    case 'walletconnect':
      return SupportedEthConnectors[2].connector;
    case 'coinbasewallet':
      return SupportedEthConnectors[1].connector;
    case 'safewallet':
      return SupportedEthConnectors[3].connector;
    case 'ledger':
      return SupportedEthConnectors[3].connector;
    default:
      return undefined;
  }
};
