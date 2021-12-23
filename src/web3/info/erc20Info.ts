import { ERC20, MintableERC20 } from '../../../types/web3';
import { Event } from 'ethers';
import { unique } from '@utils/helpersGeneral';

export interface Erc20Info {
  address: string;
  symbol: string;
  decimals: number;
}

export const getERC20Info = async (contract: ERC20): Promise<Erc20Info> => {
  const [symbol, decimals]: [string, number] = await Promise.all([contract.symbol(), contract.decimals()]);

  return {
    address: contract.address,
    symbol,
    decimals,
  };
};

export function isMintableERC20(erc20: ERC20 | MintableERC20): erc20 is MintableERC20 {
  return (erc20 as MintableERC20).mint !== undefined;
}

export const gatherAddresses = (transferEvents: Event[]): string[] => {
  const addresses = transferEvents.map((event) => event.args.to);
  const addrsNoZero = addresses.filter((addr) => addr !== '0x0000000000000000000000000000000000000000');
  return unique(addrsNoZero);
};
