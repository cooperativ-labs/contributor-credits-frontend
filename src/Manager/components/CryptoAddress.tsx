import cn from 'classnames';
import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MatchSupportedChains } from '@src/web3/connectors';

type CryptoAddressFormatterProps = {
  chainId: number;
  address: string;
  label?: string;
  withCopy?: boolean;
  className?: string;
  light?: boolean;
};

export const CryptoAddressFormatter: FC<CryptoAddressFormatterProps> = ({
  label,
  chainId,
  address,
  withCopy,
  className,
  light,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const blockExplorer = MatchSupportedChains(chainId).blockExplorer;
  return (
    <span className={cn('flex', [className ? className : 'text-sm text-gray-700'])}>
      <a target="_blank" rel="noreferrer" href={`${blockExplorer}/address/${address}`}>
        {label}{' '}
        <span className="hover:underline mr-2">
          {address.slice(0, 7)}...{address.slice(-4)}
        </span>
      </a>
      {withCopy && (
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
      )}
    </span>
  );
};

export default CryptoAddressFormatter;
