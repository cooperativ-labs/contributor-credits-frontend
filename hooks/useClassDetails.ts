import { Agreement, Payment, User } from 'types';

export type ClassDetailsType = {
  myPayments: Payment[];
};

const useClassDetails = (user: User, agreement: Agreement): ClassDetailsType => {
  const allPayments = agreement.payments;
  //find payments among this agreement where I am the recipient
  const myPayments = allPayments.filter((payment) => payment.recipient === user);

  const classDetails = {
    myPayments,
  };

  return classDetails;
};

export default useClassDetails;
