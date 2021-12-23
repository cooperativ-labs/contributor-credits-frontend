import ListItemPayment from './ListItemPayment';
import React from 'react';
import { Payment, ProjectUser } from 'types';

interface ListProps {
  payments: Payment[];
  projectLogo: string;
  projectUsers?: ProjectUser[];
}

const PaymentList: React.FC<ListProps> = ({ payments, projectUsers, projectLogo }) => {
  //this is a dumb way to do this and should change
  const getRecipientFromPayment = (payment) => {
    return projectUsers.find((pUser) => {
      return pUser.agreements.find((signatory) => {
        return signatory.payments.includes(payment);
      });
    }).user;
  };
  const getTitle = (payment) => {
    if (projectUsers) {
      return getRecipientFromPayment(payment).fullName;
    }
    return payment.currency.contributorCreditClass ? payment.currency.contributorCreditClass.name : 'Cash payment';
  };
  const getAvatar = (payment) => {
    if (projectUsers) {
      return getRecipientFromPayment(payment).profileImage;
    }
    return projectLogo;
  };

  return (
    <div>
      {payments.map((payment, i) => (
        <ListItemPayment
          key={i}
          imageSrc={getAvatar(payment)}
          title={getTitle(payment)}
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
