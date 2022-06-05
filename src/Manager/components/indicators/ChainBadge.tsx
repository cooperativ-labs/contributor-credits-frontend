import cn from 'classnames';
import React, { FC } from 'react';

type ChainBadgeProps = {
  chainId: number;
};

const ChainBadge: FC<ChainBadgeProps> = ({ chainId }) => {
  const setBadge = () => {
    switch (chainId) {
      case 1:
        return { color: 'border-emerald-500 text-emerald-500', chain: 'ETH' };
      case 3:
        return { color: 'border-cYellow text-cYellow', chain: 'ROP' };
      case 5:
        return { color: 'border-cYellow text-cYellow', chain: 'GOR' };
      case 137:
        return { color: 'border-purple-600 text-purple-600', chain: 'MATIC' };
      case 80001:
        return { color: 'border-purple-300 text-purple-300', chain: 'MUMBAI' };
      default:
        return { color: 'border-gray-300 text-gray-300', chain: 'unknown' };
    }
  };
  return (
    <div className={cn('text-xs  rounded-md max-w-min px-1 h-5 border-2 -mt-4 -mr-2', setBadge().color)}>
      {setBadge().chain}
    </div>
  );
};

export default ChainBadge;
