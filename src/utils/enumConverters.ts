import { CryptoAddressProtocol, ProjectInfoDocumentType, ProjectUserRole } from 'types';

export const backerTypeOptions = [
  { value: 'VENTURE_CAPITALIST', name: 'Venture Capitalist' },
  { value: 'LAW_FIRM', name: 'Law Firm' },
  { value: 'ANGEL_INVESTOR', name: 'Angel Investor' },
  { value: 'ACCELERATOR', name: 'Accelerator' },
  { value: 'INCUBATOR', name: 'Incubator' },
  { value: 'BANK', name: 'Bank' },
  { value: 'BUSINESS', name: 'Business' },
  { value: 'STUDIO', name: 'Studio' },
  { value: 'AGENCY', name: 'Agency' },
];

export const getBackerTypeOption = (type) => {
  const option = backerTypeOptions.find((option) => (option.value === type ? option : null));
  return option.name;
};

export const categoryOptions = [
  { value: 'BUSINESS_SERVICES', name: 'Business Services' },
  { value: 'GAMES', name: 'Games' },
  { value: 'ARTS_CULTURE', name: 'Arts & Culture' },
  { value: 'POLITICS_ACTIVISM', name: 'Politics & Activism' },
  { value: 'CONSUMER_SOFTWARE', name: 'Consumer Software' },
  { value: 'BUSINESS_SOFTWARE', name: 'Business Software' },
  { value: 'HEALTH_BIOTECH', name: 'Health & Biotech' },
  { value: 'MUSIC_FILM_ENTERTAINMENT', name: 'Music, Film & Entertainment' },
  { value: 'DEVELOPER_TOOLS', name: 'Developer Tools' },
  { value: 'SCIENCE_EDUCATION', name: 'Science & Education' },
  { value: 'MACHINE_LEARNING_DATA', name: 'Machine Learning & Data' },
  { value: 'WRITING_JOURNALISM', name: 'Writing & Journalism' },
  { value: 'CONSUMER_SERVICES', name: 'Consumer Services' },
];

export const getCategoryOption = (category) => {
  const option = categoryOptions.find((cat) => (cat.value === category ? cat : null));
  return option.name;
};
export const intentionOptions = [
  { value: 'BUILDING_A_BUSINESS', name: 'Building a business 🔧' },
  { value: 'BUILDING_A_BETTER_WORLD', name: 'The world needs this' },
  { value: 'CREATING_A_GAME', name: 'Building a game' },
  { value: 'CREATING_ART', name: 'Creating art' },
  { value: 'JUST_FOR_FUN', name: 'Just for fun' },
];

export const getIntentionOption = (intention) => {
  const option = intentionOptions.find((int) => (int.value === intention ? int : null));
  return option.name;
};
export const progressOptions = [
  { value: 'JUST_AN_IDEA', name: 'Just an idea', width: '20%' },
  { value: 'SOME_STUFF_BUILT', name: 'Some stuff built', width: '35%' },
  { value: 'MVP_IS_LIVE', name: 'Launched MVP', width: '50%' },
  { value: 'ON_THE_MARKET', name: 'On the market', width: '65%' },
  { value: 'INVESTOR_FUNDED', name: 'Investor funded', width: '80%' },
  { value: 'SIGNIFICANT_REVENUE', name: 'Significant revenue', width: '80%' },
];
export const getProgressOption = (progress) => {
  return progressOptions.find((prog) => (prog.value === progress ? prog : null));
};

export const seekingOptions = [
  { value: 'CO_FOUNDER', name: 'Co-Founder' },
  { value: 'CONTRIBUTORS', name: 'Contributors' },
  { value: 'INVESTMENT', name: 'Investment' },
];
export const getSeekingOption = (sought) => {
  const option = seekingOptions.find((seek) => (seek.value === sought ? sought : null));
  return option.name;
};

