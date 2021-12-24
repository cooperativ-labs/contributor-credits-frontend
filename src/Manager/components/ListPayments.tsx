import ListItemPayment from './ListItemPayment';
import React from 'react';
import { Payment } from 'types';

interface ListProps {
  payments: Payment[];
}

const PaymentList: React.FC<ListProps> = ({ payments }) => {
  return (
    <div>
      {payments.map((payment, i) => (
        <ListItemPayment
          key={i}
          title={payment.recipient.walletAddresses[0].address}
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
