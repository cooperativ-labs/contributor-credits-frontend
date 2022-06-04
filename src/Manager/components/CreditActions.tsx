import ManageCredits from '../forms/ManageCredits';
import PayCredits, { PayCreditsProps } from '../forms/PayCredits';
import React, { FC, useState } from 'react';

import Button from './buttons/Button';
import FormChainWarning from './FormChainWarning';
import FundClass from '../forms/FundClass';
import { ClassStatus } from '@src/utils/classStatus';

type CreditActionsProps = PayCreditsProps;

const panelClass = 'p-3';
const selected = 'text-white bg-gray-600';
const unselected = 'text-cDarkBlue';
const selectionButtonClass = 'uppercase text-sm font-medium w-full p-3';

const CreditActions: FC<CreditActionsProps> = ({ activeCC, ccId, chainId, agreementId }) => {
  const [panelVisible, setPanelVisible] = useState<undefined | 'pay' | 'fund' | 'manage'>(undefined);

  const { creditsAuthorized, creditsEarned, isOwner, backingCurrency, isFunded } = ClassStatus(activeCC);
  const isFresh = creditsAuthorized === 0;
  const showFund = !isFunded && !isFresh;
  const showPayFundOnly = !isFunded || isFresh;

  const ActionOptions = (
    <div className="flex justify-between ">
      {isOwner && (
        <>
          {showFund && (
            <Button
              className={`${selectionButtonClass} ${panelVisible === 'fund' ? selected : unselected}`}
              onClick={() => setPanelVisible('fund')}
            >
              Fund
            </Button>
          )}
          {showPayFundOnly && (
            <button
              className={`${selectionButtonClass} ${panelVisible === 'pay' ? selected : unselected}`}
              onClick={() => setPanelVisible('pay')}
            >
              Pay
            </button>
          )}
        </>
      )}
      {creditsEarned ? (
        <button
          className={`${selectionButtonClass} ${panelVisible === 'manage' ? selected : unselected}`}
          onClick={() => setPanelVisible('manage')}
        >
          Manage
        </button>
      ) : (
        <></>
      )}
    </div>
  );

  return (
    <div className="mt-8 border-2 border-gray-400 rounded-md">
      {ActionOptions}
      {panelVisible && (
        <div className="relative px-2 border-t-2 border-grey-500">
          {panelVisible === 'fund' && (
            <div className={panelClass}>
              <FundClass activeCC={activeCC} />
              <FormChainWarning activeCC={activeCC} />
            </div>
          )}
          {panelVisible === 'pay' && (
            <div className={panelClass}>
              <PayCredits activeCC={activeCC} ccId={ccId} chainId={chainId} agreementId={agreementId} />
              <FormChainWarning />
            </div>
          )}
          {panelVisible === 'manage' && (
            <div className={panelClass}>
              <ManageCredits activeCC={activeCC} chainId={chainId} backingCurrency={backingCurrency} />
              <FormChainWarning />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreditActions;
