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
            address: $availableContractAddress
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
    $agreementId: [ID!]
    $amount: Int64!
    $currencyCode: CurrencyCode!
    $contributorCreditClassID: ID!
    $recipient: String
    $sender: String
    $note: String
  ) {
    updateAgreement(
      input: {
        filter: { id: $agreementId }
        set: {
          payments: {
            amount: $amount
            currency: { code: $currencyCode, contributorCreditClass: { id: $contributorCreditClassID } }
            date: $currentDate
            recipient: $recipient
            sender: $sender
            note: $note
          }
        }
      }
    ) {
      agreement {
        payments {
          ...paymentData
        }
      }
    }
  }
`;

export const GET_AGREEMENTS_THAT_PAID_ME = gql`
  ${CORE_CC_FIELDS}
  ${CORE_PAYMENT_FIELDS}
  query QueryPayment($walletAddress: String) {
    queryPayment(filter: { recipient: { anyofterms: $walletAddress } }) {
      ...paymentData
      agreement {
        organizationName
        contributorCreditClass {
          ...contributorCreditData
        }
        signatories {
          user {
            id
          }
        }
      }
    }
  }
`;
