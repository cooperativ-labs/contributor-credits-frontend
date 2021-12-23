import React from 'react';
import { ContributorCreditClassTrigger } from 'types';
import { numberWithCommas } from '@src/utils/helpersMoney';

interface CCClassDescriptionProps {
  projectName: string;
  triggerFundraising: ContributorCreditClassTrigger;
  triggerRevenue: ContributorCreditClassTrigger;
  classShortDescription: string;
}

const DescriptionWithTriggers = ({ projectName, triggerFundraising, triggerRevenue }) => {
  return (
    <div className="font-semibold text-gray-400 mt-4">
      {`${projectName} must fully fund these credits when it raises `}
      <span className="text-green-500 font-bold">
        {numberWithCommas(triggerFundraising.amount)} {triggerFundraising.currency}
      </span>
      , or it reaches{' '}
      <span className="text-green-500 font-bold">
        {numberWithCommas(triggerRevenue.amount)} {triggerRevenue.currency}
      </span>{' '}
      in revenue, or if the business is sold.
    </div>
  );
};

const CCClassDescription: React.FC<CCClassDescriptionProps> = ({
  projectName,
  triggerFundraising,
  triggerRevenue,
  classShortDescription,
}) => {
  if (triggerFundraising.amount && triggerRevenue.amount) {
    return (
      <DescriptionWithTriggers
        projectName={projectName}
        triggerFundraising={triggerFundraising}
        triggerRevenue={triggerRevenue}
      />
    );
  }
  return <div className="font-semibold text-gray-600 mt-4">{classShortDescription}</div>;
};

export default CCClassDescription;
