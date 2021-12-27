import CryptoAddress from './CryptoAddress';
import ListItemPayment from './ListItemPayment';
import React from 'react';
import { Payment } from 'types';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

interface ListProps {
  payments: Payment[];
}

const PaymentList: React.FC<ListProps> = ({ payments }) => {
  const { chainId } = useWeb3React<Web3Provider>();

  return (
    <div>
      {payments.map((payment, i) => (
        <ListItemPayment
          key={i}
          title={<CryptoAddress address={payment.recipient} chainId={chainId} withCopy />}
          amount={payment.amount}
          currency={payment.currency.code}
          date={payment.date}
          note={payment.note}
        />
      ))}
    </div>
  );
};

export default PaymentList;
