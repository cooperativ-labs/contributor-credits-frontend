// components/AddTokenToMetamask.tsx

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface AddTokenToMetamaskProps {
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  tokenImage?: string;
}

const AddTokenToMetamask: React.FC<AddTokenToMetamaskProps> = ({
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage,
}) => {
  const [status, setStatus] = useState<string>('');

  const handleClick = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const wasAdded = await window.ethereum.request({
          // @ts-ignore
          method: 'wallet_watchAsset',
          params: {
            // @ts-ignore
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: tokenImage,
            },
          },
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  return (
    <div>
      <button
        className={
          'text-xs font-bold text-slate-200 p-1 px-2 my-1 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:bg-gradient-to-l from-cyan-600 to-blue-600 '
        }
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={'fa-plus' as IconProp} /> <FontAwesomeIcon icon={'fa-wallet' as IconProp} />
      </button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default AddTokenToMetamask;
