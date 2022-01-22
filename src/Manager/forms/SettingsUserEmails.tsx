import Input from './components/Inputs';
import React, { useState } from 'react';
import { ADD_USER_EMAIL } from '../../utils/dGraphQueries/user';
import { checkEmailTaken } from '../../../src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { useMutation } from '@apollo/client';

const fieldDiv = 'md:pt-3 md:my-2 bg-opacity-0';

const SettingsUserEmails = ({ user }) => {
  const [alerted, setAlerted] = useState<boolean>(false);
  const [addUserEmails, { error }] = useMutation(ADD_USER_EMAIL);

  if (error && !alerted) {
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }

  return (
    <Formik
      initialValues={{
        name: '',
        address: '',
        public: false,
      }}
      validate={async (values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.address) {
          errors.address = 'Please include an email address.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.address)) {
          errors.address = 'Invalid email address';
        }
        if (values.address && (await checkEmailTaken(values.address))) {
          errors.address = 'That email address is already taken';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          addUserEmails({
            variables: {
              userId: user.id,
              name: values.name,
              address: values.address.toLowerCase(),
              public: true,
            },
          });
        } catch (err) {}

        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col">
          <hr className="mt-6 mb-8 md:mb-4" />
          <div className="grid md:grid-cols-4 gap-4">
            <Input
              className={`${fieldDiv} w-full md:col-span-3`}
              labelText="Address"
              name="address"
              required
              placeholder="e.g moritz@bonuslife.com"
            />
            <Input
              className={`${fieldDiv} w-full md:col-span-1`}
              labelText="Label"
              name="name"
              placeholder="Personal"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
          >
            Add Email
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsUserEmails;
