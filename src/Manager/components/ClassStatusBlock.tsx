import Loading from './Loading';
import React from 'react';
import { C2Type } from '@src/web3/hooks/useC2';
import { C3Type } from '@src/web3/hooks/useC3';
import { ClassStatus } from '@src/utils/classStatus';
import { isC3 } from '@src/web3/util';
import { numberWithCommas } from '@src/utils/helpersMoney';

type ClassStatusProps = {
  activeCC: C2Type | C3Type;
};

type ClassStatusBlockProps = ClassStatusProps & {
  isContractManager: boolean;
};

export const ClassFundingRatio: React.FC<ClassStatusProps> = ({ activeCC }) => {
  if (!activeCC) {
    return <Loading />;
  }
  const { creditsAuthorized, fundRatio } = ClassStatus(activeCC);
  return <>{creditsAuthorized > 0 ? `${Math.round(fundRatio * 100)}%` : '0%'} FUNDED</>;
};

export const ClassCreditsStats: React.FC<ClassStatusProps> = ({ activeCC }) => {
  if (!activeCC) {
    return <Loading />;
  }
  const { creditsAuthorized, c2RemainingUnfunded, c3RemainingUnfunded } = ClassStatus(activeCC);
  const remainingUnfunded = isC3(activeCC) ? c3RemainingUnfunded : c2RemainingUnfunded;
  return (
    <>
      <div>Total ever paid: {numberWithCommas(creditsAuthorized)}</div>
      <div>Remaining unfunded: {numberWithCommas(remainingUnfunded)}</div>
    </>
  );
};

export const ClassFundingStats: React.FC<ClassStatusProps> = ({ activeCC }) => {
  if (!activeCC) {
    return <Loading />;
  }
  const { creditsAuthorized, creditsEarned, fundRatio, backingCurrency } = ClassStatus(activeCC);
  return (
    <>
      <div>Current funding: {`${numberWithCommas(fundRatio * creditsAuthorized)} ${backingCurrency} `}</div>
      <div>For me: {`${numberWithCommas(fundRatio * creditsEarned)} ${backingCurrency} `}</div>
    </>
  );
};

const ClassStatusBlock: React.FC<ClassStatusBlockProps> = ({ activeCC, isContractManager }) => {
  if (!activeCC) {
    return <Loading />;
  }

  const {
    creditsAuthorized,
    creditsEarned,
    fundRatio,
    backingCurrency,
    c2RemainingUnfunded,
    c3RemainingUnfunded,
    userAvailableToClaim,
  } = ClassStatus(activeCC);

  const isC2 = !isC3(activeCC);

  const c2Block = (
    <>
      <div>Total paid: {numberWithCommas(creditsAuthorized)}</div>
      {isContractManager && <div>Remaining unfunded: {numberWithCommas(c2RemainingUnfunded)}</div>}
      Credits I hold: {numberWithCommas(creditsEarned)} (value:{' '}
      {`${numberWithCommas(fundRatio * creditsEarned)} ${backingCurrency} `})
    </>
  );
  const c3Block = (
    <div>
      {isContractManager && <div>Remaining unfunded: {numberWithCommas(c3RemainingUnfunded)}</div>} Credits I hold:{' '}
      {numberWithCommas(creditsEarned)}
      <div>Available to claim: {`${numberWithCommas(userAvailableToClaim)} ${backingCurrency} `}</div>
    </div>
  );
  return <div>{isC2 ? c2Block : c3Block}</div>;
};

export default ClassStatusBlock;
