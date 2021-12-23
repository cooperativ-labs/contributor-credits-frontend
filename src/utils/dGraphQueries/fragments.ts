import gql from 'graphql-tag';

export const CORE_PAYMENT_FIELDS = gql`
  fragment paymentData on Payment {
    id
    amount
    note
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
  }
`;

export const CORE_AGREEMENT_SIGNATORY_FIELDS = gql`
  ${CORE_AGREEMENT_FIELDS}
  ${CORE_PAYMENT_FIELDS}
  fragment agreementSignatoryData on AgreementSignatory {
    id
    payments {
      ...paymentData
    }
    agreement {
      ...agreementData
    }
    projectUser {
      project {
        id
      }
    }
  }
`;

export const CORE_PROJECT_INFO_FIELDS = gql`
  fragment projectInfoData on ProjectInfo {
    id
    logo
    shortDescription
    generalDescription
    brandColor
    lightBrand
    category
    intention
    progress
    website
    videoURL
    investmentDescription
    pitchDeck
    sharing {
      image
    }
    documents {
      id
      title
      type
      url
      hidden
    }
    backers {
      name
      logo
      url
      type
    }
  }
`;

export const CORE_USER_FIELDS = gql`
  fragment userData on User {
    id
    fullName
    profileImage
    biography
    expertise
    interests
    walletAddresses {
      id
      address
      name
    }
  }
`;

export const CORE_PROJECT_USER_FIELDS = gql`
  ${CORE_USER_FIELDS}
  ${CORE_AGREEMENT_SIGNATORY_FIELDS}
  fragment projectUserData on ProjectUser {
    id
    archived
    roles
    title
    project {
      id
      name
      slug
    }
    user {
      ...userData
    }
    financialInvestments {
      id
      date
      amount
      currency
    }
    agreements {
      ...agreementSignatoryData
    }
  }
`;
