import { Erc20Info, getERC20Info } from '@web3/info/erc20Info';
import promiseAllProperties from 'promise-all-properties';
import { C3, ERC20 } from '../../../types/web3';
import { ContractInteger } from '@web3/util';
import { BigNumber, Event } from 'ethers';
import { unique, mapZip } from '@src/utils/helpersGeneral';

export type C3EventType = 'Issued' | 'Burned' | 'CashedOut' | 'Funded';

export interface C3Info extends Erc20Info {
  userBalance: ContractInteger;
  userShares: ContractInteger;
  userBacWithdrawn: ContractInteger;
  version: string;
  isOwner: boolean;
  agreementHash: string;
  totalSupply: ContractInteger;
  totalAmountFunded: ContractInteger;
  bacStaked: ContractInteger;
  totalBacNeededToFund: ContractInteger;
  sharesFinalized: boolean;
  isFunded: boolean;
  // events: Map<C3EventType, Event[]>;
  addrBalances: Map<string, ContractInteger>;
  addrShares: Map<string, ContractInteger>;
  addrBacWithdrawn: Map<string, ContractInteger>;
}

export const getC3Info = async (c3: C3, bac: ERC20, account: string, memberAddresses: string[]): Promise<C3Info> => {
  const erc20Info = await getERC20Info(c3);
  const baseC3InfoPromise = {
    version: c3.version(),
    isOwner: isOwner(c3, account),
    agreementHash: c3.agreementHash(),
    totalSupply: c3.totalSupply(),
    totalAmountFunded: c3.totalAmountFunded(),
    bacStaked: bac.balanceOf(c3.address),
    totalBacNeededToFund: c3.totalBackingNeededToFund(),
    sharesFinalized: c3.sharesFinalized(),
    isFunded: c3.isFunded(),
  };
  const baseC3Info = await promiseAllProperties(baseC3InfoPromise);

  // const [issueEvents, burnEvents, cashoutEvents, fundedEvents, transferEvents] = await getC3Events(c3);
  // const addresses = gatherAddresses(transferEvents);
  const [allBalances, allShares, allBacWithdrawns] = await Promise.all([
    Promise.all(memberAddresses.map((addr) => c3.balanceOf(addr))),
    Promise.all(memberAddresses.map((addr) => c3.shares(addr))),
    Promise.all(memberAddresses.map((addr) => c3.bacWithdrawn(addr))),
  ]);
  const addrBalances = mapZip(memberAddresses, allBalances);
  const addrShares = mapZip(memberAddresses, allShares);
  const addrBacWithdrawn = mapZip(memberAddresses, allBacWithdrawns);

  return {
    ...erc20Info,
    ...baseC3Info,
    // events: new Map([
    //   ['Issued', issueEvents],
    //   ['Burned', burnEvents],
    //   ['CashedOut', cashoutEvents],
    //   ['Funded', fundedEvents],
    // ]),
    addrBalances,
    userBalance: addrBalances[account] ?? BigNumber.from(0),
    addrShares,
    userShares: addrShares[account] ?? BigNumber.from(0),
    addrBacWithdrawn,
    userBacWithdrawn: addrBacWithdrawn[account] ?? BigNumber.from(0),
  };
};

const isOwner = async (c3: C3, account: string): Promise<boolean> => {
  const owner = await c3.owner();
  return owner === account;
};

// const getC3Events = async (contract: C3): Promise<[Event[], Event[], Event[], Event[], Event[]]> => {
//   return Promise.all([
//     contract.queryFilter(contract.filters.Issued()),
//     contract.queryFilter(contract.filters.Burned()),
//     contract.queryFilter(contract.filters.CashedOut()),
//     contract.queryFilter(contract.filters.Funded()),
//     contract.queryFilter(contract.filters.Transfer()),
//   ]);
// };
