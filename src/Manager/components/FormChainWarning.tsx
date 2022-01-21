import cn from 'classnames';
import FormattedCryptoAddress from './FormattedCryptoAddress';
import React, { FC, useState } from 'react';
import { BigNumber } from 'ethers';
import { C2Type } from '@src/web3/hooks/useC2';
import { isMintableERC20 } from '@src/web3/info/erc20Info';
import { LoadingButtonStateType, LoadingButtonText } from './buttons/Button';
import { MatchSupportedChains } from '@src/web3/connectors';
import { toContractInteger } from '@src/web3/util';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

type FormChainWarningProps = {
  c2?: C2Type;
};

const FormChainWarning: FC<FormChainWarningProps> = ({ c2 }) => {
  const { chainId } = useWeb3React<Web3Provider>();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const mintBac = async (amount: BigNumber) => {
    if (isMintableERC20(c2.bacContract)) {
      setButtonStep('submitting');
      await c2.bacContract.mint(amount);
      setButtonStep('confirmed');
    }
  };

  const Testing = () => {
    return (
      <div>
        <div className="p-2 mt-3 border-2 border-yellow-600 bg-cYellow bg-opacity-50 text-yellow-900 rounded-md">
          <div className="font-bold underline">
            <a target="_blank" rel="noreferrer" href={MatchSupportedChains(chainId).faucet}>
              {`Click here to get free testing ${MatchSupportedChains(chainId).name}.`}
            </a>
          </div>
          <div className="text-sm">Please note that it may take some time for the token to arrive in your wallet.</div>
        </div>
        {c2 && (
          <div>
            <button
              className="p-2 mt-3 border-2 border-yellow-600 bg-cYellow bg-opacity-50 font-bold text-yellow-900 rounded-md w-full"
              onClick={async () => await mintBac(toContractInteger(BigNumber.from(1000000), c2.bacInfo.decimals))}
            >
              <LoadingButtonText
                state={buttonStep}
                idleText="Get free testing currency"
                submittingText="You will need to confirm in your wallet"
                confirmedText="Your testing currency should arrive soon"
              />
            </button>
            {buttonStep === 'confirmed' && (
              <>
                <div className="text-sm mt-2">Now add this token address to your wallet:</div>
                <FormattedCryptoAddress chainId={chainId} address={c2.bacContract.address} />
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const Live = () => {
    const chainColor = chainId === 137 ? 'blue' : 'green';
    return (
      <div
        className={cn(
          `border-${chainColor}-600 bg-${chainColor}-200 text-${chainColor}-900`,
          'p-2 mt-3 border-2  bg-opacity-50  rounded-md'
        )}
      >
        <div className="font-bold ">{`Connected: ${MatchSupportedChains(chainId).name}`}</div>
        {buttonStep === 'confirmed' && (
          <>
            <div className="text-sm mt-2">Now add this token address to your wallet:</div>
            <FormattedCryptoAddress chainId={chainId} address={c2.bacContract.address} />
          </>
        )}
      </div>
    );
  };

  return chainId === 1 || chainId === 137 ? <Live /> : <Testing />;
};

export default FormChainWarning;
