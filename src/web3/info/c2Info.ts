import { Erc20Info, getERC20Info } from '@web3/info/erc20Info';
import promiseAllProperties from 'promise-all-properties';
import { C2, ERC20 } from '../../../types/web3';
import { ContractInteger } from '@web3/util';

export type C2EventType = 'Issued' | 'Burned' | 'CashedOut';

export interface C2Info extends Erc20Info {
  userBalance: ContractInteger;
  version: string;
  isOwner: boolean;
  agreementHash: string;
  totalSupply: ContractInteger;
  bacStaked: ContractInteger;
  totalBacNeededToFund: ContractInteger;
  isFunded: boolean;
  // events: Map<C2EventType, Event[]>;
  addrBalances: Map<string, ContractInteger>;
}

export const getC2Info = async (c2: C2, bac: ERC20, account: string, memberAddresses: string[]): Promise<C2Info> => {
  const erc20Info = await getERC20Info(c2);
  const baseC2InfoPromise = {
    userBalance: c2.balanceOf(account),
    version: c2.version(),
    isOwner: isOwner(c2, account),
    totalSupply: c2.totalSupply(),
  };
  const baseC2Info = await promiseAllProperties(baseC2InfoPromise);
  const establishedInfoPromise = {
    agreementHash: c2.agreementHash(),
    bacStaked: bac.balanceOf(c2.address),
    totalBacNeededToFund: c2.totalBackingNeededToFund(),
    isFunded: c2.isFunded(),
  };

  const establishedInfo = await promiseAllProperties(establishedInfoPromise);

  // const [issueEvents, burnEvents, cashoutEvents, transferEvents] = await getC2Events(c2);
  // const addresses = gatherAddresses(transferEvents);
  const balances = await Promise.all(memberAddresses.map((addr) => c2.balanceOf(addr)));

  return {
    ...erc20Info,
    ...baseC2Info,
    ...establishedInfo,
    // events: new Map([
    //   ['Issued', issueEvents],
    //   ['Burned', burnEvents],
    //   ['CashedOut', cashoutEvents],
    // ]),
    addrBalances: new Map(memberAddresses.map((addr, index) => [addr, balances[index]])),
  };
};

const isOwner = async (c2: C2, account: string): Promise<boolean> => {
  const owner = await c2.owner();
  return owner === account;
};

// const getC2Events = async (contract: C2): Promise<[Event[], Event[], Event[], Event[]]> => {
//   return Promise.all([
//     contract.queryFilter(contract.filters.Issued()),
//     contract.queryFilter(contract.filters.Burned()),
//     contract.queryFilter(contract.filters.CashedOut()),
//     contract.queryFilter(contract.filters.Transfer()),
//   ]);
// };
