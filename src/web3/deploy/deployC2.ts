import { Contract } from '@ethersproject/contracts';
import { Signer } from 'ethers';
import { C2__factory } from 'types/web3';

export const deploy_c2_v0_1_3 = async (signer: Signer): Promise<Contract> => {
  const c2Factory = new C2__factory(signer);
  const contract = await c2Factory.deploy();
  await contract.deployTransaction.wait();
  return contract;
};
