import FormattedCryptoAddress from './FormattedCryptoAddress';
import ListItemPayment from './ListItemPayment';
import React from 'react';
import { Payment } from 'types';
import { useChainId } from 'wagmi';

type ListProps = {
  payments: Payment[];
};

const PaymentList: React.FC<ListProps> = ({ payments }) => {
  const chainId = useChainId();

  return (
    <div>
      {payments.map((payment, i) => (
        <ListItemPayment
          key={i}
          title={<FormattedCryptoAddress address={payment.recipient} chainId={chainId} withCopy />}
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
