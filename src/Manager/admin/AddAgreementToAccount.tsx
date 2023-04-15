import { useMutation } from '@apollo/client';

import FormButton from '@src/Manager/components/buttons/FormButton';
import Input from '@src/Manager/forms/components/Inputs';
import PresentLegalText from '@src/Manager/components/PresentLegalText';
import React from 'react';
import Select from '@src/Manager/forms/components/Select';
import { ADD_CC_AGREEMENT } from '@src/utils/dGraphQueries/agreement';
import { bacOptions, currencyOptionsExcludeCredits } from '@src/utils/enumConverters';
import { CryptoAddressProtocol } from 'types/index';
import { Form, Formik } from 'formik';
import { SmartContractType } from 'types/index';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const AddAgreementToAccount: React.FC = () => {
  const [createAgreement, { data, error }] = useMutation(ADD_CC_AGREEMENT);

  return (
    <Formik
      initialValues={{
        organizationName: '',
        title: '',
        backingToken: '',
        triggerCurrency: undefined,
        financingTriggerAmount: undefined,
        revenueTriggerAmount: undefined,
        signature: '',
        availableContractId: '',
        agreementText: '',
        userId: '',
        setDate: '',
        setContractAddress: '',
        setChainId: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
      }}
      onSubmit={async (values, { setSubmitting }) => {
        await createAgreement({
          variables: {
            agreementText: values.agreementText,
            userId: values.userId,
            currentDate: values.setDate,
            organizationName: values.organizationName,
            ccName: values.title,
            ccType: SmartContractType.C2,
            backingToken: values.backingToken,
            availableContractId: values.availableContractId,
            availableContractAddress: values.setContractAddress,
            protocol: CryptoAddressProtocol.Eth,
            chainId: values.setChainId,
            agreementTitle: `${values.title} - Contributor Credit Agreement`,
            triggerCurrency: values.triggerCurrency,
            financingTriggerAmount: values.financingTriggerAmount,
            revenueTriggerAmount: values.revenueTriggerAmount,
            signature: values.signature,
          },
        });
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="flex flex-col gap relative">
          <Input name="setContractAddress" className={fieldDiv} labelText="Contract Address" />
          <Input name="availableContractId" className={fieldDiv} labelText="Available Contract Id" />
          <Input type="number" name="setChainId" className={fieldDiv} labelText="Set Chain" />
          <Input name="setDate" className={fieldDiv} labelText="Creation Date" />

          <Input textArea name="agreementText" className={fieldDiv} labelText="Agreement Text" />
          <Input name="userId" className={fieldDiv} labelText="User Id" />
          <Input name="signature" className={fieldDiv} labelText="Signature" />

          <hr className="my-2" />
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
            {bacOptions.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.symbol}
                </option>
              );
            })}
          </Select>

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

          <FormButton type="submit" disabled={isSubmitting}>
            Add Agreement
          </FormButton>
          <PresentLegalText agreement={values.agreementText} />
        </Form>
      )}
    </Formik>
  );
};

export default AddAgreementToAccount;
