import gql from 'graphql-tag';
import { CORE_AGREEMENT_FIELDS, CORE_AGREEMENT_SIGNATORY_FIELDS } from './fragments';

export const ADD_CC_AGREEMENT = gql`
  ${CORE_AGREEMENT_FIELDS}
  mutation AddCcAgreement(
    $currentDate: DateTime!
    $projectUserId: ID!
    $ccName: String!
    $ccType: SmartContractType!
    $backingToken: CurrencyCode!
    $availableContractId: [ID!]
    $availableContractAddress: String!
    $protocol: CryptoAddressProtocol!
    $chainId: Int!
    $agreementTitle: String!
    $triggerShortDescription: String
    $triggerCurrency: String
    $financingTriggerAmount: Int64
    $revenueTriggerAmount: Int64
    $agreementText: String!
    $signature: String
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
            cryptoAddress: {
              address: $availableContractAddress
              protocol: $protocol
              chainId: $chainId
              type: CONTRACT
            }
          }
          title: $agreementTitle
          text: $agreementText
          type: CONTRIBUTOR_CREDIT
          signatories: { projectUser: { id: $projectUserId }, signature: $signature, date: $currentDate }
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

export const ADD_SIGNATORY_WITH_PAYMENT = gql`
  ${CORE_AGREEMENT_SIGNATORY_FIELDS}
  mutation AddCcSignatory(
    $currentDate: DateTime!
    $agreementId: ID!
    $projectUserId: ID!
    # $signature: String!
    $amount: Int64!
    $currencyCode: CurrencyCode!
    $contributorCreditClassID: ID!
    $note: String
  ) {
    addAgreementSignatory(
      input: [
        {
          date: $currentDate
          agreement: { id: $agreementId }
          projectUser: { id: $projectUserId }
          payments: {
            amount: $amount
            currency: { code: $currencyCode, contributorCreditClass: { id: $contributorCreditClassID } }
            date: $currentDate
            note: $note
          }
        }
      ]
    ) {
      agreementSignatory {
        ...agreementSignatoryData
      }
    }
  }
`;

export const ADD_CC_PAYMENT = gql`
  ${CORE_AGREEMENT_SIGNATORY_FIELDS}
  mutation AddCcPayment(
    $currentDate: DateTime!
    $signatoryId: [ID!]
    $amount: Int64!
    $currencyCode: CurrencyCode!
    $contributorCreditClassID: ID!
    $note: String
  ) {
    updateAgreementSignatory(
      input: {
        filter: { id: $signatoryId }
        set: {
          payments: {
            amount: $amount
            currency: { code: $currencyCode, contributorCreditClass: { id: $contributorCreditClassID } }
            date: $currentDate
            note: $note
          }
        }
      }
    ) {
      agreementSignatory {
        ...agreementSignatoryData
      }
    }
  }
`;
