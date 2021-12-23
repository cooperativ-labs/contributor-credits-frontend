import classNames from 'classnames';
import CompensationOffering, { CompensationOfferingDataProps } from './CompensationOffering';
import React from 'react';

export interface CompensationOfferingsProps {
  className?: string;
  data: CompensationOfferingDataProps[];
}

const CompensationOfferings: React.FunctionComponent<CompensationOfferingsProps> = ({ data, ...props }) => {
  const { className, ...rest } = props;
  const includesCCs =
    data.filter((offering) => {
      return offering.type === 2;
    }).length > 0;

  return (
    <div data-test="compensation-offerings" className={classNames(className, 'mt-4 md:mt-0')} {...rest}>
      {data ? (
        <div>
          {data.map((offering, index) => {
            return <CompensationOffering data={offering} key={offering.id} />;
          })}
        </div>
      ) : null}
      {includesCCs && (
        <span className="text-sm text-gray-500">
          *{' '}
          <span className="hover:underline">
            <a href="/contracts" target="_blank" rel="noreferrer">
              Learn about Contributor Credits
            </a>
          </span>
        </span>
      )}
    </div>
  );
};

export default CompensationOfferings;
