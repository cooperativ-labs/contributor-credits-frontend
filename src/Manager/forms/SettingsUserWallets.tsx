import React, { FC, useState } from 'react';

import Checkbox from './components/Checkbox';
import FormattedCryptoAddress from '../components/FormattedCryptoAddress';
import Input, { defaultFieldLabelClass } from './components/Inputs';
import Select from './components/Select';
import { CryptoAddressProtocol, CryptoAddressType, User } from 'types';
import { Form, Formik } from 'formik';
import { GET_CRYPTO_ADDRESS } from '@src/utils/dGraphQueries/crypto';
import { UPDATE_USER_WALLETS } from '@src/utils/dGraphQueries/user';
import { useMutation, useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { utils } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

const fieldDiv = 'md:pt-3 md:my-2 bg-opacity-0';

type SettingsUserWalletsProps = {
  user: User;
};

const SettingsUserWallets: FC<SettingsUserWalletsProps> = ({ user }) => {
  const { account: walletAddress, chainId, library } = useWeb3React<Web3Provider>();
  const { data: walletData } = useQuery(GET_CRYPTO_ADDRESS, {
    variables: { walletAddress: walletAddress },
  });
  const [alerted, setAlerted] = useState<boolean>(false);
  const [updateUserWallets, { error }] = useMutation(UPDATE_USER_WALLETS);

  if (error && !alerted) {
    alert(`Oops. Looks like something went wrong ${error.message}`);
    setAlerted(true);
  }

  const walletVerificationString = 'Click sign below to confirm that this is your wallet';
  const existingWallet = walletData?.getCryptoAddress;
  const newWalletAddress = !user.walletAddresses.find((cryptoaddress) => cryptoaddress.address === walletAddress);

  const handleWalletAddition = async (values) => {
    try {
      const signer = await library.getSigner();
      const signature = await signer.signMessage(walletVerificationString);
      const recoveredAddress = utils.verifyMessage(walletVerificationString, signature);
      if (walletAddress === recoveredAddress) {
        updateUserWallets({
          variables: {
            userId: user.id,
            name: values.name,
            walletAddress: walletAddress,
            protocol: CryptoAddressProtocol.Eth,
            type: values.isContractAddress ? CryptoAddressType.Contract : CryptoAddressType.Wallet,
            chainId: parseInt(values.chainId, 10),
          },
        });
      }
    } catch (err) {}
  };

  return (
    <Formik
      initialValues={{
        name: '',
        chainId: `${chainId}`,
        isContractAddress: false,
      }}
      validate={async (values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.name && walletAddress) {
          errors.name = 'Please include a name';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await handleWalletAddition(values);
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="flex flex-col">
          <hr className="mt-6 mb-8 md:mb-4" />
          {newWalletAddress || !existingWallet ? (
            <>
              <div className="grid md:grid-cols-4 gap-4">
                <Input
                  className={`${fieldDiv} w-full md:col-span-1`}
                  required
                  labelText="Name"
                  name="name"
                  placeholder="Personal"
                />
                <div className="md:pt-3 m-2">
                  <label className={defaultFieldLabelClass}>Wallet Address</label>
                  <div className="m-2" />
                  <FormattedCryptoAddress
                    chainId={chainId}
                    address={walletAddress}
                    showFull
                    className="justify-start text-large font-bold"
                  />
                </div>
              </div>
              <Checkbox
                name="isContractAddress"
                checked={values.isContractAddress}
                labelText="This address only works on one network"
                sideLabel
              />

              {values.isContractAddress && (
                <Select
                  className={`${fieldDiv} md:col-span-3`}
                  required
                  name="chainId"
                  labelText="This address is only active on:"
                >
                  <option value="">Select chain</option>
                  <option value="1">Ethereum Mainnet</option>
                  <option value="43114">Avalanche Mainnet</option>
                  <option value="56">Binance Smart Chain</option>
                  <option value="10">Optimism</option>
                  <option value="100">xDAI</option>
                  <option value="137">Polygon</option>
                  <option value="3">Ropsten Testnet</option>
                  <option value="4">Rinkeby Testnet</option>
                  <option value="5">Görli Testnet</option>
                </Select>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
              >
                Add Wallet to my account
              </button>
            </>
          ) : (
            'Connect another wallet to add it to this account'
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SettingsUserWallets;
