import ChooseConnectorButton from '../ChooseConnectorButton';
import CryptoAddress from '../components/CryptoAddress';
import MajorActionButton from '../components/buttons/MajorActionButton';
import React from 'react';
import { ADD_USER_WITH_WALLET, ADD_USER_WITHOUT_WALLET } from '@src/utils/dGraphQueries/user';
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
        fullName: '',
        displayName: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.fullName) {
          errors.fullName = 'Please include a first name';
        }
        if (!values.displayName) {
          errors.displayName = 'Please include a display name';
        }
        if (!values.email) {
          errors.email = 'Please include an email address';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const emailTaken = await checkEmailTaken(values.email);
        try {
          if (emailTaken) {
            alert(
              `That email address is already associated with an account. If you are trying to connect wallet address: ${walletAddress} to your account, log in with your original wallet address, then add this new one in your account settings.`
            );
            setSubmitting(false);
            return;
          }
          addUser({
            variables: {
              currentDate: currentDate,
              email: values.email,
              fullName: values.fullName,
              displayName: values.displayName,
              walletAddress: walletAddress,
              chainId: chainId,
            },
          });

          setSubmitting(false);
        } catch (err) {
          console.log(err);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap relative">
          <Input
            className={fieldDiv}
            required
            labelText="Full name"
            name="fullName"
            type="text"
            placeholder="Moritz Zimmermann"
          />
          <Input className={fieldDiv} required labelText="Email" name="email" type="email" placeholder="" />
          <Input
            className={fieldDiv}
            required
            labelText="Display name"
            name="displayName"
            type="text"
            placeholder="Moritz"
          />
          <div className="mt-5">
            {walletAddress ? (
              <div>
                <div className="text-sm">Linked wallet address:</div>
                <div className="hidden md:flex md:text-lg font-bold text-gray-600">{walletAddress} </div>
                <div className="md:hidden">
                  <CryptoAddress chainId={chainId} address={walletAddress} largeText />
                </div>
              </div>
            ) : (
              <ChooseConnectorButton buttonText="Connect your Ethereum wallet" large />
            )}
          </div>
          <MajorActionButton type="submit" disabled={isSubmitting || !walletAddress}>
            {!walletAddress ? <> To create an account, you must connect a wallet </> : <>Create account</>}
          </MajorActionButton>
        </Form>
      )}
    </Formik>
  );
};

export default CreateAccount;
