import Loading from './Loading';
import React from 'react';
import { ClassStatus } from '@src/utils/classStatus';
import { numberWithCommas } from '@src/utils/helpersMoney';

interface ClassStatusBlockProps {
  cryptoAddress: string;
  memberAddresses: string[];
}

export const ClassFundingRatio: React.FC<ClassStatusBlockProps> = ({ cryptoAddress, memberAddresses }) => {
  const { creditsAuthorized, fundRatio, loading } = ClassStatus(cryptoAddress, memberAddresses);
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div className="text-xs uppercase text-gray-600">
      {creditsAuthorized > 0 ? `${Math.round(fundRatio * 100)}%` : '0%'} FUNDED
    </div>
  );
};

export const ClassCreditsStats: React.FC<ClassStatusBlockProps> = ({ cryptoAddress, memberAddresses }) => {
  const { creditsAuthorized, creditsEarned, loading } = ClassStatus(cryptoAddress, memberAddresses);
  if (loading) {
    return <></>;
  }
  return (
    <>
      <div>Total paid: {numberWithCommas(creditsAuthorized)}</div>
      {/* <div>Remaining Credits: {creditsAuthorized - creditsOutstanding}</div> */}
      <div>Credits I hold: {numberWithCommas(creditsEarned)}</div>
    </>
  );
};
export const ClassFundingStats: React.FC<ClassStatusBlockProps> = ({ cryptoAddress, memberAddresses }) => {
  const { creditsAuthorized, creditsEarned, fundRatio, backingCurrency, loading } = ClassStatus(
    cryptoAddress,
    memberAddresses
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

const ClassStatusBlock: React.FC<ClassStatusBlockProps> = ({ cryptoAddress, memberAddresses }) => {
  return (
    <div>
      <ClassCreditsStats cryptoAddress={cryptoAddress} memberAddresses={memberAddresses} />
      <ClassFundingStats cryptoAddress={cryptoAddress} memberAddresses={memberAddresses} />
    </div>
  );
};

export default ClassStatusBlock;
