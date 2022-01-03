import BaseCard from './BaseCard';
import cn from 'classnames';
import CryptoAddress from '../CryptoAddress';
import Link from 'next/link';
import React from 'react';
import { SmartContractUnestablished } from 'types';

interface UnestablishedContractCardProps {
  unestablishedContract: SmartContractUnestablished;
}

const UnestablishedContractCard: React.FC<UnestablishedContractCardProps> = ({ unestablishedContract }) => {
  const { id, cryptoAddress, type } = unestablishedContract;

  const setBadgeColor = () => {
    switch (cryptoAddress.chainId) {
      case 1:
        return 'border-green-500 text-green-500';
      case 3:
        return 'border-cYellow text-cYellow';
      case 137:
        return 'border-blue-600 text-blue-600';
      case 80001:
        return 'border-blue-300 text-blue-300';
      default:
        return 'border-gray-300 text-gray-300';
    }
  };

  return (
    <BaseCard key={id} className="p-6 rounded-lg hover:shadow-xl md:w-96 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold ">Unestablished {type}</h1>
        <div className={cn('text-xs  rounded-md max-w-min px-1 h-5 border-2 -mt-4 -mr-2', setBadgeColor())}>
          {cryptoAddress.protocol}
        </div>
      </div>
      <CryptoAddress address={cryptoAddress.address} chainId={cryptoAddress.chainId} />
      <Link href={`/app/establish/${id}`}>
        <div className="text-sm font-bold text-blue-800 uppercase mt-4 cursor-pointer">Click to establish</div>
      </Link>
    </BaseCard>
  );
};

export default UnestablishedContractCard;
