import { BigNumber } from 'ethers';

export type Decimals = number;
export type HumanNumber = BigNumber;
export type ContractInteger = BigNumber;

// export const bigNaN = BigNumber.from('nan');

export const toHumanNumber = (n: ContractInteger, nDecimals: Decimals): HumanNumber => {
  return n.div(BigNumber.from(10).pow(nDecimals));
};

export const toContractInteger = (n: HumanNumber, nDecimals: Decimals): ContractInteger => {
  return n.mul(BigNumber.from(10).pow(nDecimals));
};
