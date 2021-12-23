import classNames from 'classnames';
import React from 'react';

export interface CompensationOfferingDataProps {
  id?: number;
  type?: number;
  title?: string;
  slug?: string;
  description?: string;
  payout?: string;
  primary?: boolean;
}

export interface CompensationOfferingProps {
  className?: string;
  data: CompensationOfferingDataProps;
}

const CompensationOffering: React.FunctionComponent<CompensationOfferingProps> = ({ data, ...props }) => {
  const { className, ...rest } = props;
  return (
    <div data-test="compensation-offering" className={classNames(className)} {...rest}>
      <section
        className={classNames(data.primary ? 'border-green-500' : 'border-gray-300', 'border-2 rounded-xl my-4 p-4')}
      >
        <h2 className={classNames(data.primary ? 'text-green-500' : 'text-gray-500', 'font-semibold text-sm')}>
          {data.title}
        </h2>
        <h1 className="flex-grow md:text-2xl font-bold">{data.slug}</h1>
        {data.payout && <h3 className="text-gray-500 font-semibold text-sm">Payout: {data.payout}</h3>}
        <div className="text-gray-500 text-sm mt-4">{data.description}</div>
      </section>
    </div>
  );
};

export default CompensationOffering;
