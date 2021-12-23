import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';
import { C2, C2__factory, ERC20, ERC20__factory, MintableERC20, MintableERC20__factory } from '../../../types/web3';
import { Web3Provider } from '@ethersproject/providers';
import { Erc20Info, getERC20Info } from '@web3/info/erc20Info';
import { C2Info, getC2Info } from '@web3/info/c2Info';
import { liveChain } from '../connectors';

export type C2Type = {
  contract: C2;
  info: C2Info;
  class?: undefined; //C2Class;
  bacContract: ERC20 | MintableERC20;
  bacInfo: Erc20Info;
  refresh: () => void;
};

export const useC2 = (address: string, memberAddresses: string[]): C2Type | undefined => {
  const { chainId, account, library } = useWeb3React<Web3Provider>();
  const [c2, setC2] = useState<C2Type | undefined>(undefined);

  const [, fetchC2] = useAsyncFn(async () => {
    const signer = library.getSigner();
    const c2Contract = C2__factory.connect(address, signer);
    // const c2Class = await getC2Class(address);
    const isEstablished = await c2Contract.isEstablished();
    if (!isEstablished) {
      throw new Error('useC2 should only be used for C2 classes that have been established');
    }

    const bacAddress = await c2Contract.backingToken();
    const bacContract = liveChain(chainId)
      ? ERC20__factory.connect(bacAddress, signer)
      : MintableERC20__factory.connect(bacAddress, signer);
    const bacInfo = await getERC20Info(bacContract);

    const c2Info = await getC2Info(c2Contract, bacContract, account, memberAddresses);

    setC2({
      contract: c2Contract,
      info: c2Info,
      // class: c2Class,
      bacContract,
      bacInfo,
      refresh: fetchC2,
    });
    return;
  }, [account, library, address]);

  useEffect(() => {
    fetchC2().then();
  }, [fetchC2]);

  return c2;
};
