import ChooseConnectorButton from '../ChooseConnectorButton';
import React, { FC } from 'react';
import { GET_PAYMENTS } from '@src/utils/dGraphQueries/agreement';
import { numberWithCommas, TotalCreditsWithValue } from '@src/utils/helpersMoney';
import { useQuery } from '@apollo/client';
import { User } from 'types';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

interface RecipientStatsProps {}

const RecipientStats: FC<RecipientStatsProps> = () => {
  const { active, account } = useWeb3React<Web3Provider>();
  const { data } = useQuery(GET_PAYMENTS, { variables: { recipient: account } });
  const paymentsToMe = data?.queryPayment;
  const myCreditEarnings = TotalCreditsWithValue(paymentsToMe && paymentsToMe);

  if (active && paymentsToMe) {
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
