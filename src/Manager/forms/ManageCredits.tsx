import cn from 'classnames';
import Input from './components/Inputs';
import React, { FC, useContext, useState } from 'react';
import Select from './components/Select';
import { ApplicationStoreProps, store } from '@context/store';
import { BigNumber } from '@ethersproject/bignumber';
import { C2Type } from '@src/web3/hooks/useC2';
import { C3Type } from '@src/web3/hooks/useC3';
import { Form, Formik } from 'formik';
import { isC3, toContractInteger } from '@src/web3/util';
import { LoadingButtonStateType, LoadingButtonText } from '../components/buttons/Button';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { proportionFunded } from '@src/utils/classStatus';
import { SmartContractType } from 'types';
import { useAsyncFn } from 'react-use';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

export type ManageCreditsProps = {
  cc: { c2: C2Type; c3: C3Type };
  chainId: number;
  contractType: SmartContractType;
};

const ManageCredits: FC<ManageCreditsProps> = ({ cc, chainId, contractType }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletActionLockModalOpen } = applicationStore;
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [buttonAmount, setButtonAmount] = useState<string>('');

  const c2 = cc.c2;
  const c3 = cc.c3;
  const activeCC = c2 ? c2 : c3;

  const fundRatio = proportionFunded(c2);

  const [, cashOut] = useAsyncFn(
    async (amount?: number) => {
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });

      try {
        if (isC3(activeCC)) {
          const txResp = await c3.contract.cashout();
          await txResp.wait();
          setButtonStep('submitted');
        } else {
          const txResp = await c2.contract.cashout(toContractInteger(BigNumber.from(amount), c2.info.decimals));
          await txResp.wait();
        }
      } catch (error) {
        console.log(error);
        if (error.code === 4001) {
          setButtonStep('rejected');
        }
      }
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
    },
    [cc]
  );

  const [, burnCredits] = useAsyncFn(
    async (amount: number) => {
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
      try {
        const txResp = await activeCC.contract.burn(toContractInteger(BigNumber.from(amount), activeCC.info.decimals));
        await txResp.wait();
        setButtonStep('submitted');
      } catch (error) {
        if (error.code === 4001) {
          setButtonStep('rejected');
        }
      }
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
    },
    [cc]
  );

  //maybe just tell them the number of credits
  const alertMath = (amount, action) => {
    return contractType === SmartContractType.C2
      ? `CURRENT VALUE: $${amount * fundRatio} - Are you sure you want to ${action} ${amount} credits? `
      : `Are you sure you want to ${action} all funded credits?`;
  };

  const FormButtonText = (action, amount) => {
    const actionDetails = isC3(activeCC)
      ? `${action} all funded Credits`
      : `${action} ${numberWithCommas(amount)} Credits`;
    return !action ? 'choose action' : `${actionDetails}`;
  };

  return (
    <Formik
      initialValues={{
        action: 'cash out',
        amount: null,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.action) {
          errors.action = 'Please select a action';
        }
        if (!isC3(activeCC)) {
          if (values.amount) {
          } else {
            errors.amount = 'Please include an amount';
            if (typeof values.amount !== 'number') errors.amount = 'Amount must be a number';
          }
          return errors;
        }
      }}
      onSubmit={(values, { setSubmitting }) => {
        setButtonStep('submitting');
        if (window.confirm(alertMath(values.amount, values.action))) {
          values.action === 'relinquish' ? burnCredits(values.amount) : cashOut(values.amount);
        } else {
          setButtonStep('rejected');
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <Select className={fieldDiv} required name="action">
            <option value="cash out">Cash Out</option>
            <option value="relinquish">Relinquish</option>
          </Select>
          {!isC3(activeCC) && (
            <Input
              className={fieldDiv}
              labelText="Number of credits"
              name="amount"
              type="number"
              placeholder="344"
              required
            />
          )}
          <button
            type="submit"
            disabled={isSubmitting || !values.action}
            className={cn(
              values.action === 'relinquish' ? 'bg-red-900' : 'bg-blue-900',
              'hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4'
            )}
          >
            <LoadingButtonText
              state={buttonStep}
              //@ts-ignore - ReactSelective strips "value" from the thing it returns.
              //You expect values.recipient.value.[something], but instead get values.recipient.[something]
              idleText={FormButtonText(values.action, values.amount, chainId)}
              submittingText="Deploying (this could take a sec)"
              confirmedText="Submitted"
              rejectedText="You rejected the transaction. Click here to try again."
              failedText="transaction failed"
            />
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ManageCredits;
