import ChooseConnectorButton from '../ChooseConnectorButton';
import CryptoAddress from '../components/CryptoAddress';
import MarketingInput from './components/Inputs';
import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { GET_USER_FROM_EMAIL } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const LogIn = () => {
  const { account: walletAddress, chainId } = useWeb3React<Web3Provider>();
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [selection, setSelection] = useState(undefined);
  useEffect(() => {
    setSelection(window.sessionStorage);
  });
  const router = useRouter();

  const { data } = useQuery(GET_USER_FROM_EMAIL, {
    variables: { email: userEmail },
  });

  useEffect(() => {
    if (data?.getUser === null && !!userEmail) {
      alert('That email address does not match an account');
    }
  }, [data, userEmail]);

  useEffect(() => {
    if (data?.getUser?.id) {
      selection?.setItem('USER_ID', data?.getUser?.id);
      router.reload();
    }
  }, [data, selection]);

  return (
    <div>
      {walletAddress ? (
        <div>
          <div className="text-sm">Your current Ethereum wallet address:</div>
          <div className="hidden md:flex md:text-lg font-bold text-gray-600">{walletAddress} </div>
          <div className="md:hidden">
            <CryptoAddress chainId={chainId} address={walletAddress} largeText />
          </div>
        </div>
      ) : (
        <>
          <ChooseConnectorButton buttonText="Connect your Ethereum wallet" large />
          <div className="flex flex-col md:text-lg font-bold text-gray-600 text-center mt-6">- OR -</div>
        </>
      )}
      <Formik
        initialValues={{
          email: '',
        }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
          if (!values.email) {
            errors.email = 'Please set include an email address';
          }
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          setUserEmail(values.email);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form data-netlify="true" className="flex flex-col gap relative">
            <MarketingInput className={fieldDiv} required labelText="Email" name="email" type="email" placeholder="" />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
            >
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LogIn;
