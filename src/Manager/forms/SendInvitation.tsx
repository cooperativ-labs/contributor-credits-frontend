import React from 'react';
import ReactiveSelect from './components/ReactiveSelect';
import Select from './components/Select';
import { Form, Formik } from 'formik';
import { Input } from './components/Inputs';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

// describe the work
//select compensation type - CC classes, cash, crypto
//Review text

const SendInvitatoin = () => {
  return (
    <Formik
      initialValues={{
        userId: '',
        workDescription: '',
        compensationType: '',
        compensationAmount: '',
        compensationUnit: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.userId) {
          errors.userId = 'Please select a user';
        }
        if (!values.workDescription) {
          errors.workDescription = 'Please set a work description';
        }
        if (!values.compensationType) {
          errors.compensationType = 'Please choose a type of compensation';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const data = {
          userId: values.userId,
          workDescription: values.workDescription,
        };
        alert([data.userId]);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-grow flex-col gap relative">
          <ReactiveSelect options={options} name="userId" labelText="Search for a user" required />
          <Input
            textArea
            className={fieldDiv}
            required
            labelText="Describe the work they will do"
            name="workDescription"
            type="textarea"
            placeholder="Try to be specific"
          />
          <Select className={fieldDiv} required labelText="You will pay" name="compensationType">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CcClass1">Early Contributors</option>
            <option value="CcClass2">Later Contributors</option>
          </Select>
          <Input
            className={fieldDiv}
            labelText="Amount"
            name="compensationAmount"
            type="number"
            placeholder="200"
            required
          />
          <Input className={fieldDiv} labelText="Per" name="compensationUnit" type="text" placeholder="hour" required />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
          >
            Send Invitation
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SendInvitatoin;
