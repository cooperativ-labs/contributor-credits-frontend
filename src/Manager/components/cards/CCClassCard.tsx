import cn from 'classnames';
import React from 'react';
import { C2Type, useC2 } from '@src/web3/hooks/useC2';
import { C3Type, useC3 } from '@src/web3/hooks/useC3';
import { ClassCreditsStats, ClassFundingRatio, ClassFundingStats } from '../ClassStatusBlock';
import { ClassStatus } from '@src/utils/classStatus';
import { ContributorCreditClass, SmartContractType } from 'types';
import { GetClassTriggers } from '@src/utils/helpersCCClass';
import { isC3 } from '@src/web3/util';
import { numberWithCommas } from '@src/utils/helpersMoney';

type ClassCardDetailsProps = ClassCardProps & {
  activeCC: C2Type | C3Type;
};

const _CCClassCard: React.FC<ClassCardDetailsProps> = ({ cClass, isSelected, setSelectedClassId, activeCC }) => {
  const { id, name, triggers, triggerShortDescription, type } = cClass;
  const { triggerFundraising, triggerRevenue } = GetClassTriggers(triggers);
  const { isOwner } = ClassStatus(activeCC);
  const isContractManager = isOwner;
  return (
    <div
      className={cn(
        'border-2 rounded-lg p-3 bg-opacity-10 hover:shadow-md',
        isContractManager && 'bg-emerald-400',
        isSelected && 'bg-blue-300 border-cLightBlue'
      )}
      onClick={() => {
        setSelectedClassId(id);
      }}
    >
      {isContractManager && (
        <div className="inline-block my-2 p-1 px-2 rounded-full bg-emerald-600 text-xs font-semibold text-gray-100 items-center">
          Contract Creator
        </div>
      )}
      <div className="md:grid grid-cols-4 ">
        <div className="font-bold md:font-base col-span-1 self-center">
          <div>
            {name} {type}
          </div>
          {!isC3(activeCC) && <ClassFundingRatio activeCC={activeCC} />}
        </div>
        <div className="col-span-1">
          {triggerFundraising.amount ? (
            <>
              <div>Funding: {numberWithCommas(triggerFundraising.amount)}</div>
              <div>Revenue: {numberWithCommas(triggerRevenue.amount)}</div>
            </>
          ) : (
            <>
              <div>{triggerShortDescription}</div>
            </>
          )}
        </div>
        <div className="col-span-1">{<ClassCreditsStats activeCC={activeCC} />}</div>
        <div className="col-span-1">{<ClassFundingStats activeCC={activeCC} />}</div>
      </div>
    </div>
  );
};

type ClassCardProps = {
  cClass: ContributorCreditClass;
  setSelectedClassId: any;
  isSelected: boolean;
};

const CCClassCard: React.FC<ClassCardProps> = ({ cClass, setSelectedClassId, isSelected }) => {
  const { cryptoAddress, agreement, type } = cClass;

  const memberAddresses = agreement.payments.map((payment) => payment.recipient);
  const activeCC =
    type === SmartContractType.C3
      ? useC3(cryptoAddress.address, memberAddresses)
      : useC2(cryptoAddress.address, memberAddresses);

  return (
    <_CCClassCard cClass={cClass} isSelected={isSelected} setSelectedClassId={setSelectedClassId} activeCC={activeCC} />
  );
};

export default CCClassCard;
