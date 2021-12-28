import gql from 'graphql-tag';

export const CORE_USER_FIELDS = gql`
  fragment userData on User {
    id
    fullName
    profileImage
    walletAddresses {
      id
      address
      name
    }
  }
`;

export const CORE_PAYMENT_FIELDS = gql`
  fragment paymentData on Payment {
    id
    amount
    note
    date
    sender
    recipient
    currency {
      code
      contributorCreditClass {
        id
        name
        currentFunding
        backingCurrency
        type
        cryptoAddress
        protocol
        chainId
      }
    }
  }
`;

export const CORE_CC_FIELDS = gql`
  fragment contributorCreditData on ContributorCreditClass {
    id
    name
    type
    cryptoAddress
    protocol
    chainId
    backingCurrency
    description
    triggerShortDescription
    triggers {
      amount
      currency
      name
      type
    }
    agreement {
      organizationName
      signatories {
        user {
          id
        }
      }
    }
  }
`;

export const CORE_AGREEMENT_FIELDS = gql`
  ${CORE_CC_FIELDS}
  fragment agreementData on Agreement {
    id
    title
    text
    type
    organizationName
    contributorCreditClass {
      ...contributorCreditData
    }
    signatories {
      id
      user {
        id
      }
    }
  }
`;

export const CORE_AGREEMENT_SIGNATORY_FIELDS = gql`
  ${CORE_AGREEMENT_FIELDS}
  ${CORE_USER_FIELDS}
  fragment agreementSignatoryData on AgreementSignatory {
    id
    agreement {
      ...agreementData
    }
    user {
      ...user
    }
  }
`;
