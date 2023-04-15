import { CryptoAddressProtocol } from 'types';

export enum currencyType {
  FIAT,
  CRYP,
  COOP,
}
export const currencyOptions = [
  { type: currencyType.COOP, value: 'CC', symbol: 'Contributor Credits' },
  { type: currencyType.FIAT, value: 'USD', symbol: 'USD' },
  { type: currencyType.FIAT, value: 'EUR', symbol: 'EUR' },
  { type: currencyType.FIAT, value: 'GBP', symbol: 'GBP' },
  { type: currencyType.FIAT, value: 'CAD', symbol: 'CAD' },
  { type: currencyType.CRYP, value: 'BTC', symbol: 'BTC', protocol: CryptoAddressProtocol.Btc, chainId: 1 },
  { type: currencyType.CRYP, value: 'ETH', symbol: 'ETH', protocol: CryptoAddressProtocol.Eth, chainId: 1 },
  { type: currencyType.CRYP, value: 'MATIC', symbol: 'MATIC', protocol: CryptoAddressProtocol.Eth, chainId: 137 },
  {
    type: currencyType.CRYP,
    value: 'USDC',
    symbol: 'USDC',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    website: 'https://www.centre.io/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 1,
  },
  {
    type: currencyType.CRYP,
    value: 'DAI',
    symbol: 'DAI',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 1,
  },
  {
    type: currencyType.CRYP,
    value: 'PoS_USDC',
    symbol: 'Matic USDC',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    website: 'https://www.centre.io/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 137,
  },
  {
    type: currencyType.CRYP,
    value: 'PoS_DAI',
    symbol: 'Matic DAI',
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 137,
  },
  {
    type: currencyType.CRYP,
    value: 'USDC_TEST_',
    symbol: 'USDC*',
    address: '0x66458Bb9BF8e09eA40cf916BCb370727455F6040',
    website: 'https://www.centre.io/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 11155111,
  },
  {
    type: currencyType.CRYP,
    value: 'DAI_TEST_',
    symbol: 'DAI*',
    address: '0x49d66a989A5821eA259C161141D4006cd8e37613',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 11155111,
  },
  {
    type: currencyType.CRYP,
    value: 'USDC_MATIC_TEST_',
    symbol: 'Matic USDC*',
    address: 'NEED ADDRESS',
    website: 'https://www.centre.io/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 80001,
  },
  {
    type: currencyType.CRYP,
    value: 'DAI_MATIC_TEST_',
    symbol: 'Matic DAI*',
    address: 'NEED ADDRESS',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 80001,
  },
];
export const bacOptions = currencyOptions.filter(
  (option) => option.type === currencyType.CRYP && option.protocol === CryptoAddressProtocol.Eth
);
export const currencyOptionsExcludeCredits = currencyOptions.filter(
  (option) => option.type !== currencyType.COOP && option.chainId !== 3
);

export const getCurrencyOption = (currency) => {
  return currencyOptions.find((cur) => (cur.value === currency ? cur : null));
};

export const severityOptions = [
  { value: null, name: 'Need rank' },
  { value: 10, name: '1 - not critical' },
  { value: 20, name: '2' },
  { value: 30, name: '3' },
  { value: 40, name: '4' },
  { value: 50, name: '5 - very critical' },
];
