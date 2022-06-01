import cn from 'classnames';
import ManageCredits from '../forms/ManageCredits';
import PayCredits, { PayCreditsProps } from '../forms/PayCredits';
import React, { FC, useState } from 'react';

import Button from './buttons/Button';
import CloseButton from './buttons/CloseButton';
import FormChainWarning from './FormChainWarning';
import FundClass from '../forms/FundClass';
import { getEarnedCredits } from '@src/utils/classStatus';
import { isC3 } from '@src/web3/util';
import { SmartContractType } from 'types';

type ClassActionsProps = PayCreditsProps & {
  name: string;
  contractType: SmartContractType;
};

const panelClass = 'relative p-3';
const selected = 'text-white bg-gray-600';
const unselected = 'text-cDarkBlue';
const selectionButtonClass = 'uppercase text-sm font-medium w-full p-3';

const ClassActions: FC<ClassActionsProps> = ({ cc, ccId, chainId, agreementId, contractType }) => {
  const [panelVisible, setPanelVisible] = useState<undefined | 'pay' | 'fund' | 'manage'>(undefined);

  const c2 = cc.c2;
  const c3 = cc.c3;

  if (!c2 && !c3) {
    return <></>;
  }

  const activeCC = c2 ? c2 : c3;

  const isFunded = activeCC.info.isFunded;
  const isOwner = activeCC.info.isOwner;
  const { addrBalances, decimals: c2Decimals } = activeCC.info;
  const creditsEarned = getEarnedCredits(addrBalances, c2Decimals);

  const ActionOptions = (
    <div className="flex justify-between ">
      {isOwner && (
        <>
          {!isFunded && (
            <Button
              className={`${selectionButtonClass} ${panelVisible === 'fund' ? selected : unselected}`}
              onClick={() => setPanelVisible('fund')}
            >
              Fund
            </Button>
          )}
          {!isFunded && (
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
    <div className="mt-8 relative border-2 border-gray-400 rounded-md">
      {ActionOptions}
      {panelVisible && (
        <div className="relative px-2 border-t-2 border-grey-500">
          {panelVisible && (
            <>
              <CloseButton
                onClose={() => setPanelVisible(undefined)}
                className="absolute right-0 top-1 hover:shadow-lg text-gray-800 w-10 h-10 m-2 rounded-full"
              />
            </>
          )}

          {panelVisible === 'fund' && (
            <div className={panelClass}>
              <FundClass cc={cc} />
              <FormChainWarning cc={cc} />
            </div>
          )}
          {panelVisible === 'pay' && (
            <div className={panelClass}>
              <PayCredits cc={cc} ccId={ccId} chainId={chainId} agreementId={agreementId} />
              <FormChainWarning />
            </div>
          )}
          {panelVisible === 'manage' && (
            <div className={panelClass}>
              <ManageCredits cc={cc} chainId={chainId} contractType={contractType} />
              <FormChainWarning />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassActions;
