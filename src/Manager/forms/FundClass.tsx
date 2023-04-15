import Button from '@src/components/Buttons/Button';
import FormButton from '../components/buttons/FormButton';
import Input from './components/Inputs';
import React, { useContext, useState } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { BigNumber } from 'ethers';
import { C2Type } from '@src/web3/hooks/useC2';
import { C3Type } from '@src/web3/hooks/useC3';
import { classDetails } from '@src/utils/classStatus';
import { Form, Formik } from 'formik';
import { isC3, toContractInteger } from '@src/web3/util';
import { LoadingButtonStateType, LoadingButtonText } from '../components/buttons/Button';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { useAccount } from 'wagmi';
import { useAsyncFn } from 'react-use';
import { WalletErrorCodes } from '@src/web3/helpersChain';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

type FundClassProps = {
  activeCC: C2Type | C3Type;
};

const FundClass: React.FC<FundClassProps> = ({ activeCC }) => {
  const { address: walletAddress } = useAccount();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletActionLockModalOpen } = applicationStore;

  const { address, backingCurrency, c2RemainingUnfunded, c3RemainingUnfunded } = classDetails(activeCC, walletAddress);

  const remainingUnfunded = isC3(activeCC) ? c3RemainingUnfunded : c2RemainingUnfunded;
  const FormButtonText = (amount) => {
    const fundTarget = amount / remainingUnfunded;
    return !amount ? 'CHOOSE AMOUNT' : `Fund to ${numberWithCommas(fundTarget * 100, 2)}%`;
  };

  const [, fundCredits] = useAsyncFn(
    async (amount: number) => {
      const fundAmount = toContractInteger(BigNumber.from(amount), activeCC.bacInfo.decimals);
      try {
        if (isC3(activeCC)) {
          if (
            window.confirm(
              'NOTE: Funding these Contributor Credits requires **TWO** wallet transactions. Do not leave this page until both have completed.'
            )
          ) {
            dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
            const allowance = await activeCC.bacContract.approve(activeCC.contract.address, fundAmount);
            await allowance.wait();
            try {
              const txResp = await activeCC.contract.fund(fundAmount);
              await txResp.wait();
            } catch (err) {
              alert(
                'There was an error. This sometimes happens when the amount of funds in your wallet are less than the amount you are trying to send to the contract.'
              );
              setButtonStep('failed');
              throw new Error(WalletErrorCodes(err));
            }
            setButtonStep('confirmed');
            // dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
          } else {
            // dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
            setButtonStep('idle');
          }
        } else {
          dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
          const txResp = await activeCC.bacContract.transfer(address, fundAmount);
          await txResp.wait();
          setButtonStep('confirmed');
          // dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
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

  return (
    <Formik
      initialValues={{
        amount: undefined,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.amount) {
          errors.amount = 'Please include an amount';
        } else if (typeof values.amount !== 'number') return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        setButtonStep('submitting');
        await fundCredits(values.amount);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className="flex flex-col gap relative">
          <Input
            className={fieldDiv}
            labelText={`Amount of ${backingCurrency} to pay`}
            name="amount"
            type="number"
            placeholder="344"
            required
          />
          <button
            className="text-xs text-gray-600 -mt-2 hover:text-gray-900"
            type="button"
            disabled={isSubmitting || buttonStep === 'submitting'}
            onClick={(e) => {
              e.preventDefault();
              setFieldValue('amount', remainingUnfunded);
            }}
          >
            Fully Fund
          </button>
          <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
            <LoadingButtonText
              state={buttonStep}
              idleText={FormButtonText(values.amount)}
              submittingText="Funding (this could take a sec)"
              confirmedText="Confirmed!"
              rejectedText="You rejected the transaction. Click here to try again."
              failedText="Looks like something went wrong."
            />
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default FundClass;
