import cn from 'classnames';
import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MatchSupportedChains } from '@src/web3/connectors';

type CryptoAddressProps = {
  chainId: number;
  address: string;
  label?: string;
  withCopy?: boolean;
  largeText?: boolean;
};

const CryptoAddress: FC<CryptoAddressProps> = ({ label, chainId, address, withCopy, largeText }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const blockExplorer = MatchSupportedChains(chainId).blockExplorer;
  return (
    <span className={cn(largeText ? 'text-lg font-bold' : 'text-sm', 'flex text-gray-600 ')}>
      <a target="_blank" rel="noreferrer" href={`${blockExplorer}/address/${address}`}>
        {label}{' '}
        <span className="hover:underline mr-2">
          {address.slice(0, 7)}...{address.slice(-4)}
        </span>
      </a>
      <button
        onClick={() => {
          navigator.clipboard.writeText(address);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 1000);
        }}
      >
        {copied ? <FontAwesomeIcon icon="check" /> : <FontAwesomeIcon icon="copy" />}
      </button>
    </span>
  );
};

export default CryptoAddress;
