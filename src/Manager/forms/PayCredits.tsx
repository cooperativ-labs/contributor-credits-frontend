import Input from './components/Inputs';
import React, { FC, useState } from 'react';
import { Form, Formik } from 'formik';
import { numberWithCommas } from '@src/utils/helpersMoney';

import FormButton from '../components/buttons/FormButton';
import ReactiveSelect from './components/ReactiveSelect';
import { ADD_CC_PAYMENT } from '@src/utils/dGraphQueries/agreement';
import { AgreementType, CurrencyCode, ProjectUser } from 'types';
import { BigNumber } from '@ethersproject/bignumber';
import { C2Type } from '@src/web3/hooks/useC2';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { LoadingButtonText } from '../components/buttons/Button';
import { toContractInteger } from '@src/web3/util';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const FormButtonText = (member, amount) => {
  return !member || !amount ? 'Pay a team member' : `Pay ${member} ${numberWithCommas(amount, 0)} Credits`;
};

export type PayCreditsProps = {
  members: ProjectUser[];
  c2: C2Type;
  ccId: string;
};

type MemberOptionProps = {
  address: string;
  fullName: string;
  projectUser: ProjectUser;
};

type AgreementOptionProps = {
  value: string;
  label: string;
};

const PayCredits: FC<PayCreditsProps> = ({ members, c2, ccId }) => {
  const [buttonStep, setButtonStep] = useState<'idle' | 'submitting' | 'confirmed'>('idle');
  const [agreementOptions, setAgreementOptions] = useState<AgreementOptionProps[]>(undefined);
  const [addPayment, { data, error }] = useMutation(ADD_CC_PAYMENT);
  const [alerted, setAlerted] = useState<boolean>(false);

  if (error) {
    alert('Oops. Looks like something went wrong');
  }
  if (data && !alerted) {
    alert(`paid `);
    setAlerted(true);
  }

  const memberOptions = members?.map((projectUser) => {
    /** @TODO : let people choose wallet for project */
    //BREAKS when a user does not have a wallet address
    if (projectUser.user.walletAddresses[0]) {
      const walletAddress = projectUser.user.walletAddresses[0].address;
      return {
        value: {
          address: walletAddress,
          fullName: projectUser.user.fullName,
          projectUser: projectUser,
        },
        label: `${projectUser.user.fullName} (...${walletAddress.substr(walletAddress.length - 4)})`,
      };
    }
    return;
  });

  const createAgreementOptions = (member) => {
    const agreementOptions = member.projectUser.agreements.map((agreement) => {
      //here agreement is type AgreementSignatory, which is associated with a type Agreement
      return (
        agreement.agreement.type !== AgreementType.ContributorCredit && {
          value: agreement.id,
          label: agreement.agreement.title,
        }
      );
    });
    setAgreementOptions(agreementOptions);
  };

  const createPayment = (signatoryId: string, amount: number, note: string, currencyCode: CurrencyCode) => {
    addPayment({
      variables: {
        currentDate: currentDate,
        signatoryId: signatoryId,
        amount: amount,
        currencyCode: currencyCode,
        contributorCreditClassID: ccId,
        note: note,
      },
    });
  };

  const [, payCredits] = useAsyncFn(
    async (member: MemberOptionProps, signatoryId: string, amount: number, note: string) => {
      await c2.contract.issue(member.address, toContractInteger(BigNumber.from(amount), c2.info.decimals));
      createPayment(signatoryId, amount, note, CurrencyCode.Cc);
      setButtonStep('confirmed');
    },
    [c2]
  );

  return (
    <Formik
      initialValues={{
        member: memberOptions[0],
        signatoryId: '',
        amount: undefined,
        note: '',
      }}
      validate={(values) => {
        createAgreementOptions(values.member);
        const errors: any = {}; /** @TODO : Shape */
        if (!values.member) {
          errors.member = 'Please select a contract';
        }
        if (!values.signatoryId) {
          errors.signatoryId = 'Please select an agreement';
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
        //@ts-ignore - ReactSelective strips "value" from the thing it returns.
        //You expect values.member.value.[something], but instead get values.member.[something]
        await payCredits(values.member, values.signatoryId, values.amount, values.note);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <ReactiveSelect
            className={fieldDiv}
            options={memberOptions}
            name="member"
            labelText="Select a user"
            required
          />
          {agreementOptions && (
            <ReactiveSelect
              className={fieldDiv}
              options={agreementOptions}
              name="signatoryId"
              labelText="Select an agreement"
              required
            />
          )}
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
              //You expect values.member.value.[something], but instead get values.member.[something]
              idleText={FormButtonText(values.member.fullName, values.amount)}
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
