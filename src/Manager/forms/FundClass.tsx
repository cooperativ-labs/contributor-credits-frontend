import FormButton from '../components/buttons/FormButton';
import Input from './components/Inputs';
import React, { useContext, useState } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { BigNumber } from 'ethers';
import { C2Type } from '@src/web3/hooks/useC2';
import { C3Type } from '@src/web3/hooks/useC3';
import { Form, Formik } from 'formik';
import { isC3, toContractInteger, toHumanNumber } from '@src/web3/util';
import { LoadingButtonStateType, LoadingButtonText } from '../components/buttons/Button';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { useAsyncFn } from 'react-use';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

interface FundClassProps {
  cc: { c2: C2Type; c3: C3Type };
}

const FundClass: React.FC<FundClassProps> = ({ cc }) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletActionLockModalOpen } = applicationStore;

  const c2 = cc.c2;
  const c3 = cc.c3;
  const activeCC = c2 ? c2 : c3;

  // --- TO DO create service ---
  const { totalSupply, bacStaked, decimals: c2Decimals, address, totalBacNeededToFund } = activeCC.info;
  const { decimals: bacDecimals } = activeCC.bacInfo;
  const creditsAuthorized = parseInt(toHumanNumber(totalSupply, c2Decimals)._hex);
  const backingCurrency = activeCC.bacInfo.symbol;

  const getAmountStaked = (cc: C2Type | C3Type): BigNumber => {
    if (!cc.bacContract || !cc.bacInfo) {
      return BigNumber.from([0]);
    }
    const { decimals: bacDecimals } = cc.bacInfo;
    if (totalSupply.eq(0)) {
      return BigNumber.from([1]);
    }
    return toHumanNumber(bacStaked, bacDecimals);
  };

  const currentAmountStaked = parseInt(getAmountStaked(activeCC)._hex);
  const creditsUnfunded = parseInt(toHumanNumber(totalBacNeededToFund, bacDecimals)._hex);
  //----------

  const FormButtonText = (amount) => {
    const fundTarget = (amount + currentAmountStaked) / creditsAuthorized;
    return !amount ? 'CHOOSE AMOUNT' : `Fund to ${numberWithCommas(fundTarget * 100, 2)}%`;
  };

  const [, fundCredits] = useAsyncFn(
    async (amount: number) => {
      const fundAmount = toContractInteger(BigNumber.from(amount), activeCC.bacInfo.decimals);
      if (isC3(activeCC)) {
        dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
        console.log('isC3');
        const allowance = await c3.bacContract.approve(c3.contract.address, fundAmount);
        await allowance.wait();
        console.log(allowance);
        const txResp = await c3.contract.fund(fundAmount);
        await txResp.wait();
        setButtonStep('confirmed');
        dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
      } else {
        dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
        console.log('isC2');
        const txResp = await c2.bacContract.transfer(address, fundAmount);
        await txResp.wait();
        setButtonStep('confirmed');
        dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
      }
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
          <FormButton
            outlined
            type="button"
            disabled={isSubmitting || buttonStep === 'submitting'}
            onClick={(e) => {
              e.preventDefault();
              setFieldValue('amount', creditsUnfunded);
            }}
          >
            Fully Fund
          </FormButton>
          <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
            <LoadingButtonText
              state={buttonStep}
              idleText={FormButtonText(values.amount)}
              submittingText="Funding (this could take a sec)"
              confirmedText="Confirmed!"
            />
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default FundClass;
