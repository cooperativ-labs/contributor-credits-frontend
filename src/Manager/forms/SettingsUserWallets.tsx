import MarketingInput from './components/Inputs';
import React from 'react';
import WalletAddressListItem from '../components/WalletAddressListItem';
import { checkWalletTaken } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { UPDATE_USER_WALLETS } from '@src/utils/dGraphQueries/user';
import { useMutation } from '@apollo/client';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const SettingsUserWallets = ({ user }) => {
  const [updateUserWallets, { data, error }] = useMutation(UPDATE_USER_WALLETS);

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }

  if (data) {
    alert(`${data.updateUser.user[0].displayName} was successfully updated!`);
  }

  return (
    <Formik
      initialValues={{
        name: '',
        address: '',
      }}
      validate={async (values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.name && values.address) {
          errors.name = 'Please include a name';
        }
        if (values.name && !values.address) {
          errors.address = 'Please include an address';
        }

        if (values.address && (await checkWalletTaken(values.address))) {
          errors.address = 'That wallet address is already taken';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        updateUserWallets({ variables: { userId: user.id, name: values.name, walletAddress: values.address } });

        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col">
          <h2 className="text-xl text-blue-900 font-semibold mb-4">Wallet Addresses</h2>
          {user.walletAddresses.map((wallet) => {
            return (
              <div className="mb-3">
                <WalletAddressListItem name={wallet.name} address={wallet.address} />
              </div>
            );
          })}
          <div className="grid md:grid-cols-4 gap-4">
            <MarketingInput
              className={`${fieldDiv} w-full md:col-span-1`}
              labelText="Name"
              name="name"
              placeholder="Personal"
            />
            <MarketingInput
              className={`${fieldDiv} w-full md:col-span-3`}
              labelText="Address"
              name="address"
              placeholder="0x0dBb2C4107d77EB34535840d63CF02aE46bedebD"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
          >
            Add Wallet
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsUserWallets;
