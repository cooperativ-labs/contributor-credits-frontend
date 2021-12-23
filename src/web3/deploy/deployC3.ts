import { Signer } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { C3__factory } from 'types/web3';

export const deploy_c3_v1_0_0 = async (signer: Signer): Promise<Contract> => {
  const c3Factory = new C3__factory(signer);
  const contract = await c3Factory.deploy();
  await contract.deployTransaction.wait();
  return contract;
};
