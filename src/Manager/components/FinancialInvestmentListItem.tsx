import React, { FC, useState } from 'react';
import useCurrencyFormatter from '@hooks/useCurrency';
import { DELETE_PROJECT_USER_FINANCIAL_INVESTMENT } from '@src/utils/dGraphQueries/projectUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProjectUserFinancialInvestment } from 'types';
import { useMutation } from '@apollo/client';

interface FinancialInvestmentListItemProps {
  investment: ProjectUserFinancialInvestment;
  projectUserId: string;
}

const formatDate = (date) => {
  const formDate = new Date(date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(formDate);
  return `${formDate.getDay()} ${month} ${formDate.getFullYear()}`;
};

const FinancialInvestmentListItem: FC<FinancialInvestmentListItemProps> = ({ investment, projectUserId }) => {
  const { amount, currency } = investment;
  const [updateProjectUserFinancial, { data, error }] = useMutation(DELETE_PROJECT_USER_FINANCIAL_INVESTMENT);
  const [alerted, setAlerted] = useState<boolean>(false);

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }
  if (data && !alerted) {
    alert(`${data.updateProjectUser.projectUser[0].user.displayName} was successfully updated!`);
    setAlerted(true);
  }

  function removeInvestment() {
    setAlerted(false);
    updateProjectUserFinancial({
      variables: {
        projectUserId: projectUserId,
        investmentId: investment.id,
      },
    });
  }

  return (
    <div className="grid grid-cols-9 gap-4 flex items-center my-3 md:w-96 pb-1 border-b-2">
      <div className="col-span-3 font-bold text-gray-600">
        {`${useCurrencyFormatter(amount, currency).amount} ${currency}`}
      </div>
      <div className="col-span-4 md:col-span-4">{formatDate(investment.date)}</div>
      <div className="col-span-1">
        <button
          onClick={(e) => {
            e.preventDefault();
            removeInvestment();
          }}
        >
          <FontAwesomeIcon icon="times" className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default FinancialInvestmentListItem;
