import Card from '@src/Manager/components/cards/BaseCard';
import React from 'react';
import { MatchSupportedChains } from './connectors';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const EnsureCompatibleNetwork = ({ children }: { children: any }) => {
  const { active, chainId } = useWeb3React<Web3Provider>();
  if (!active || MatchSupportedChains(chainId)?.contractsSupported) {
    return children;
  } else {
    return (
      <div className="flex flex-col h-full w-screen items-center justify-center">
        <Card className="md:w-96 rounded-lg mx-4 md:mx-auto mt-4  p-4 ">
          The blockchain you are using is not compatible with Contributor Credits. Please use <strong>Ropsten</strong>{' '}
          for testing and the <strong>Ethereum Mainnet</strong> or <strong>Polygon</strong> for real transactions.{' '}
        </Card>
      </div>
    );
  }
};

export default EnsureCompatibleNetwork;
