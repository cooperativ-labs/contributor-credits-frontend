import ChooseConnectorButton from '../ChooseConnectorButton';
import FormattedCryptoAddress from '../components/FormattedCryptoAddress';
import MajorActionButton from '../components/buttons/MajorActionButton';
import React from 'react';
import { ADD_USER_WITH_WALLET } from '@src/utils/dGraphQueries/user';
import { checkEmailTaken, currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { Input } from './components/Inputs';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const CreateAccount = () => {
  const { account: walletAddress, chainId } = useWeb3React<Web3Provider>();
  const router = useRouter();
  // const conditionalMutation = walletAddress ? ADD_USER_WITH_WALLET : ADD_USER_WITHOUT_WALLET;
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
        if (await checkEmailTaken(values.email)) {
          errors.email = 'That email is taken';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        try {
          addUser({
            variables: {
              currentDate: currentDate,
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
          <div className="mt-5">
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

          <Input className={fieldDiv} required labelText="Email" name="email" type="email" placeholder="" />

          <MajorActionButton type="submit" disabled={isSubmitting || !walletAddress}>
            {!walletAddress ? <> To create an account, you must connect a wallet </> : <>Create account</>}
          </MajorActionButton>
        </Form>
      )}
    </Formik>
  );
};

export default CreateAccount;
