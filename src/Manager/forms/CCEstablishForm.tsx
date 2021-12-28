import Checkbox from './components/Checkbox';
import FormButton from '../components/buttons/FormButton';
import FormCard from '../components/cards/FormCard';
import Input from './components/Inputs';
import LoadingModal from '../components/ModalLoading';
import PresentLegalText from '../components/PresentLegalText';
import React, { FC, useContext, useState } from 'react';
import Select from './components/Select';
import { ADD_CC_AGREEMENT } from '@src/utils/dGraphQueries/agreement';
import { arrayify } from 'ethers/lib/utils';
import { bacOptions, currencyOptionsExcludeCredits } from '@src/utils/enumConverters';
import { C2__factory, C3__factory } from 'types/web3';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../components/buttons/Button';
import { sha256 } from 'js-sha256';
import { SmartContractType } from 'types';
import { SmartContractUnestablished } from 'types';
import { TransactionResponse, Web3Provider } from '@ethersproject/providers';
import { useMutation, useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

interface CCEstablishFormProps {
  setAgreementContent: any;
  availableContract: SmartContractUnestablished;
  bacAddress?: string;
  agreement: string;
  setCustomText: any;
}

const CCEstablishForm: FC<CCEstablishFormProps> = ({
  setAgreementContent,
  availableContract,
  bacAddress,
  agreement,
  setCustomText,
}) => {
  const { chainId, library, account } = useWeb3React<Web3Provider>();
  const [alerted, setAlerted] = useState<boolean>(false);
  const [loadingModal, setLoadingModal] = useState<boolean>(false);
  const signer = library.getSigner();
  const { userId } = useContext(UserContext);
  const { type } = availableContract;
  //Feels a bit sketchy getting project from the unestablished contract here

  const [addCcAgreement, { data: agreementData, error: agreementError }] = useMutation(ADD_CC_AGREEMENT);

  const agreementHash = sha256(agreement);

  const contract =
    type == SmartContractType.C2
      ? C2__factory.connect(availableContract.address, signer)
      : C3__factory.connect(availableContract.address, signer);
  const establishContract = async (): Promise<void> => {
    const txResp: TransactionResponse = await contract.establish(bacAddress, arrayify('0x' + agreementHash));
    await txResp.wait();
    console.log({ established: await contract.isEstablished() });
    return;
  };

  console.log(agreementError);
  if (agreementError && !alerted) {
    alert('Oops. Looks like something went wrong');
    setLoadingModal(false);
    setAlerted(true);
  }

  const router = useRouter();
  if (agreementData && !alerted) {
    setAlerted(true);
    router.push(`/`);
  }

  const chainBacs = bacOptions.filter((bac) => bac.chainId === chainId);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  if (loadingModal) {
    return <LoadingModal />;
  }

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
            if (!values.financingTriggerAmount) {
              errors.financingTriggerAmount = 'Please give your class a Financing Trigger';
            }

            if (!values.revenueTriggerAmount) {
              errors.revenueTriggerAmount = 'Please give your class a Revenue Trigger';
            }
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
          setLoadingModal(true);
          await establishContract();
          await addCcAgreement({
            variables: {
              userId: userId,
              currentDate: currentDate,
              organizationName: values.organizationName,
              ccName: values.title,
              ccType: availableContract.type,
              backingToken: values.backingToken,
              availableContractId: availableContract.id,
              availableContractAddress: availableContract.address,
              protocol: availableContract.protocol,
              chainId: availableContract.chainId,
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
              placeholder="Cooperativ Labs Inc."
              required
            />
            <Input
              className={fieldDiv}
              labelText="Title this class"
              name="title"
              type="text"
              placeholder="Early Contributors"
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
                  placeholder="2000000"
                  required
                />
                <Input
                  className={fieldDiv}
                  labelText="Revenue Trigger"
                  name="revenueTriggerAmount"
                  type="number"
                  placeholder="700000"
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
                  placeholder="Sunshine Labs must fund contract after the third full moon."
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
            <Input
              className={fieldDiv}
              name="signature"
              type="text"
              placeholder="Type your full legal name to sign"
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
              />
            </FormButton>
          </Form>
        )}
      </Formik>
    </FormCard>
  );
};

export default CCEstablishForm;
