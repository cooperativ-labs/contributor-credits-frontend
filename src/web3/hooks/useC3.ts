import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';
import { C3, C3__factory, ERC20, ERC20__factory, MintableERC20, MintableERC20__factory } from '../../../types/web3';
import { Web3Provider } from '@ethersproject/providers';
import { Erc20Info, getERC20Info } from '@web3/info/erc20Info';
import { C3Info, getC3Info } from '@web3/info/c3Info';
import { liveChain } from '../connectors';

export type C3Type = {
  contract: C3;
  info: C3Info;
  class?: undefined; //C3Class;
  bacContract: ERC20 | MintableERC20;
  bacInfo: Erc20Info;
  refresh: () => void;
};

export const useC3 = (address: string, memberAddresses: string[]): C3Type | undefined => {
  const { chainId, account, library } = useWeb3React<Web3Provider>();
  const [c3, setC3] = useState<C3Type | undefined>(undefined);

  const [, fetchC3] = useAsyncFn(async () => {
    const signer = library.getSigner();
    const c3Contract = C3__factory.connect(address, signer);
    // const c3Class = await getC3Class(address);
    const isEstablished = await c3Contract.isEstablished();
    if (!isEstablished) {
      throw new Error('useC3 should only be used for C3 classes that have been established');
    }

    const bacAddress = await c3Contract.backingToken();
    const bacContract = liveChain(chainId)
      ? ERC20__factory.connect(bacAddress, signer)
      : MintableERC20__factory.connect(bacAddress, signer);
    const bacInfo = await getERC20Info(bacContract);

    const c3Info = await getC3Info(c3Contract, bacContract, account, memberAddresses);

    setC3({
      contract: c3Contract,
      info: c3Info,
      // class: c2Class,
      bacContract,
      bacInfo,
      refresh: fetchC3,
    });
    return;
  }, [account, library, address]);

  useEffect(() => {
    fetchC3().then();
  }, [fetchC3]);

  return c3;
};
