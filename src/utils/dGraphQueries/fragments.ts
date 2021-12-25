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

export const CORE_AGREEMENT_FIELDS = gql`
  ${CORE_PAYMENT_FIELDS}
  fragment agreementData on Agreement {
    id
    title
    text
    type
    contributorCreditClass {
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
    }
    signatories {
      id
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
      ...user
    }
  }
`;
