import React from 'react';
import { ClassCreditsStats, ClassFundingRatio, ClassFundingStats } from '../ClassStatusBlock';
import { ContributorCreditClass } from 'types';
import { GetClassTriggers } from '@src/utils/helpersCCClass';
import { numberWithCommas } from '@src/utils/helpersMoney';

type ClassCardProps = {
  cClass: ContributorCreditClass;
  memberAddresses: string[];
  setSelectedClassId: any;
};

const CCClassCard: React.FC<ClassCardProps> = ({ cClass, setSelectedClassId, memberAddresses }) => {
  const { id, name, triggers, cryptoAddress, triggerShortDescription, type } = cClass;
  const { triggerFundraising, triggerRevenue } = GetClassTriggers(triggers);

  return (
    <div
      className="md:grid grid-cols-4 border-2 rounded-lg p-3 hover:shadow-md"
      onClick={() => {
        setSelectedClassId(id);
      }}
    >
      <div className="font-bold md:font-base col-span-1 self-center">
        {name} {type}
        <ClassFundingRatio cryptoAddress={cryptoAddress.address} memberAddresses={memberAddresses} />
      </div>
      <div className="col-span-1">
        {triggerFundraising.amount ? (
          <>
            <div>Funding: {numberWithCommas(triggerFundraising.amount)}</div>
            <div>Revenue: {numberWithCommas(triggerRevenue.amount)}</div>
          </>
        ) : (
          <>
            <div>{triggerShortDescription}</div>{' '}
          </>
        )}
      </div>
      <div className="col-span-1">
        <ClassCreditsStats cryptoAddress={cryptoAddress.address} memberAddresses={memberAddresses} />
      </div>
      <div className="col-span-1">
        <ClassFundingStats cryptoAddress={cryptoAddress.address} memberAddresses={memberAddresses} />
      </div>
    </div>
  );
};

export default CCClassCard;
