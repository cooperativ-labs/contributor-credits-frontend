import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Agreement, Payment, User } from 'types';

export type ClassDetailsType = {
  myPayments: Payment[];
};

const useClassDetails = (agreement: Agreement): ClassDetailsType => {
  const { account } = useWeb3React<Web3Provider>();
  const allPayments = agreement.payments;
  //find payments among this agreement where I am the recipient
  const myPayments = allPayments.filter((payment) => payment.recipient === account);

  const classDetails = {
    myPayments,
  };

  return classDetails;
};

export default useClassDetails;
