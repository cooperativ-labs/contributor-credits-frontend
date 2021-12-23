import axios from 'axios';
import MarketingInput from './components/Inputs';
import React from 'react';
import { Form, Formik } from 'formik';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const SettingsUserAccount = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.email) {
          errors.email = 'Please include an email address';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Please set a password';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const data = {
          EMAIL: values.email,
          PWORD: values.password,
        };
        axios
          .post('', {
            ...data,
          })
          .then((res) => {
            setSubmitting(false);
          })
          .catch((err) => {
            setSubmitting(false);
            throw new Error('Error sending form data');
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col relative">
          <h2 className="text-xl text-blue-900 font-semibold">Account</h2>
          <MarketingInput className={fieldDiv} required labelText="Email" name="email" type="email" placeholder="" />
          <MarketingInput
            className={fieldDiv}
            required
            labelText="Password"
            name="password"
            type="password"
            placeholder=""
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsUserAccount;
