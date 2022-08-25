import FormButton from '@src/Manager/components/buttons/FormButton';
import Input from '@src/Manager/forms/components/Inputs';
import PresentLegalText from '@src/Manager/components/PresentLegalText';
import React from 'react';
import { ADD_DOCUMENT } from '@src/utils/dGraphQueries/agreement';
import { Form, Formik } from 'formik';
import { useMutation } from '@apollo/client';

const UpdateAgreementText: React.FC = () => {
  const [updateAgreement, { data, error }] = useMutation(ADD_DOCUMENT);

  console.log(data, error);
  return (
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
          <Input name="agreementId" className={''} labelText="Agreement ID" />
          <Input textArea name="agreementText" className={''} labelText="Agreement Text" />
          <FormButton type="submit" disabled={isSubmitting}>
            Add Agreement
          </FormButton>
          <PresentLegalText agreement={values.agreementText} />
        </Form>
      )}
    </Formik>
  );
};

export default UpdateAgreementText;
