import Button from '../components/buttons/Button';
import ChooseConnectorButton from '../ChooseConnectorButton';
import cn from 'classnames';
import FormattedCryptoAddress from '../components/FormattedCryptoAddress';
import React, { FC, useState } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { CustomTokenService } from 'firebaseConfig/firebaseConfig';
import { GET_CRYPTO_ADDRESS } from '@src/utils/dGraphQueries/crypto';

import { useAccount, useChainId, useDisconnect, useSigner } from 'wagmi';
import { useQuery } from '@apollo/client';

const outlinedClass = `text-gray-700 hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-gray-500 hover:border-white`;

export type CreateAccountProps = {
  addUser: any;
};

const CreateAccount: FC<CreateAccountProps> = ({ addUser }) => {
  const { address: walletAddress } = useAccount();
  const chainId = useChainId();
  const { data: signer } = useSigner();
  const { disconnect } = useDisconnect();

  const [loading, setLoading] = useState<boolean>(false);

  const { data: walletData, loading: walletLoading } = useQuery(GET_CRYPTO_ADDRESS, {
    variables: { walletAddress: walletAddress },
  });

  const MetaMaskInstalled = (window as any).ethereum?.isMetaMask;
  const CoinbaseExtensionInstalled = (window as any).ethereum?.isCoinbaseWallet;

  const existingWallet = walletData?.getCryptoAddress;
  const notPrimaryWallet = existingWallet && walletAddress !== walletData?.getCryptoAddress?.user.uuid;

  const signButton = () => {
    return (
      <Button
        disabled={loading}
        className={
          'p-3 border-2 border-cDarkBlue font-semibold rounded-full relative w-full hover:bg-cDarkBlue hover:text-gray-100'
        }
        onClick={async () => {
          setLoading(true);
          await CustomTokenService(signer, walletAddress);
          if (!existingWallet)
            try {
              addUser({
                variables: {
                  currentDate: currentDate,
                  uuid: walletAddress,
                  walletAddress: walletAddress,
                  chainId: chainId,
                },
              });
              setLoading(false);
            } catch (err) {
              setLoading(false);
            }
        }}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <img
              src="/assets/images/loading-circle.jpeg"
              aria-label="loading"
              className="h-6 mr-1 animate-spin bg-white rounded-full"
            />
            <span>Loading your account</span>
          </div>
        ) : (
          'Sign in with this wallet'
        )}
      </Button>
    );
  };

  const disconnectButton = (
    <Button
      className={cn(outlinedClass, 'text-xs p-1 px-3 font-semibold rounded-full relative mr-2')}
      onClick={() => {
        window.sessionStorage?.removeItem('CHOSEN_CONNECTOR');
        disconnect();
      }}
    >
      Disconnect
    </Button>
  );

  return (
    <div className="flex flex-col gap relative">
      <div className="mt-5 md:p-10 md:rounded-lg md:bg-white md:shadow-xl">
        {walletAddress ? (
          <div>
            <div className="flex justify-between items-end">
              <div className="text-sm">Linked wallet address:</div>
              <div className="hidden md:flex pb-2">{disconnectButton}</div>
            </div>

            <div className="hidden md:flex md:text-lg font-bold text-gray-600">{walletAddress} </div>
            <div className="md:hidden flex gap-4  justify-between">
              <FormattedCryptoAddress chainId={chainId} address={walletAddress} className="text-large font-bold" />
              {disconnectButton}
            </div>
            <div className="mt-4">
              {notPrimaryWallet
                ? 'This address is already linked to an account. Please switch to your login wallet'
                : signButton()}{' '}
            </div>
          </div>
        ) : (
          <>
            <ChooseConnectorButton buttonText="Connect your Ethereum wallet" large />{' '}
            <div className="font-xs text-center mt-4">
              {MetaMaskInstalled &&
                `Note: If you have connected with MetaMask, you can only disconnect from within the extension.`}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
