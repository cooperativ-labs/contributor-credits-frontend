import ManageCredits from '../forms/ManageCredits';
import PayCredits, { PayCreditsProps } from '../forms/PayCredits';
import React, { FC, useState } from 'react';

import FormChainWarning from './FormChainWarning';
import FundClass from '../forms/FundClass';
import StandardButton from './buttons/StandardButton';
import { SmartContractType } from 'types';

type ClassActionsProps = PayCreditsProps & {
  name: string;
  contractType: SmartContractType;
};

const panelClass = 'p-3 border-2 border-gray-400 rounded-md';
const panelTitleClass = 'text-xl mt-3 text-blue-900 font-semibold';
const ClassActions: FC<ClassActionsProps> = ({ cc, name, ccId, chainId, agreementId, contractType }) => {
  const [fundVisible, setFundVisible] = useState(false);
  const [paymentSendVisible, setPaymentSendVisible] = useState(false);
  const [manageCreditsVisible, setManageCreditsVisible] = useState(false);

  const c2 = cc.c2;
  const c3 = cc.c3;

  if (!c2 && !c3) {
    return <></>;
  }

  const isFunded = c2 ? c2.info.isFunded : c3.info.isFunded;
  const isOwner = c2 ? c2.info.isOwner : c3.info.isOwner;

  const CreditManagerActions = (
    <>
      {fundVisible && (
        <div className={panelClass}>
          <h2 className={panelTitleClass}>Fund {name}</h2>
          <FundClass cc={cc} />
          <FormChainWarning cc={cc} />
        </div>
      )}
      {!isFunded && (
        <StandardButton
          className="mt-2 mb-4"
          outlined
          link=""
          color="blue"
          text={fundVisible ? 'Close' : 'Fund Contract'}
          onClick={() => setFundVisible(!fundVisible)}
        />
      )}

      {paymentSendVisible && (
        <div className={panelClass}>
          <h2 className={panelTitleClass}>Send Credits</h2>
          <PayCredits cc={cc} ccId={ccId} chainId={chainId} agreementId={agreementId} />
          <FormChainWarning />
        </div>
      )}
      <StandardButton
        className="mt-2 mb-4"
        outlined
        color="blue"
        text={paymentSendVisible ? 'Close' : 'Pay Credits'}
        onClick={() => setPaymentSendVisible(!paymentSendVisible)}
      />
    </>
  );

  const CreditRecipientActions = (
    <>
      {manageCreditsVisible && (
        <div className={panelClass}>
          <h2 className={panelTitleClass}>Manage Credits</h2>
          <ManageCredits cc={cc} chainId={chainId} contractType={contractType} />
          <FormChainWarning />
        </div>
      )}
      <StandardButton
        className="mt-2 mb-4"
        outlined
        link=""
        color="blue"
        text={manageCreditsVisible ? 'Close' : 'Manage Credits'}
        onClick={() => setManageCreditsVisible(!manageCreditsVisible)}
      />
    </>
  );
  return <div className="mt-10">{cc ? isOwner ? CreditManagerActions : CreditRecipientActions : <></>}</div>;
};

export default ClassActions;
