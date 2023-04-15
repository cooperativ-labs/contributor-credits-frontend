import cn from 'classnames';
import FormattedCryptoAddress from './FormattedCryptoAddress';
import React, { FC, useState } from 'react';
import { BigNumber } from 'ethers';
import { C2Type } from '@src/web3/hooks/useC2';
import { C3Type } from '@src/web3/hooks/useC3';
import { isMintableERC20 } from '@src/web3/info/erc20Info';
import { LoadingButtonStateType, LoadingButtonText } from './buttons/Button';
import { MatchSupportedChains } from '@src/web3/connectors';
import { toContractInteger } from '@src/web3/util';
import { useChainId, useNetwork } from 'wagmi';

type FormChainWarningProps = {
  activeCC?: C2Type | C3Type;
};

const FormChainWarning: FC<FormChainWarningProps> = ({ activeCC }) => {
  const chainId = useChainId();
  const { chain } = useNetwork();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const mintBac = async (amount: BigNumber) => {
    if (isMintableERC20(activeCC.bacContract)) {
      setButtonStep('submitting');
      await activeCC.bacContract.mint(amount);
      setButtonStep('confirmed');
    }
  };

  const Testing = () => {
    const bacName = activeCC?.bacInfo.symbol;
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
        {activeCC && (
          <div>
            <button
              className="p-2 mt-3 border-2 border-yellow-600 bg-cYellow bg-opacity-50 font-bold text-yellow-900 rounded-md w-full"
              onClick={async () => await mintBac(toContractInteger(BigNumber.from(1000000), activeCC.bacInfo.decimals))}
            >
              <LoadingButtonText
                state={buttonStep}
                idleText={`Get test ${bacName} for funding`}
                submittingText="You will need to confirm in your wallet"
                confirmedText="Your testing currency should arrive soon"
              />
            </button>
            {buttonStep === 'confirmed' && (
              <>
                <div className="text-sm mt-2">Now add this token address to your wallet:</div>
                <FormattedCryptoAddress chainId={chainId} address={activeCC.bacContract.address} withCopy />
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const Live = () => {
    const chainColor = chainId === 137 ? 'purple' : 'emerald';
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
            <FormattedCryptoAddress chainId={chainId} address={activeCC.bacContract.address} />
          </>
        )}
      </div>
    );
  };

  return chain?.testnet ? <Testing /> : <Live />;
};

export default FormChainWarning;
