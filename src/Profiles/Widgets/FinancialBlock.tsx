import classNames from 'classnames';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

export interface FinancialBlockProps {
  className?: string;
  icon: string;
  iconColor?: string /** @tailwind_text_color */;
  title: string;
  amount: string;
}

const FinancialBlock: React.FunctionComponent<FinancialBlockProps> = ({ icon, iconColor, title, amount, ...props }) => {
  const { className, ...rest } = props;
  const setIconColor = iconColor ? iconColor : 'text-gray-500';
  return (
    <div data-test="component-financial-block" className={classNames(className, 'flex flex-col my-4')} {...rest}>
      <h1 className="flex text-gray-500 text-sm font-bold">
        <div className={classNames(setIconColor, 'mr-2')}>
          <FontAwesomeIcon icon={icon as IconName} />
        </div>
        {title}
      </h1>
      <h2 className="text-2xl font-bold">{amount}</h2>
    </div>
  );
};

export default FinancialBlock;
