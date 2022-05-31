import ChooseConnectorButton from '../ChooseConnectorButton';
import FormattedCryptoAddress from '../components/FormattedCryptoAddress';
import React, { FC, useState } from 'react';
import { ADD_USER_WITH_WALLET } from '@src/utils/dGraphQueries/user';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import Button from '../components/buttons/Button';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { CustomTokenService } from 'firebaseConfig/firebaseConfig';
import { GET_CRYPTO_ADDRESS } from '@src/utils/dGraphQueries/crypto';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

export type CreateAccountProps = {
  addUser: any;
};

const CreateAccount: FC<CreateAccountProps> = ({ addUser }) => {
  const { chainId, account: walletAddress, library } = useWeb3React<Web3Provider>();
  const [loading, setLoading] = useState<boolean>(false);

  const { data: walletData, loading: walletLoading } = useQuery(GET_CRYPTO_ADDRESS, {
    variables: { walletAddress: walletAddress },
  });

  const existingWallet = walletData?.getCryptoAddress;
  const notPrimaryWallet = existingWallet && walletAddress !== walletData?.getCryptoAddress?.user.uuid;

  const signButton = () => {
    const signer = library.getSigner();
    return (
      <Button
        disabled={loading}
        className={
          'p-3 border-2 border-gray-300 font-semibold rounded-full relative w-full hover:bg-cDarkBlue hover:text-gray-100'
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

  return (
    <div className="flex flex-col gap relative">
      <div className="mt-5 md:p-10 md:rounded-lg md:bg-white md:shadow-xl">
        {walletAddress ? (
          <div>
            <div className="text-sm">Linked wallet address:</div>
            <div className="hidden md:flex md:text-lg font-bold text-gray-600">{walletAddress} </div>
            <div className="md:hidden">
              <FormattedCryptoAddress chainId={chainId} address={walletAddress} className="text-large font-bold" />
            </div>
            <div className="mt-4">
              {notPrimaryWallet
                ? 'This address is already linked to an account. Please switch to your login wallet'
                : signButton()}{' '}
            </div>
          </div>
        ) : (
          <ChooseConnectorButton buttonText="Connect your Ethereum wallet" large />
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
