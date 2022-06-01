import { Web3Provider } from '@ethersproject/providers';
import { C2Type, useC2 } from '@src/web3/hooks/useC2';
import { C3Type, useC3 } from '@src/web3/hooks/useC3';
import { toHumanNumber } from '@src/web3/util';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { SmartContractType } from 'types';

export const proportionFunded = (cc: C2Type | C3Type): number => {
  const { totalSupply, bacStaked, decimals: c2Decimals, totalBacNeededToFund } = cc.info;
  if (!cc.bacContract || !cc.bacInfo) {
    return 0;
  }
  const { decimals: bacDecimals } = cc.bacInfo;

  if (totalSupply.eq(0)) {
    return 1;
  }
  const humanC2 = toHumanNumber(totalSupply, c2Decimals);
  const humanStake = toHumanNumber(bacStaked, bacDecimals);
  const totalC2 = parseInt(humanC2._hex);

  const stakedBac = parseInt(humanStake._hex);
  return stakedBac / totalC2;
};

export const getEarnedCredits = (addrBalances, c2Decimals): number => {
  const { account: walletAddress } = useWeb3React<Web3Provider>();

  const claim = addrBalances.get(walletAddress);
  function earned() {
    if (claim) {
      if (claim.eq(0)) {
        return BigNumber.from([0]);
      }
      return toHumanNumber(claim, c2Decimals);
    }
    return BigNumber.from([0]);
  }
  return parseInt(earned()._hex);
};

export const ClassStatus = (cryptoAddress: string, memberAddresses: string[], contractType: SmartContractType) => {
  const cc =
    contractType === SmartContractType.C2
      ? useC2(cryptoAddress, memberAddresses)
      : useC3(cryptoAddress, memberAddresses);

  if (cc) {
    const { totalSupply, addrBalances, decimals: c2Decimals, totalBacNeededToFund, isFunded } = cc.info;

    const { decimals: bacDecimals } = cc.bacInfo;
    const creditsAuthorized = parseInt(toHumanNumber(totalSupply, c2Decimals)._hex);
    const creditsUnfunded = parseInt(toHumanNumber(totalBacNeededToFund, bacDecimals)._hex);

    const backingCurrency = cc.bacInfo.symbol;
    const creditsEarned = getEarnedCredits(addrBalances, c2Decimals);
    const fundRatio = proportionFunded(cc);
    const loading = false;
    const isOwner = cc.info.isOwner;

    return {
      creditsAuthorized,
      creditsUnfunded,
      creditsEarned,
      fundRatio,
      backingCurrency,
      loading,
      isOwner,
      isFunded,
    };
  } else {
    const creditsAuthorized: number = null;
    const creditsUnfunded: number = null;
    const creditsEarned: number = null;
    const fundRatio: number = null;
    const backingCurrency: string = 'null';
    const isOwner = undefined;
    const isFunded = false;

    const loading = true;
    return {
      creditsAuthorized,
      creditsUnfunded,
      creditsEarned,
      fundRatio,
      backingCurrency,
      loading,
      isOwner,
      isFunded,
    };
  }
};
