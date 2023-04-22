import cn from 'classnames';
import React, { FC, useState } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MatchSupportedChains } from '@src/web3/connectors';
import { useEnsName } from 'wagmi';
import AddTokenToMetamask from './buttons/AddTokenToMetamask';

type FormattedCryptoAddressProps = {
  chainId: number;
  address: any;
  label?: string;
  withCopy?: boolean;
  withAddToken?: boolean;
  className?: string;
  showFull?: boolean;
  lookupType?: 'address' | 'tx';
  userName?: string;
  isYou?: boolean;
  addTokenSymbol?: string;
};

const FormattedCryptoAddress: FC<FormattedCryptoAddressProps> = ({
  label,
  chainId,
  address,
  withCopy,
  withAddToken,
  className,
  showFull,
  addTokenSymbol,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const blockExplorer = chainId && MatchSupportedChains(chainId).blockExplorer;
  const { data: ensName } = useEnsName({ address });
  const windowSize = useWindowSize();
  const isDesktop = windowSize.width > 768;

  const splitAddress = `${address.slice(0, 7)}... ${address.slice(-4)}`;
  const presentAddressOhneENS =
    showFull && isDesktop ? address : <span className="hover:underline whitespace-nowrap">{splitAddress}</span>;

  return (
    <span className={cn('flex items-center', [className ? className : 'text-sm text-gray-700'])}>
      <div>
        <a target="_blank" rel="noreferrer" href={`${blockExplorer}/address/${address}`}>
          {label} {ensName ?? presentAddressOhneENS}
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
      </div>
      {withAddToken && <AddTokenToMetamask tokenAddress={address} tokenSymbol={addTokenSymbol} tokenDecimals={18} />}
    </span>
  );
};

export default FormattedCryptoAddress;
