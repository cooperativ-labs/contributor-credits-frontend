import Datepicker from './components/Datepicker';
import FinancialInvestmentListItem from '../components/FinancialInvestmentListItem';
import FormButton from '../components/buttons/FormButton';
import React, { FC, useState } from 'react';
import Select from './components/Select';
import { currencyOptionsExcludeCredits } from '@src/utils/enumConverters';
import { Form, Formik } from 'formik';
import { Input } from './components/Inputs';
import { ProjectUser } from 'types';
import { rfc3339 } from '@src/utils/dGraphQueries/gqlUtils';
import { UPDATE_PROJECT_USER_FINANCIAL_INVESTMENT } from '@src/utils/dGraphQueries/projectUser';
import { useMutation } from '@apollo/client';

const fieldDiv = 'pt-3 bg-opacity-0';

interface SettingsProjectUserFinancialInvestmentProps {
  projectUser?: ProjectUser;
}

const SettingsProjectUserFinancialInvestment: FC<SettingsProjectUserFinancialInvestmentProps> = ({ projectUser }) => {
  const [updateProjectUserFinancial, { data, error }] = useMutation(UPDATE_PROJECT_USER_FINANCIAL_INVESTMENT);
  const [alerted, setAlerted] = useState<boolean>(false);

  if (error && !alerted) {
    alert('Oops. Looks like something went wrong');
  }
  if (data && !alerted) {
    alert(`${data.updateProjectUser.projectUser[0].user.displayName} was successfully updated!`);
  }

  return (
    <Formik
      initialValues={{
        financialInvestmentAmount: '',
        financialInvestmentCurrency: '',
        date: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.financialInvestmentAmount) {
          errors.name = 'Please set an amount';
        }
        if (!values.financialInvestmentCurrency || values.financialInvestmentCurrency === '') {
          errors.name = 'Please set a currency';
        }
        if (!values.date || values.date === '') {
          errors.name = 'Please set a date';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        updateProjectUserFinancial({
          variables: {
            projectUserId: projectUser.id,
            financialInvestmentAmount: values.financialInvestmentAmount,
            financialInvestmentCurrency: values.financialInvestmentCurrency,
            date: rfc3339(values.date),
          },
        });
        setAlerted(false);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="">
          <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">Financial Investments</h2>
          {projectUser.financialInvestments.map((investment, i) => {
            return (
              <div className="mb-3" key={i}>
                <FinancialInvestmentListItem key={i} investment={investment} projectUserId={projectUser.id} />
              </div>
            );
          })}
          <div className="md:grid grid-cols-6 gap-4">
            <div className="col-span-3">
              <Input
                className={fieldDiv}
                labelText="Amount invested"
                name="financialInvestmentAmount"
                type="number"
                placeholder="500"
              />
            </div>
            <div className="col-span-1">
              <Select className={fieldDiv} labelText="Currency" name="financialInvestmentCurrency">
                <option value="">Select currency</option>;
                {currencyOptionsExcludeCredits.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.symbol}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div className="col-span-2">
              <Datepicker className={fieldDiv} labelText="Date of investment" name="date" />
            </div>
          </div>
          <FormButton
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4 w-full"
          >
            {`Update Investments`}
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsProjectUserFinancialInvestment;
