import classNames from 'classnames';
import FinancialBlock from '@src/Profiles/Widgets/FinancialBlock';
import React from 'react';

export interface FinancialProps {
  className?: string;
}

const Financial: React.FunctionComponent<FinancialProps> = ({ ...props }) => {
  const { className } = props;

  /**
   * @Todo | @Data
   */
  const data = {
    financial: [
      {
        icon: 'piggy-bank',
        iconColor: 'text-green-500',
        title: 'Personal Investment',
        amount: '$10,000',
      },
      {
        icon: 'user',
        iconColor: 'text-yellow-500',
        title: 'Customers Are Paying Per Month',
        amount: '$15.00',
      },
      {
        icon: 'chart-line',
        iconColor: 'text-blue-500',
        title: 'Current Investment',
        amount: '$0',
      },
    ],
  };

  return (
    <div data-test="component-financial" className={classNames(className)}>
      {data.financial.map((entry, index) => {
        return (
          <FinancialBlock
            key={index}
            icon={entry.icon}
            iconColor={entry.iconColor}
            title={entry.title}
            amount={entry.amount}
          />
        );
      })}
    </div>
  );
};

export default Financial;
