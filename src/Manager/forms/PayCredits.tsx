import Input from './components/Inputs';
import React, { FC, useContext, useState } from 'react';
import { Form, Formik } from 'formik';
import { numberWithCommas } from '@src/utils/helpersMoney';

import FormattedCryptoAddress from '../components/FormattedCryptoAddress';
import FormButton from '../components/buttons/FormButton';
import { ADD_CC_PAYMENT } from '@src/utils/dGraphQueries/agreement';
import { ApplicationStoreProps, store } from '@context/store';
import { BigNumber } from '@ethersproject/bignumber';
import { C2Type } from '@src/web3/hooks/useC2';
import { CurrencyCode, SmartContractType } from 'types';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { LoadingButtonStateType, LoadingButtonText } from '../components/buttons/Button';
import { toContractInteger } from '@src/web3/util';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';
import { C3Type } from '@src/web3/hooks/useC3';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const FormButtonText = (recipient, amount, chainId) => {
  return !recipient || !amount ? (
    'Pay a team recipient'
  ) : (
    <div className="display: inline-block">
      <FormattedCryptoAddress label={'Pay:'} address={recipient} chainId={chainId} className="text-white" />
      {numberWithCommas(amount, 0)} Credits
    </div>
  );
};

export type PayCreditsProps = {
  cc: C2Type | C3Type;
  ccId: string;
  chainId: number;
  agreementId: string;
};

const PayCredits: FC<PayCreditsProps> = ({ cc, ccId, chainId, agreementId }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletActionLockModalOpen } = applicationStore;
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [addPayment, { data, error }] = useMutation(ADD_CC_PAYMENT);
  const [alerted, setAlerted] = useState<boolean>(false);

  if (error && !alerted) {
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }

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
        agreementId: agreementId,
        amount: amount,
        currencyCode: currencyCode,
        contributorCreditClassID: ccId,
        recipient: recipient,
        note: note,
      },
    });
  };

  const [, payCredits] = useAsyncFn(
    async (agreementId: string, amount: number, recipient: string, note: string) => {
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
      try {
        const txResp = await cc.contract.issue(recipient, toContractInteger(BigNumber.from(amount), cc.info.decimals));
        await txResp.wait();
        createPayment(agreementId, amount, recipient, note, CurrencyCode.Cc);
        setButtonStep('confirmed');
        cc.refresh();
      } catch (error) {
        if (error.code === 4001) {
          setButtonStep('rejected');
        }
      }
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
    },
    [cc]
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
        } else if (values.amount < 0) {
          errors.amount = 'Amount must be a positive number';
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
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default PayCredits;
