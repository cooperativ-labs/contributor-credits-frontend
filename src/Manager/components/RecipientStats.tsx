import ChooseConnectorButton from '../ChooseConnectorButton';
import React, { FC } from 'react';
import { GET_AGREEMENTS_THAT_PAID_ME } from '@src/utils/dGraphQueries/agreement';
import { numberWithCommas, TotalCreditsWithValue } from '@src/utils/helpersMoney';
import { useAccount } from 'wagmi';
import { useQuery } from '@apollo/client';

const RecipientStats: FC = () => {
  const { address: walletAddress } = useAccount();
  const { data } = useQuery(GET_AGREEMENTS_THAT_PAID_ME, { variables: { walletAddress: walletAddress } });
  const paymentsToMe = data?.queryPayment;
  const myCreditEarnings = TotalCreditsWithValue(paymentsToMe && paymentsToMe);

  if (walletAddress && paymentsToMe) {
    return myCreditEarnings.creditsReceived > 0 ? (
      <>
        <hr className="my-5" />
        <div className="mt-6">
          <div>Received: {numberWithCommas(myCreditEarnings.creditsReceived)} Credits</div>
          <div>Current value: {numberWithCommas(myCreditEarnings.totalWorth)}</div>
        </div>
      </>
    ) : (
      <></>
    );
  }
  return <ChooseConnectorButton buttonText="Connect wallet to see earnings" />;
};

export default RecipientStats;
