import Button from '@src/components/Buttons/Button';
import Card from '@src/containers/Card';
import classNames from 'classnames';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { useState } from 'react';

export interface ContributorCreditClassDataProps {
  id: number;
  triggerFundraising: number;
  triggerRevenue: number;
  triggerSale: boolean;
  currentValue: number;
  creditsOutstanding: number;
}

export interface ContributorCreditClassProps {
  className?: string;
  data: ContributorCreditClassDataProps;
  projectName: string;
}

const ContributorCreditClass: React.FunctionComponent<ContributorCreditClassProps> = ({
  projectName,
  data,
  ...props
}) => {
  const [detailsShown, setDetailsShown] = useState(false);
  const { className, ...rest } = props;

  const handleDetailsReveal = () => {
    setDetailsShown(!detailsShown);
  };

  return (
    <div data-test="component-contributor-credit-class" className={classNames(className)} {...rest}>
      <Card className="rounded-xl p-8 mt-4 max-w-lg">
        <h1 className="md:text-xl font-bold">
          Trigger: ${numberWithCommas(data.triggerFundraising)} raised in investment
        </h1>
        <h2 className="text-6xl font-bold mt-4">
          {numberWithCommas(data.creditsOutstanding)}
          <FontAwesomeIcon className="text-yellow-500 ml-4" icon="coins" />
        </h2>
        <h3 className="text-gray-400 mt-4">
          CURRENT VALUE: ${numberWithCommas(data.currentValue * data.creditsOutstanding)} ({' '}
          {Math.round(data.currentValue * 100)}% FUNDED)
        </h3>
        <div className="font-semibold text-gray-400 mt-4">
          {`${projectName} must fully fund these credits when it raises `}
          <span className="text-green-500 font-bold">${numberWithCommas(data.triggerFundraising)}</span>, or it reaches{' '}
          <span className="text-green-500 font-bold">{numberWithCommas(data.triggerRevenue)}</span> in revenue, or if
          the business is sold.
        </div>
        <Button className="w-8 h-8 mt-4 float-right text-gray-400" onClick={handleDetailsReveal}>
          {detailsShown && <FontAwesomeIcon icon="chevron-up" />}
          {!detailsShown && <FontAwesomeIcon icon="chevron-down" />}
        </Button>
        <div className="clear-both" />
        {detailsShown && (
          <div className="border-t-2 border-gray-400 mt-4 py-4 text-gray-400">
            {`${projectName} is obligated to fully fund this class of contributor credits when it reaches any one of the
            triggers listed above. When this happens, each credit will be worth one dollar ($1). Holders of these
            credits will be able to cash them in for an equivalent number of dollars.`}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ContributorCreditClass;
