import ChooseConnectorButton from '../ChooseConnectorButton';
import React, { FC } from 'react';
import {
  GetCcPayments,
  GetPaymentsFromProjectUsers,
  numberWithCommas,
  TotalCreditsWithValue,
} from '@src/utils/helpersMoney';
import { User } from 'types';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

interface RecipientStatsProps {
  user: User;
}

const RecipientStats: FC<RecipientStatsProps> = ({ user }) => {
  const myPayments = GetPaymentsFromProjectUsers(user.projects);
  const creditPayments = GetCcPayments(myPayments && myPayments);
  const myCreditEarnings = TotalCreditsWithValue(creditPayments);
  const { active } = useWeb3React<Web3Provider>();
  if (active) {
    return myCreditEarnings.creditsReceived > 0 ? (
      <div>
        <div>Received: {numberWithCommas(myCreditEarnings.creditsReceived)} Credits</div>
        <div>Current value: {numberWithCommas(myCreditEarnings.totalWorth)}</div>
      </div>
    ) : (
      <></>
    );
  }
  return <ChooseConnectorButton buttonText="Connect wallet to see earnings" />;
};

export default RecipientStats;
