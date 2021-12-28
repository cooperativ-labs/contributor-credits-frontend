import cn from 'classnames';
import React from 'react';
import { ClassCreditsStats, ClassFundingRatio, ClassFundingStats } from '../ClassStatusBlock';
import { ClassStatus } from '@src/utils/classStatus';
import { ContractManager } from '@src/Manager/pages/Dashboard';
import { ContributorCreditClass, User } from 'types';
import { GetClassTriggers } from '@src/utils/helpersCCClass';
import { numberWithCommas } from '@src/utils/helpersMoney';

type ClassCardProps = {
  cClass: ContributorCreditClass;
  user: User;
  setSelectedClassId: any;
};

const CCClassCard: React.FC<ClassCardProps> = ({ cClass, setSelectedClassId, user }) => {
  const { id, name, triggers, triggerShortDescription, type, agreement } = cClass;
  const { triggerFundraising, triggerRevenue } = GetClassTriggers(triggers);
  const memberAddresses = agreement.payments.map((payment) => payment.recipient);
  const { isOwner } = ClassStatus(cClass.address, memberAddresses);

  const isContractManager = isOwner;

  return (
    <div className={cn('border-2 rounded-lg p-3 bg-opacity-10 hover:shadow-md', isContractManager && 'bg-green-400')}>
      {isContractManager && (
        <div className="inline-block my-2 p-1 px-2 rounded-full bg-green-600 text-xs font-semibold text-gray-100 items-center">
          Contract Creator
        </div>
      )}
      <div
        className="md:grid grid-cols-4 "
        onClick={() => {
          setSelectedClassId(id);
        }}
      >
        <div className="font-bold md:font-base col-span-1 self-center">
          {name} {type}
          <ClassFundingRatio cryptoAddress={cClass.address} memberAddresses={memberAddresses} />
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
          <ClassCreditsStats cryptoAddress={cClass.address} memberAddresses={memberAddresses} />
        </div>
        <div className="col-span-1">
          <ClassFundingStats cryptoAddress={cClass.address} memberAddresses={memberAddresses} />
        </div>
      </div>
    </div>
  );
};

export default CCClassCard;
