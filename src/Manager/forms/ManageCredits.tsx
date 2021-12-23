import axios from 'axios';
import cn from 'classnames';
import Input from './components/Inputs';
import React from 'react';
import Select from './components/Select';
import { Form, Formik } from 'formik';
import { numberWithCommas } from '@src/utils/helpersMoney';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const FormButtonText = (action, amount) => {
  const actionWord = action === '1' ? 'Cash In' : 'Relinquish';
  return !action ? 'choose action' : `${actionWord} ${numberWithCommas(amount)} Credits`;
};

const ManageCredits = () => {
  return (
    <Formik
      initialValues={{
        action: '1',
        amount: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.action) {
          errors.action = 'Please select a action';
        }
        if (!values.amount) {
          errors.amount = 'Please include an amount';
        } else if (typeof values.amount !== 'number') return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const data = {
          action: values.action,
          amount: values.amount,
        };
        alert(data);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <Select className={fieldDiv} required name="action">
            <option value="1">Cash-In</option>
            <option value="2">Relinquish</option>
          </Select>
          <Input
            className={fieldDiv}
            labelText="Number of credits"
            name="amount"
            type="number"
            placeholder="344"
            required
          />

          <button
            type="submit"
            disabled={isSubmitting || !values.action}
            className={cn(
              values.action === '2' ? 'bg-red-900' : 'bg-blue-900',
              'hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4'
            )}
          >
            {FormButtonText(values.action, values.amount)}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ManageCredits;
