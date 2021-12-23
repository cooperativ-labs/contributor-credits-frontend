import { CurrencyCode, Payment, ProjectUser } from 'types';
import { liveChain } from '@src/web3/connectors';
import { unique } from './helpersGeneral';
import { useWeb3React } from '@web3-react/core';

export function numberWithCommas(amount: number, decimals = 0) {
  return amount ? amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
}

export const GetPaymentsFromProjectUsers = (projectUsers: ProjectUser[]) => {
  const payments = projectUsers
    .map((pUser) => {
      return pUser.agreements
        .map((agreement) => {
          return agreement.payments;
        })
        .flat();
    })
    .flat();
  return unique(payments);
};

export const GetClassesFromPayments = (payments: Payment[]) => {
  return payments.map((payment) => {
    return payment.currency.contributorCreditClass;
  });
};

export const GetCashPayments = (payments: Payment[]) => {
  return payments.map((payment) => {
    return payment.currency.code !== CurrencyCode.Cc ? payment : null;
  });
};

export const GetCcPayments = (payments: Payment[], classId?: string) => {
  const { chainId } = useWeb3React();
  const saughtClass = (payment) => {
    return classId ? payment.currency.contributorCreditClass.id === classId : true;
  };
  const paymentArray = [];
  payments.map((payment) => {
    if (payment.currency.code === CurrencyCode.Cc && saughtClass(payment)) {
      if (
        chainId
          ? payment.currency.contributorCreditClass.cryptoAddress.chainId === chainId
          : liveChain(payment.currency.contributorCreditClass.cryptoAddress.chainId)
      ) {
        paymentArray.push(payment);
      }
    }
  });
  return paymentArray;
};

export const TotalCreditsWithValue = (ccPayments) => {
  let creditsReceived = 0;
  let totalWorth = 0;
  if (ccPayments) {
    ccPayments.map((payment) => {
      creditsReceived += payment.amount;
      totalWorth += payment.amount * payment.currency.contributorCreditClass.currentFunding;
    });

    return { creditsReceived, totalWorth };
  }
  return;
};

export const AddFinancialInvestmentsAmount = (investments) => {
  let totalAmount = 0;
  investments?.map((investment) => (totalAmount += investment.amount));
  return totalAmount;
};
