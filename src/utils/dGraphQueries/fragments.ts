import gql from 'graphql-tag';

export const CORE_USER_FIELDS = gql`
  fragment userData on User {
    id
    uuid
    fullName
    profileImage
    walletAddresses {
      id
      address
      name
      public
    }
  }
`;

export const CORE_PAYMENT_FIELDS = gql`
  fragment paymentData on Payment {
    id
    amount
    note
    recipient
    currency {
      code
      contributorCreditClass {
        id
        name
        currentFunding
        backingCurrency
        type
        cryptoAddress {
          id
          address
          protocol
          chainId
        }
      }
    }
    date
  }
`;

export const CORE_CC_FIELDS = gql`
  fragment contributorCreditData on ContributorCreditClass {
    id
    name
    type
    cryptoAddress {
      id
      address
      protocol
      chainId
    }
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
          uuid
        }
      }
      payments {
        ...paymentData
      }
    }
  }
`;

export const CORE_AGREEMENT_FIELDS = gql`
  ${CORE_PAYMENT_FIELDS}
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
        uuid
      }
    }
    payments {
      ...paymentData
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
      ...userData
    }
  }
`;
