import Input from './components/Inputs';
import React, { FC, useState } from 'react';
import { Form, Formik } from 'formik';
import { numberWithCommas } from '@src/utils/helpersMoney';

import CryptoAddressFormatter from '../components/CryptoAddressFormatter';
import FormButton from '../components/buttons/FormButton';
import { ADD_CC_PAYMENT } from '@src/utils/dGraphQueries/agreement';
import { ContributorCreditClass, CryptoAddress, CurrencyCode } from 'types';
import { BigNumber } from '@ethersproject/bignumber';
import { C2Type } from '@src/web3/hooks/useC2';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { LoadingButtonStateType, LoadingButtonText } from '../components/buttons/Button';
import { toContractInteger } from '@src/web3/util';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const FormButtonText = (recipient, amount, chainId) => {
  return !recipient || !amount ? (
    'Pay a team recipient'
  ) : (
    <div className="display: inline-block">
      <CryptoAddressFormatter label={'Pay:'} address={recipient} chainId={chainId} className="text-white" /> $
      {numberWithCommas(amount, 0)} Credits
    </div>
  );
};

export type PayCreditsProps = {
  c2: C2Type;
  ccClass: ContributorCreditClass;
  chainId: number;
  agreementId: string;
};

const PayCredits: FC<PayCreditsProps> = ({ c2, ccClass, chainId, agreementId }) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [addPayment, { data, error }] = useMutation(ADD_CC_PAYMENT);
  const [alerted, setAlerted] = useState<boolean>(false);
  console.log(data);
  if (error) {
    alert('Oops. Looks like something went wrong');
  }
  if (data && !alerted) {
    alert(`Payment submitted. Confirmation from the network may take a few minutes.`);
    setAlerted(true);
  }

  // const memberOptions = members?.map((projectUser) => {
  //   /** @TODO : let people choose wallet for project */
  //   //BREAKS when a user does not have a wallet address
  //   if (projectUser.user.walletAddresses[0]) {
  //     const walletAddress = projectUser.user.walletAddresses[0].address;
  //     return {
  //       value: {
  //         address: walletAddress,
  //         fullName: projectUser.user.fullName,
  //         projectUser: projectUser,
  //       },
  //       label: `${projectUser.user.fullName} (...${walletAddress.substr(walletAddress.length - 4)})`,
  //     };
  //   }
  //   return;
  // });

  const createPayment = (
    agreementId: string,
    amount: number,
    recipient: string,
    note: string,
    currencyCode: CurrencyCode
  ) => {
    addPayment({
      variables: {
        currentDate: currentDate,
        chainId: chainId,
        agreementId: agreementId,
        amount: amount,
        currencyCode: currencyCode,
        contributorCreditClassID: ccClass.id,
        sender: ccClass.cryptoAddress.address,
        recipient: recipient,
        note: note,
      },
    });
  };

  const [, payCredits] = useAsyncFn(
    async (agreementId: string, amount: number, recipient: string, note: string) => {
      await c2.contract.issue(recipient, toContractInteger(BigNumber.from(amount), c2.info.decimals));
      // const txReceipt = await tx.wait();
      createPayment(agreementId, amount, recipient, note, CurrencyCode.Cc);
      setButtonStep('confirmed');
    },
    [c2]
  );

  return (
    <Formik
      initialValues={{
        recipient: '',
        amount: undefined,
        note: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.recipient) {
          errors.recipient = 'Please specify a recipient';
        }
        if (!values.amount) {
          errors.amount = 'Please include an amount';
        } else if (typeof values.amount !== 'number') {
          errors.amount = 'Amount must be a number';
        }
        if (values.note.length > 160) {
          errors.note = 'This note can only be 160 characters long.';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setAlerted(false);
        setSubmitting(true);
        setButtonStep('submitting');
        await payCredits(agreementId, values.amount, values.recipient, values.note);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <Input
            className={fieldDiv}
            labelText="recipient's wallet address"
            name="recipient"
            type="text"
            placeholder="0x531518975607FE8867fd5F39e9a3754F1fc38276"
            required
          />
          <Input
            className={fieldDiv}
            labelText="Amount of credits to pay"
            name="amount"
            type="number"
            placeholder="344"
            required
          />
          <Input
            className={fieldDiv}
            textArea
            labelText="Note (160 Characters)"
            name="note"
            placeholder="Personal loan to business"
          />
          <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
            <LoadingButtonText
              state={buttonStep}
              //@ts-ignore - ReactSelective strips "value" from the thing it returns.
              //You expect values.recipient.value.[something], but instead get values.recipient.[something]
              idleText={FormButtonText(values.recipient, values.amount, chainId)}
              submittingText="Deploying (this could take a sec)"
              confirmedText="Confirmed!"
            />
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default PayCredits;
