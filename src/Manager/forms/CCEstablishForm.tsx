import Checkbox from './components/Checkbox';
import FormButton from '../components/buttons/FormButton';
import FormCard from '../components/cards/FormCard';
import Input from './components/Inputs';
import Link from 'next/link';
import LoadingModal from '../components/ModalLoading';
import PresentLegalText from '../components/PresentLegalText';
import React, { FC, useContext, useState } from 'react';
import Select from './components/Select';
import { ADD_CC_AGREEMENT } from '@src/utils/dGraphQueries/agreement';
import { ApplicationStoreProps, store } from '@context/store';
import { arrayify } from 'ethers/lib/utils';
import { bacOptions, currencyOptionsExcludeCredits } from '@src/utils/enumConverters';
import { C2__factory, C3__factory } from 'types/web3';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../components/buttons/Button';
import { sha256 } from 'js-sha256';
import { SmartContractType, User } from 'types';
import { SmartContractUnestablished } from 'types';
import { TransactionResponse } from '@ethersproject/providers';
import { useChainId, useSigner } from 'wagmi';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

type CCEstablishFormProps = {
  setAgreementContent: any;
  availableContract: SmartContractUnestablished;
  bacAddress?: string;
  agreement: string;
  setCustomText: any;
  user: User;
};

const CCEstablishForm: FC<CCEstablishFormProps> = ({
  setAgreementContent,
  availableContract,
  bacAddress,
  agreement,
  setCustomText,
  user,
}) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletActionLockModalOpen } = applicationStore;
  const chainId = useChainId();
  const [alerted, setAlerted] = useState<boolean>(false);
  const { data: signer } = useSigner();
  const { cryptoAddress, type, id } = availableContract;
  //Feels a bit sketchy getting project from the unestablished contract here

  const [addCcAgreement, { data: agreementData, error: agreementError }] = useMutation(ADD_CC_AGREEMENT);

  const agreementHash = sha256(agreement);

  const contract =
    type === SmartContractType.C2
      ? C2__factory.connect(cryptoAddress.address, signer)
      : C3__factory.connect(cryptoAddress.address, signer);
  const establishContract = async (): Promise<void> => {
    const txResp: TransactionResponse = await contract.establish(bacAddress, arrayify('0x' + agreementHash));
    await txResp.wait();
    return;
  };

  if (agreementError && !alerted) {
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }

  const router = useRouter();
  if (agreementData) {
    router.push(`/app`);
  }

  const emailRequiredNotice = user.emailAddresses.length < 1 && (
    <div className="text-sm text-cRed ">
      An email address is required to establish a new class.{' '}
      <div className="underline">
        <Link href="/app/account">Click here to add one to your account.</Link>
      </div>
    </div>
  );

  const chainBacs = bacOptions.filter((bac) => bac.chainId === chainId);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  return (
    <FormCard small>
      <Formik
        initialValues={{
          customToggle: false,
          organizationName: '',
          title: '',
          backingToken: '',
          triggerCurrency: undefined,
          financingTriggerAmount: undefined,
          revenueTriggerAmount: undefined,
          triggerShortDescription: '',
          triggerText: '',
          email: '',
          signature: '',
        }}
        validate={(values) => {
          setCustomText(values.customToggle);
          setAgreementContent(values);
          const errors: any = {}; /** @TODO : Shape */
          if (!values.organizationName) {
            errors.organizationName =
              'Please enter the name of the organization or individual that will be paying credits';
          }
          if (!values.title) {
            errors.title = 'Please title this class';
          }
          if (!values.email) {
            errors.email = 'Please include an email address';
          }
          if (values.customToggle) {
            if (!values.triggerShortDescription || values.triggerShortDescription.length > 250) {
              errors.triggerShortDescription = 'This description can only be 250 characters';
            }
            if (!values.triggerText) {
              errors.triggerText = 'This description can only be 250 characters';
            }
          } else {
            if (!values.triggerCurrency) {
              errors.triggerCurrency = 'Please select a trigger currency';
            }
            if (!values.backingToken || values.backingToken === '') {
              errors.member = 'Please select a Backing Currency';
            }
            if (!values.financingTriggerAmount || values.financingTriggerAmount < 0) {
              errors.financingTriggerAmount = 'Please give your class a positive Financing Trigger';
            }

            if (!values.revenueTriggerAmount || values.revenueTriggerAmount < 0) {
              errors.revenueTriggerAmount = 'Please give your class a positive Revenue Trigger';
            }
          }
          if (!values.email) {
            errors.email = 'You must select an email address';
          }
          if (!values.signature) {
            errors.signature = 'You must sign this class to establish it';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setAlerted(false);
          setSubmitting(true);
          setButtonStep('submitting');
          dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
          try {
            await establishContract();
            await addCcAgreement({
              variables: {
                userId: user.id,
                currentDate: currentDate,
                organizationName: values.organizationName,
                ccName: values.title,
                ccType: type,
                backingToken: values.backingToken,
                availableContractId: id,
                availableContractAddress: cryptoAddress.address,
                protocol: cryptoAddress.protocol,
                chainId: chainId,
                agreementTitle: `${values.title} - Contributor Credit Agreement`,
                triggerShortDescription: values.triggerShortDescription,
                triggerCurrency: values.triggerCurrency,
                financingTriggerAmount: values.financingTriggerAmount,
                revenueTriggerAmount: values.revenueTriggerAmount,
                agreementText: agreement,
                signature: values.signature,
              },
            });
            setButtonStep('confirmed');
          } catch (error) {
            if (error.code === 4001) {
              setButtonStep('rejected');
            }
          }
          dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col">
            <div className="flex items-end">
              <Checkbox className={fieldDiv} checked={values.customToggle} name="customToggle" />
              <p className="mb-4 ml-2 text-sm text-blue-900 font-semibold text-opacity-80 ">Use custom text</p>
            </div>
            <Input
              className={fieldDiv}
              labelText="Paying organization's full legal name"
              name="organizationName"
              type="text"
              placeholder="e.g. Cooperativ Labs Inc."
              required
            />
            <Input
              className={fieldDiv}
              labelText="Title this class"
              name="title"
              type="text"
              placeholder="e.g. Early Contributors"
              required
            />
            <Select className={fieldDiv} required name="backingToken" labelText="You promise to pay:">
              <option value="">Select backing token</option>;
              {chainBacs.map((option, i) => {
                return (
                  <option key={i} value={option.value}>
                    {option.symbol}
                  </option>
                );
              })}
            </Select>
            {!values.customToggle ? (
              <>
                <Input
                  className={fieldDiv}
                  labelText="Financing Trigger"
                  name="financingTriggerAmount"
                  type="number"
                  placeholder="e.g. 2000000"
                  required
                />
                <Input
                  className={fieldDiv}
                  labelText="Revenue Trigger"
                  name="revenueTriggerAmount"
                  type="number"
                  placeholder="e.g. 700000"
                  required
                />
                <Select className={fieldDiv} required name="triggerCurrency" labelText="Your Triggers described in:">
                  <option value="">Select trigger currency</option>;
                  {currencyOptionsExcludeCredits.map((option, i) => {
                    return (
                      <option key={i} value={option.value}>
                        {option.symbol}
                      </option>
                    );
                  })}
                </Select>
              </>
            ) : (
              <div>
                <Input
                  className={fieldDiv}
                  required
                  labelText="Brief description of triggers"
                  fieldHeight="h-32"
                  textArea
                  name="triggerShortDescription"
                  placeholder="e.g. Sunshine Labs must fund contract after the third full moon."
                />
                <div className="text-sm mt-5">
                  You can add styling to this text using{' '}
                  <span className="underline">
                    <a
                      href="https://rawgit.com/fletcher/human-markdown-reference/master/index.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Markdown
                    </a>
                  </span>
                  .
                </div>
                <Input
                  className={'pt-0 my-2 bg-opacity-0'}
                  required
                  labelText="Define your triggers"
                  fieldHeight="h-96"
                  textArea
                  name="triggerText"
                  placeholder=""
                />
              </div>
            )}
            <div className="md:hidden">
              <PresentLegalText agreement={agreement} />
            </div>
            <Input className={fieldDiv} required name="email" labelText="Email Address" placeholder="you@example.com" />
            {/* <Select className={fieldDiv} required name="email" labelText="Email Address">
              <option value="">Select an email to associate</option>;
              {user.emailAddresses.map((email, i) => {
                return (
                  <option key={i} value={email.address}>
                    {email.address}
                  </option>
                );
              })}
            </Select> 
            {emailRequiredNotice}*/}
            <Input
              className={fieldDiv}
              name="signature"
              type="text"
              placeholder="e.g. Type your full legal name to sign"
              labelText="Signature"
              required
            />
            <div className="text-sm text-blue-900 font-semibold text-opacity-80 mt-4">SHA-256 Hash</div>
            <div className="text-sm break-all">{agreementHash}</div>
            <FormButton
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase mt-8 rounded p-4"
            >
              <LoadingButtonText
                state={buttonStep}
                idleText="Sign & Establish"
                submittingText="Deploying (this could take a sec)"
                confirmedText="Confirmed!"
                rejectedText="You rejected the transaction. Click here to try again."
              />
            </FormButton>
          </Form>
        )}
      </Formik>
    </FormCard>
  );
};

export default CCEstablishForm;
