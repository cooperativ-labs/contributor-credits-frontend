import { useMutation } from '@apollo/client';
import { stringLength } from '@firebase/util';
import { LoadingButtonText } from '@src/Manager/components/buttons/Button';
import FormButton from '@src/Manager/components/buttons/FormButton';
import PresentLegalText from '@src/Manager/components/PresentLegalText';
import Input from '@src/Manager/forms/components/Inputs';
import Select from '@src/Manager/forms/components/Select';
import { ADD_DOCUMENT } from '@src/utils/dGraphQueries/agreement';
import { MatchSupportedChains } from '@src/web3/connectors';
import { Form, Formik } from 'formik';
import { ValuesOfCorrectTypeRule } from 'graphql';
import React from 'react';
import { SmartContractType } from 'types/';

const UpdateAgreementText: React.FC = () => {
  const [updateAgreement, { data: agreementData, error: agreementError }] = useMutation(ADD_DOCUMENT);
  return (
    <>
      <Formik
        initialValues={{
          agreementId: '',
          agreementText: '',
        }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await updateAgreement({
            variables: { agreementId: values.agreementId, agreementText: values.agreementText },
          });
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="flex flex-col gap relative">
            <Input name="agreementId" className={''} />
            <Input name="agreementText" className={''} />
            <FormButton type="submit" disabled={isSubmitting}>
              Add Agreement
            </FormButton>
            <PresentLegalText agreement={values.agreementText} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateAgreementText;
