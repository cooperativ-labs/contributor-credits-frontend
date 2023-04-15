import Card from '@src/Manager/components/cards/BaseCard';
import React from 'react';
import { MatchSupportedChains } from './connectors';
import { useChainId } from 'wagmi';

const EnsureCompatibleNetwork = ({ children }: { children: any }) => {
  const chainId = useChainId();
  if (!chainId || MatchSupportedChains(chainId)?.contractsSupported) {
    return children;
  } else {
    return (
      <div className="flex flex-col h-full w-screen items-center justify-center">
        <Card className="md:w-96 rounded-lg mx-4 md:mx-auto mt-4  p-4 ">
          The blockchain you are using is not compatible with Contributor Credits. Please use{' '}
          <a className="underline font-bold" href="https://sepolia.dev/" target="_blank" rel="noreferrer">
            Sepolia
          </a>{' '}
          for testing and the <strong>Ethereum Mainnet</strong> or{' '}
          <a className="underline font-bold" href="https://chainlist.org/chain/137" target="_blank" rel="noreferrer">
            Polygon
          </a>{' '}
          for real transactions.{' '}
        </Card>
      </div>
    );
  }
};

export default EnsureCompatibleNetwork;
