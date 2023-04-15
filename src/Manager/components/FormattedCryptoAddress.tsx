import cn from 'classnames';
import React, { FC, useState } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MatchSupportedChains } from '@src/web3/connectors';
import { useEnsName } from 'wagmi';

type FormattedCryptoAddressProps = {
  chainId: number;
  address: any;
  label?: string;
  withCopy?: boolean;
  className?: string;
  showFull?: boolean;
  lookupType?: 'address' | 'tx';
  userName?: string;
  isYou?: boolean;
};

const FormattedCryptoAddress: FC<FormattedCryptoAddressProps> = ({
  label,
  chainId,
  address,
  withCopy,
  className,
  showFull,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const blockExplorer = chainId && MatchSupportedChains(chainId).blockExplorer;

  const { data: ensName } = useEnsName({ address });
  const windowSize = useWindowSize();
  const isDesktop = windowSize.width > 768;
  return (
    <span className={cn('flex', [className ? className : 'text-sm text-gray-700'])}>
      <a target="_blank" rel="noreferrer" href={`${blockExplorer}/address/${address}`}>
        {label}{' '}
        {showFull && isDesktop ? (
          address
        ) : (
          <span className="hover:underline">
            {address?.slice(0, 7)}...{address?.slice(-4)}
          </span>
        )}
      </a>
      {withCopy && (
        <button
          className="ml-2"
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

export default FormattedCryptoAddress;
