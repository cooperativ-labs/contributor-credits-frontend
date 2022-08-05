import Button from '@src/components/Buttons/Button';
import cn from 'classnames';
import Input from './components/Inputs';
import React, { FC, useContext, useState } from 'react';
import Select from './components/Select';
import { ApplicationStoreProps, store } from '@context/store';
import { BigNumber } from '@ethersproject/bignumber';
import { C2Type } from '@src/web3/hooks/useC2';
import { C3Type } from '@src/web3/hooks/useC3';
import { classDetails } from '@src/utils/classStatus';
import { Form, Formik } from 'formik';
import { isC3, toContractInteger } from '@src/web3/util';
import { LoadingButtonStateType, LoadingButtonText } from '../components/buttons/Button';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { useAsyncFn } from 'react-use';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

export type ManageCreditsProps = {
  activeCC: C2Type | C3Type;
  chainId: number;
  backingCurrency: string;
};

const ManageCredits: FC<ManageCreditsProps> = ({ activeCC, chainId, backingCurrency }) => {
  const { account: usersWallet } = useWeb3React<Web3Provider>();
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletActionLockModalOpen } = applicationStore;
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const { fundRatio, userAvailableToClaim, creditsEarned } = classDetails(activeCC, usersWallet);
  const creditValue = userAvailableToClaim.toFixed(0);

  const [, cashOut] = useAsyncFn(
    async (amount?: number) => {
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });

      try {
        if (isC3(activeCC)) {
          const txResp = await activeCC.contract.cashout();
          await txResp.wait();
          setButtonStep('submitted');
        } else {
          const txResp = await activeCC.contract.cashout(
            toContractInteger(BigNumber.from(amount), activeCC.info.decimals)
          );
          await txResp.wait();
        }
      } catch (error) {
        if (error.code === 4001) {
          setButtonStep('rejected');
        }
      }
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
    },
    [activeCC]
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
    [activeCC]
  );

  const alertMath = (amount, action) => {
    const cashoutAmount = numberWithCommas(amount * fundRatio, 3);
    return isC3(activeCC)
      ? `Are you sure you want to ${action} ${action === 'relinquish' ? `${amount}` : `${creditValue}`} credits?`
      : `CURRENT VALUE: ${cashoutAmount} ${backingCurrency} - Are you sure you want to ${action} ${amount} credits? `;
  };

  const manageFormSubmitButton = (values, isSubmitting) => {
    const buttonDisable = (values): boolean => {
      const answer =
        !values.action ||
        (values.action === 'relinquish' && userAvailableToClaim > 0) ||
        userAvailableToClaim < values.amount ||
        creditsEarned < values.amount;
      return answer;
    };

    const formButtonText = (action, amount): string => {
      const baseAction = `${action} ${numberWithCommas(amount)} Credits`;
      const c3Cashout = `Cash out ${creditValue} credits`;
      const c3Relinquish =
        userAvailableToClaim > 0 ? 'You must claim available funding before relinquishing credits' : baseAction;

      if (isC3(activeCC)) {
        return action === 'cash out' ? c3Cashout : c3Relinquish;
      } else if (action) {
        return creditsEarned < amount ? `You can cash out a maximum of ${creditsEarned} credits` : baseAction;
      } else {
        return 'choose action';
      }
    };

    return (
      <Button
        type="submit"
        disabled={isSubmitting || buttonDisable(values)}
        className={cn(
          buttonDisable(values)
            ? 'bg-gray-500 hover:bg-gray-400'
            : values.action === 'relinquish'
            ? 'bg-red-900 hover:bg-red-800'
            : 'bg-blue-900 hover:bg-blue-800',
          ' text-white font-bold uppercase my-8 rounded p-4'
        )}
      >
        <LoadingButtonText
          state={buttonStep}
          idleText={formButtonText(values.action, values.amount)}
          submittingText="Deploying (this could take a sec)"
          confirmedText="Submitted"
          rejectedText="You rejected the transaction. Click here to try again."
          failedText="transaction failed"
        />
      </Button>
    );
  };

  const showAmountField = (action) => !isC3(activeCC) || action === 'relinquish';

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
          {showAmountField(values.action) && (
            <Input
              className={fieldDiv}
              labelText="Number of credits"
              name="amount"
              type="number"
              placeholder="344"
              required
            />
          )}
          {manageFormSubmitButton(values, isSubmitting)}
        </Form>
      )}
    </Formik>
  );
};

export default ManageCredits;
