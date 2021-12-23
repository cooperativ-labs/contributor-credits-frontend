import classNames from 'classnames';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { numberWithCommas } from '@src/utils/helpersMoney';

export interface CompensationPackageProps {
  className?: string;
  credits: number;
  shares: number;
}

const CompensationPackage: React.FunctionComponent<CompensationPackageProps> = ({ credits, shares, ...props }) => {
  const { className, ...rest } = props;
  return (
    <div data-test="component-compensation-package" className={classNames(className, 'w-full')} {...rest}>
      <section className="w-full">
        <div className="border-gray-200 border-2 rounded-xl p-2 md:border-0 md:flex md:w-full">
          <div className="flex flex-col items-center my-4 md:my-0 md:flex-grow md:items-start">
            <span className="text-sm text-gray-500">
              <FontAwesomeIcon icon="piggy-bank" className="text-green-500 mr-2" /> Contributor Credits
              <span className="font-bold ml-2">Early Team</span>
            </span>
            <span className="text-3xl font-bold">
              {numberWithCommas(credits)} Credits <FontAwesomeIcon className="text-yellow-500" icon="coins" />
            </span>
          </div>
          {shares ? (
            <div className="flex flex-col items-center my-4 md:my-0 md:flex-grow md:items-start md:border-l-2 md:border-gray-200 md:ml-4 md:pl-4">
              <span className="text-sm text-gray-500">
                <FontAwesomeIcon icon="chart-line" className="text-green-500 mr-2" /> Shares
              </span>
              <span className="text-3xl font-bold">{numberWithCommas(shares)} Shares</span>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default CompensationPackage;
