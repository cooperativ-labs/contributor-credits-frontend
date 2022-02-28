import { Web3Provider } from '@ethersproject/providers';
import { C2Type, useC2 } from '@src/web3/hooks/useC2';
import { toHumanNumber } from '@src/web3/util';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';

export const proportionFunded = (c2: C2Type): number => {
  const { totalSupply, bacStaked, decimals: c2Decimals } = c2.info;
  if (!c2.bacContract || !c2.bacInfo) {
    return 0;
  }
  const { decimals: bacDecimals } = c2.bacInfo;
  if (totalSupply.eq(0)) {
    return 1;
  }
  const humanC2 = toHumanNumber(totalSupply, c2Decimals);
  const humanStake = toHumanNumber(bacStaked, bacDecimals);
  const totalC2 = parseInt(humanC2._hex);
  const stakedBac = parseInt(humanStake._hex);
  return stakedBac / totalC2;
};

export const ClassStatus = (cryptoAddress: string, memberAddresses: string[]) => {
  const { account: walletAddress } = useWeb3React<Web3Provider>();
  const c2 = useC2(cryptoAddress, memberAddresses);
  if (c2) {
    const { totalSupply, addrBalances, decimals: c2Decimals } = c2.info;
    const creditsAuthorized = parseInt(toHumanNumber(totalSupply, c2Decimals)._hex);
    const backingCurrency = c2.bacInfo.symbol;
    const getEarnedCredits = (): BigNumber => {
      const claim = addrBalances.get(walletAddress);
      if (claim) {
        if (claim.eq(0)) {
          return BigNumber.from([0]);
        }
        return toHumanNumber(claim, c2Decimals);
      }
      return BigNumber.from([0]);
    };

    const creditsEarned = parseInt(getEarnedCredits()._hex);

    const fundRatio = proportionFunded(c2);
    const loading = false;
    const isOwner = c2.info.isOwner;

    return { creditsAuthorized, creditsEarned, fundRatio, backingCurrency, loading, isOwner };
  } else {
    const creditsAuthorized: number = null;
    const creditsEarned: number = null;
    const fundRatio: number = null;
    const backingCurrency: string = 'null';
    const isOwner = undefined;

    const loading = true;
    return { creditsAuthorized, creditsEarned, fundRatio, backingCurrency, loading, isOwner };
  }
};
