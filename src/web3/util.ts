import { BigNumber } from 'ethers';
import { C2Type } from './hooks/useC2';
import { C3Type } from './hooks/useC3';

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

export function isC3(cc: C2Type | C3Type): cc is C3Type {
  return cc.info.version.startsWith('C3');
}
