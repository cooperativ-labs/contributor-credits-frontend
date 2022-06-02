import Loading from './Loading';
import React from 'react';
import { ClassStatus } from '@src/utils/classStatus';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { SmartContractType } from 'types';

type ClassStatusProps = {
  cryptoAddress: string;
  memberAddresses: string[];
  contractType: SmartContractType;
};

type ClassStatusBlockProps = ClassStatusProps & {
  isContractManager: boolean;
};

export const ClassFundingRatio: React.FC<ClassStatusProps> = ({ cryptoAddress, memberAddresses, contractType }) => {
  const { creditsAuthorized, fundRatio, loading } = ClassStatus(cryptoAddress, memberAddresses, contractType);
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return <>{creditsAuthorized > 0 ? `${Math.round(fundRatio * 100)}%` : '0%'} FUNDED</>;
};

export const ClassCreditsStats: React.FC<ClassStatusProps> = ({ cryptoAddress, memberAddresses, contractType }) => {
  const { creditsAuthorized, creditsUnfunded, creditsEarned, loading } = ClassStatus(
    cryptoAddress,
    memberAddresses,
    contractType
  );
  if (loading) {
    return <></>;
  }
  return (
    <>
      <div>Total ever paid: {numberWithCommas(creditsAuthorized)}</div>
      <div>Remaining unfunded: {numberWithCommas(creditsUnfunded)}</div>
      {/* <div>Remaining Credits: {creditsAuthorized - creditsOutstanding}</div> */}
    </>
  );
};

export const ClassFundingStats: React.FC<ClassStatusProps> = ({ cryptoAddress, memberAddresses, contractType }) => {
  const { creditsAuthorized, creditsEarned, fundRatio, backingCurrency, loading } = ClassStatus(
    cryptoAddress,
    memberAddresses,
    contractType
  );
  if (loading) {
    return <></>;
  }
  return (
    <>
      <div>Current funding: {`${numberWithCommas(fundRatio * creditsAuthorized)} ${backingCurrency} `}</div>
      <div>Value of my Credits: {`${numberWithCommas(fundRatio * creditsEarned)} ${backingCurrency} `}</div>
    </>
  );
};

const ClassStatusBlock: React.FC<ClassStatusBlockProps> = ({
  cryptoAddress,
  memberAddresses,
  contractType,
  isContractManager,
}) => {
  const {
    creditsAuthorized,
    creditsEarned,
    fundRatio,
    backingCurrency,
    creditsUnfunded,
    remainingUnfunded,
    currentAmountStaked,
  } = ClassStatus(cryptoAddress, memberAddresses, contractType);

  const isC2 = contractType === SmartContractType.C2;

  const c2Block = (
    <>
      <div>Total paid: {numberWithCommas(creditsAuthorized)}</div>
      {isContractManager && <div>Remaining unfunded: {numberWithCommas(creditsUnfunded)}</div>}
      Credits I hold: {numberWithCommas(creditsEarned)} (value:{' '}
      {`${numberWithCommas(fundRatio * creditsEarned)} ${backingCurrency} `})
    </>
  );
  const c3Block = (
    <div>
      {isContractManager && <div>Remaining unfunded: {numberWithCommas(remainingUnfunded)}</div>} Credits I hold:{' '}
      {numberWithCommas(creditsEarned)}
      <div>Available to claim: {`${numberWithCommas(currentAmountStaked / creditsEarned)} ${backingCurrency} `}</div>
    </div>
  );
  return <div>{isC2 ? c2Block : c3Block}</div>;
};

export default ClassStatusBlock;
