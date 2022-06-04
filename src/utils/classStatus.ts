import { Web3Provider } from '@ethersproject/providers';
import { C2Type } from '@src/web3/hooks/useC2';
import { C3Type } from '@src/web3/hooks/useC3';
import { toHumanNumber } from '@src/web3/util';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';

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

export const getAddrItemInfo = (addrItems, decimals, walletAddress): number => {
  const claim = addrItems?.get(walletAddress);
  function earned() {
    if (claim) {
      if (claim.eq(0)) {
        return BigNumber.from([0]);
      }
      return toHumanNumber(claim, decimals);
    }
    return BigNumber.from([0]);
  }
  return parseInt(earned()._hex);
};

export const classDetails = (cc, usersWallet: string) => {
  const {
    totalSupply,
    totalAmountFunded,
    bacStaked,
    addrBalances,
    decimals: c2Decimals,
    totalBacNeededToFund,
    isFunded,
    isOwner,
    address,
    addrBacWithdrawn,
    addrShares,
  } = cc.info;

  const { decimals: bacDecimals } = cc.bacInfo;

  const getAmountStaked = (cc: C2Type | C3Type): BigNumber => {
    if (!cc.bacContract || !cc.bacInfo) {
      return BigNumber.from([0]);
    }
    const { decimals: bacDecimals } = cc.bacInfo;
    if (totalSupply.eq(0)) {
      return BigNumber.from([1]);
    }
    return toHumanNumber(bacStaked, bacDecimals);
  };

  const creditsAuthorized = parseInt(toHumanNumber(totalSupply, c2Decimals)._hex);
  const amountEverFunded = totalAmountFunded && parseInt(toHumanNumber(totalAmountFunded, bacDecimals)._hex);
  const fundRatio = proportionFunded(cc);
  const c3RemainingUnfunded = creditsAuthorized - amountEverFunded;
  const c2RemainingUnfunded = (1 - fundRatio) * creditsAuthorized;
  const currentAmountStaked = parseInt(getAmountStaked(cc)._hex);
  // const bacNeededToFund = parseInt(toHumanNumber(totalBacNeededToFund, bacDecimals)._hex);
  const backingCurrency = cc.bacInfo.symbol;
  const creditsEarned = getAddrItemInfo(addrBalances, c2Decimals, usersWallet);
  const bacWithdrawn = getAddrItemInfo(addrBacWithdrawn, bacDecimals, usersWallet);
  const userShares = getAddrItemInfo(addrShares, c2Decimals, usersWallet);
  const loading = false;
  const userAvailableToClaim = (userShares / creditsAuthorized) * amountEverFunded - bacWithdrawn;

  return {
    address,
    creditsAuthorized,
    c2RemainingUnfunded,
    currentAmountStaked,
    amountEverFunded,
    c3RemainingUnfunded,
    creditsEarned,
    userAvailableToClaim,
    fundRatio,
    backingCurrency,
    bacWithdrawn,
    loading,
    isOwner,
    isFunded,
  };
};

export const ClassStatus = (activeCC) => {
  const { account: usersWallet } = useWeb3React<Web3Provider>();

  if (activeCC) {
    return classDetails(activeCC, usersWallet);
  } else {
    const creditsAuthorized: number = null;
    const c2RemainingUnfunded: number = null;
    const currentAmountStaked: number = null;
    const c3RemainingUnfunded: number = null;
    const userAvailableToClaim: number = null;
    const creditsEarned: number = null;
    const fundRatio: number = null;
    const backingCurrency: string = 'null';
    const isOwner = undefined;
    const isFunded = false;
    const loading = true;

    return {
      creditsAuthorized,
      c2RemainingUnfunded,
      currentAmountStaked,
      c3RemainingUnfunded,
      userAvailableToClaim,
      creditsEarned,
      fundRatio,
      backingCurrency,
      loading,
      isOwner,
      isFunded,
    };
  }
};
