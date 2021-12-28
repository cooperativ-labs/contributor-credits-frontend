import gql from 'graphql-tag';
import {
  CORE_AGREEMENT_FIELDS,
  CORE_AGREEMENT_SIGNATORY_FIELDS,
  CORE_CC_FIELDS,
  CORE_PAYMENT_FIELDS,
} from './fragments';

export const ADD_CC_AGREEMENT = gql`
  ${CORE_AGREEMENT_FIELDS}
  mutation AddCcAgreement(
    $currentDate: DateTime!
    $userId: ID!
    $ccName: String!
    $ccType: SmartContractType!
    $backingToken: CurrencyCode!
    $availableContractId: [ID!]
    $availableContractAddress: String!
    $protocol: CryptoAddressProtocol!
    $chainId: Int!
    $agreementTitle: String!
    $organizationName: String!
    $triggerShortDescription: String
    $triggerCurrency: String
    $financingTriggerAmount: Int64
    $revenueTriggerAmount: Int64
    $agreementText: String!
    $signature: String
    $signerAddress: String
  ) {
    addAgreement(
      input: [
        {
          creationDate: $currentDate
          contributorCreditClass: {
            name: $ccName
            type: $ccType
            backingCurrency: $backingToken
            triggers: [
              { name: "Financing", type: FUNDING_RAISED, amount: $financingTriggerAmount, currency: $triggerCurrency }
              { name: "Revenue", type: REVENUE_EARNED, amount: $revenueTriggerAmount, currency: $triggerCurrency }
              { name: "Sale", type: SALE }
            ]
            triggerShortDescription: $triggerShortDescription
            cryptoAddress: $availableContractAddress
            protocol: $protocol
            chainId: $chainId
          }
          title: $agreementTitle
          text: $agreementText
          organizationName: $organizationName
          type: CONTRIBUTOR_CREDIT
          signatories: {
            user: { id: $userId }
            signature: $signature
            signerAddress: $signerAddress
            date: $currentDate
          }
        }
      ]
    ) {
      agreement {
        ...agreementData
      }
    }
    updateSmartContractUnestablished(input: { filter: { id: $availableContractId }, set: { used: true } }) {
      smartContractUnestablished {
        id
        used
        cryptoAddress {
          address
        }
      }
    }
  }
`;

export const ADD_CC_PAYMENT = gql`
  ${CORE_PAYMENT_FIELDS}
  mutation AddCcPayment(
    $currentDate: DateTime!
    $amount: Int64!
    $currencyCode: CurrencyCode!
    $contributorCreditClassID: ID!
    $sender: String!
    $recipient: String!
    $chainId: Int
    $note: String
  ) {
    addPayment(
      input: {
        amount: $amount
        currency: { code: $currencyCode, contributorCreditClass: { id: $contributorCreditClassID } }
        date: $currentDate
        sender: $sender
        recipient: $recipient
        note: $note
      }
    ) {
      payment {
        ...paymentData
      }
    }
  }
`;

export const GET_PAYMENTS_SET = gql`
  ${CORE_PAYMENT_FIELDS}
  query QueryPayment($recipient: String) {
    queryPayment(filter: { recipient: { anyofterms: $recipient } }) {
      amount
    }
  }
`;

// export const GET_PAYMENT_SET = () => {
//   return gql`
//     query
//       queryPayment {
//         amount
//       }
//     }
//   `;
// };
