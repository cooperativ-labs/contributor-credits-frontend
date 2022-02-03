import ChooseConnectorButton from '../ChooseConnectorButton';
import FormattedCryptoAddress from '../components/FormattedCryptoAddress';
import MajorActionButton from '../components/buttons/MajorActionButton';
import React, { FC, useContext } from 'react';
import { ADD_USER_WITH_WALLET } from '@src/utils/dGraphQueries/user';
import { checkEmailTaken, currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { Input } from './components/Inputs';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { WalletOwnerContext } from '@src/SetAppContext';
import { getFunctions, httpsCallable } from 'firebase/functions';
import fireApp from 'firebaseConfig/firebaseConfig';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const CreateAccount: FC = () => {
  const { chainId, account: walletAddress } = useWeb3React<Web3Provider>();
  // const { OwnerWallet: walletAddress } = useContext(WalletOwnerContext);
  const functions = getFunctions(fireApp);
  const getUserAccountUuid = httpsCallable(functions, 'getUserAccountUuid');
  const router = useRouter();
  const [addUser, { data, error }] = useMutation(ADD_USER_WITH_WALLET);
  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }
  if (data) {
    router.reload();
  }

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validate={async (values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!walletAddress) {
          alert('Use of Contributor Credits requires a wallet');
        }
        if (!values.email) {
          errors.email = 'Please include an email address';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        // if (await checkEmailTaken(values.email)) {
        //   errors.email = 'That email is taken';
        // }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        try {
          const ownerUuid = await getUserAccountUuid({
            address: walletAddress,
          });

          const uuid = ownerUuid.data;
          console.log(typeof uuid);
          addUser({
            variables: {
              currentDate: currentDate,
              uuid: uuid,
              email: values.email.toLowerCase(),
              walletAddress: walletAddress,
              chainId: chainId,
            },
          });

          setSubmitting(false);
        } catch (err) {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap relative">
          <div className="mt-5 md:p-10 md:rounded-lg md:bg-white md:shadow-xl">
            {walletAddress ? (
              <div>
                <div className="text-sm">Linked wallet address:</div>
                <div className="hidden md:flex md:text-lg font-bold text-gray-600">{walletAddress} </div>
                <div className="md:hidden">
                  <FormattedCryptoAddress chainId={chainId} address={walletAddress} className="text-large font-bold" />
                </div>
              </div>
            ) : (
              <ChooseConnectorButton buttonText="Connect your Ethereum wallet" large />
            )}
          </div>
          {walletAddress && (
            <div className="mt-10 md:p-10 md:pb-3 md:rounded-lg md:bg-white md:shadow-xl">
              <div className="font-semibold text-gray-700">
                If you are logging in for the first time, we will also need:
              </div>
              <Input className={fieldDiv} required labelText="Email" name="email" type="email" placeholder="" />

              <MajorActionButton type="submit" disabled={isSubmitting || !walletAddress}>
                {!walletAddress ? <> To create an account, you must connect a wallet </> : <>Create account</>}
              </MajorActionButton>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default CreateAccount;
