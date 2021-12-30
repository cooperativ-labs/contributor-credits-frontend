import FormButton from '../components/buttons/FormButton';
import Input from './components/Inputs';
import React, { useState } from 'react';
import { BigNumber } from 'ethers';
import { C2Type } from '@src/web3/hooks/useC2';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../components/buttons/Button';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { toContractInteger, toHumanNumber } from '@src/web3/util';
import { useAsyncFn } from 'react-use';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

interface FundClassProps {
  c2: C2Type;
}

const FundClass: React.FC<FundClassProps> = ({ c2 }) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  // --- create service ---
  const { totalSupply, bacStaked, decimals: c2Decimals, address } = c2.info;
  const creditsAuthorized = parseInt(toHumanNumber(totalSupply, c2Decimals)._hex);
  const backingCurrency = c2.bacInfo.symbol;
  const getAmountStaked = (c2: C2Type): BigNumber => {
    if (!c2.bacContract || !c2.bacInfo) {
      return BigNumber.from([0]);
    }
    const { decimals: bacDecimals } = c2.bacInfo;
    if (totalSupply.eq(0)) {
      return BigNumber.from([1]);
    }
    return toHumanNumber(bacStaked, bacDecimals);
  };

  const currentAmountStaked = parseInt(getAmountStaked(c2)._hex);
  const maxFund = creditsAuthorized - currentAmountStaked;
  //----------

  const FormButtonText = (amount) => {
    const fundTarget = (amount + currentAmountStaked) / creditsAuthorized;
    return !amount ? 'CHOOSE AMOUNT' : `Fund to ${numberWithCommas(fundTarget * 100, 2)}%`;
  };

  const [, fundCredits] = useAsyncFn(
    async (amount: number) => {
      await c2.bacContract.transfer(address, toContractInteger(BigNumber.from(amount), c2.bacInfo.decimals));
      setButtonStep('confirmed');
    },
    [c2]
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
              setFieldValue('amount', maxFund);
            }}
          >
            Fully Fund
          </FormButton>
          <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
            <LoadingButtonText
              state={buttonStep}
              idleText={FormButtonText(values.amount)}
              submittingText="Deploying (this could take a sec)"
              confirmedText="Confirmed!"
            />
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default FundClass;