export const roleOptions = [
  { value: ProjectUserRole.Creator, name: 'Creator' },
  { value: ProjectUserRole.Contributor, name: 'Contributor' },
  { value: ProjectUserRole.Advisor, name: 'Advisor' },
  { value: ProjectUserRole.Investor, name: 'Investor' },
  { value: ProjectUserRole.Supporter, name: 'Supporter' },
];

export const docTypeOptions = [
  { value: ProjectInfoDocumentType.GoogleDoc, name: 'Google Doc' },
  { value: ProjectInfoDocumentType.GoogleDrive, name: 'Google Drive', icon: 'google-drive', subtitle: 'Google Drive' },
  { value: ProjectInfoDocumentType.GoogleSheet, name: 'Google Sheet', icon: 'google-drive', subtitle: 'Google Drive' },
  { value: ProjectInfoDocumentType.GoogleSlide, name: 'Google Slide', icon: 'google-drive', subtitle: 'Google Drive' },
  { value: ProjectInfoDocumentType.Notion, name: 'Notion Page', icon: 'file-alt', subtitle: 'Notion Page' },
  { value: ProjectInfoDocumentType.Pdf, name: 'PDF', icon: 'file-pdf', subtitle: 'PDF' },
  { value: ProjectInfoDocumentType.Github, name: 'Github', icon: 'github', subtitle: 'Github' },
  { value: ProjectInfoDocumentType.Excel, name: 'Microsoft Excel', icon: 'file-excel', subtitle: 'Microsoft Excel' },
  {
    value: ProjectInfoDocumentType.Powerpoint,
    name: 'Microsoft Powerpoint',
    icon: 'file-powerpoint',
    subtitle: 'Powerpoint',
  },
  { value: ProjectInfoDocumentType.WordDoc, name: 'Microsoft Word', icon: 'file-word', subtitle: 'Microsoft Word' },
  { value: ProjectInfoDocumentType.Other, name: 'Other', icon: 'file-alt', subtitle: 'Document' },
];

export const getDocTypeOption = (type: ProjectInfoDocumentType) => {
  return docTypeOptions.find((option) => option.value === type);
};

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
  { type: currencyType.CRYP, value: 'ADA', symbol: 'ADA', protocol: CryptoAddressProtocol.Ada, chainId: 1 },
  { type: currencyType.CRYP, value: 'MATIC', symbol: 'MATIC', protocol: CryptoAddressProtocol.Matic, chainId: 1 },
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
    protocol: CryptoAddressProtocol.Matic,
    chainId: 137,
  },
  {
    type: currencyType.CRYP,
    value: 'PoS_DAI',
    symbol: 'Matic DAI',
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Matic,
    chainId: 137,
  },
  {
    type: currencyType.CRYP,
    value: 'USDC_TEST_',
    symbol: 'USDC*',
    address: '0x8C035e5adD07e9297fc835604DAb380dCE874acE',
    website: 'https://www.centre.io/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 3,
  },
  {
    type: currencyType.CRYP,
    value: 'DAI_TEST_',
    symbol: 'DAI*',
    address: '0xfDdfE7C9Ba9649fB8943f9277830972aa6f3a6bB',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 3,
  },
  {
    type: currencyType.CRYP,
    value: 'USDC_MATIC_TEST_',
    symbol: 'Matic USDC*',
    address: 'NEED ADDRESS',
    website: 'https://www.centre.io/',
    protocol: CryptoAddressProtocol.Matic,
    chainId: 80001,
  },
  {
    type: currencyType.CRYP,
    value: 'DAI_MATIC_TEST_',
    symbol: 'Matic DAI*',
    address: 'NEED ADDRESS',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Matic,
    chainId: 80001,
  },
];
export const bacOptions = currencyOptions.filter(
  (option) =>
    option.type === currencyType.CRYP &&
    (option.protocol === CryptoAddressProtocol.Eth || option.protocol === CryptoAddressProtocol.Matic)
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
