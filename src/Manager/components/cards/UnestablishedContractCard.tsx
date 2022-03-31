import BaseCard from './BaseCard';

import FormattedCryptoAddress from '../FormattedCryptoAddress';
import Link from 'next/link';
import React from 'react';
import { SmartContractUnestablished } from 'types';
import ChainBadge from '../indicators/ChainBadge';
import Card from '@src/containers/Card';
import router from 'next/router';

interface UnestablishedContractCardProps {
  unestablishedContract: SmartContractUnestablished;
}

const UnestablishedContractCard: React.FC<UnestablishedContractCardProps> = ({ unestablishedContract }) => {
  const { id, cryptoAddress, type } = unestablishedContract;

  return (
    <Card
      key={id}
      className="p-6 rounded-lg hover:shadow-xl md:w-96 h-full"
      onClick={() => router.push(`/app/establish/${id}`)}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold ">Unestablished {type}</h1>
        <ChainBadge chainId={cryptoAddress.chainId} />
      </div>
      <FormattedCryptoAddress address={cryptoAddress.address} chainId={cryptoAddress.chainId} />
      <div className="text-sm font-bold text-blue-800 uppercase mt-4 cursor-pointer">Click to establish</div>
    </Card>
  );
};

export default UnestablishedContractCard;
