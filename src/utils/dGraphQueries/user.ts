import gql from 'graphql-tag';
import { CORE_AGREEMENT_FIELDS } from './fragments';

export const GET_USERS = gql`
  query {
    queryUser {
      id
      fullName
      email
      emailAddresses {
        address
        public
      }
      agreements {
        agreement {
          organizationName
          contributorCreditClass {
            name
            chainId
          }
        }
      }
    }
  }
`;

export const CHECK_EMAIL_TAKEN = gql`
  query CheckEmailTaken($address: String!) {
    getEmailAddress(address: $address) {
      address
    }
  }
`;

export const GET_USER_FROM_EMAIL = gql`
  query GetUserFromEmail($emailAddress: String!) {
    getEmailAddress(address: $address) {
      address
      user {
        id
        uuid
        displayName
        fullName
      }
    }
  }
`;

export const GET_USER = gql`
  ${CORE_AGREEMENT_FIELDS}
  query queryUser($uuid: String!) {
    queryUser(filter: { uuid: { eq: $uuid } }) {
      id
      uuid
      emailAddresses {
        address
        name
        description
        public
        user {
          id
        }
      }
      displayName
      fullName
      profileImage
      biography
      expertise
      interests
      walletAddresses {
        id
        name
        address
        public
        user {
          id
        }
      }
      organizations {
        organization {
          id
          displayName
          fullLegalName
          country
          address
          jurisdiction
          users {
            permission
          }
        }
      }
      agreements {
        agreement {
          ...agreementData
        }
      }
      unestablishedSmartContracts {
        id
        used
        type
        cryptoAddress {
          address
          protocol
          chainId
        }
      }
    }
  }
`;

export const ADD_USER_WITH_WALLET = gql`
  mutation AddUser($currentDate: DateTime!, $walletAddress: String!, $chainId: Int!, $uuid: String!) {
    addUser(
      input: [
        {
          creationDate: $currentDate
          uuid: $uuid
          public: false
          walletAddresses: {
            name: "Primary wallet"
            address: $walletAddress
            protocol: ETH
            chainId: $chainId
            type: WALLET
            public: false
          }
        }
      ]
    ) {
      user {
        id
        uuid
        emailAddresses {
          address
        }
        profileImage
        walletAddresses {
          name
          address
          protocol
          chainId
          type
        }
      }
    }
  }
`;

export const UPDATE_USER_INFORMATION = gql`
  mutation UpdateUser(
    $userId: [ID!]
    $fullName: String
    $displayName: String
    $profileImage: String
    $biography: String
    $expertiseAdd: [String]
    $expertiseRemove: [String]
    $interestsAdd: [String]
    $interestsRemove: [String]
  ) {
    updateUser(
      input: {
        filter: { id: $userId }
        remove: { interests: $interestsRemove, expertise: $expertiseRemove }
        set: {
          displayName: $displayName
          fullName: $fullName
          profileImage: $profileImage
          biography: $biography
          interests: $interestsAdd
          expertise: $expertiseAdd
        }
      }
    ) {
      user {
        id
        fullName
        displayName
        biography
        expertise
        interests
      }
    }
  }
`;

// USER EMAIL

export const ADD_USER_EMAIL = gql`
  mutation AddUserEmail($userId: ID!, $address: String!, $name: String, $description: String, $public: Boolean) {
    addEmailAddress(
      input: { address: $address, user: { id: $userId }, name: $name, description: $description, public: $public }
    ) {
      emailAddress {
        address
        user {
          id
          emailAddresses {
            address
          }
        }
      }
    }
  }
`;

export const REMOVE_USER_EMAIL = gql`
  mutation RemoveUserEmail($userId: [ID!], $emailAddress: String!) {
    updateUser(input: { filter: { id: $userId }, remove: { emailAddresses: { address: $emailAddress } } }) {
      numUids
      user {
        id
        emailAddresses {
          address
        }
      }
    }
    deleteEmailAddress(filter: { address: { eq: $emailAddress } }) {
      msg
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation UpdateUserEmail($address: String!, $name: String, $description: String, $public: Boolean) {
    updateEmailAddress(
      input: { filter: { address: { eq: $address } }, set: { name: $name, description: $description, public: $public } }
    ) {
      emailAddress {
        address
        public
        name
        description
        user {
          id
          walletAddresses {
            address
          }
        }
      }
    }
  }
`;

export const UPDATE_USER_WALLETS = gql`
  mutation UpdateUserWallets(
    $userId: [ID!]
    $name: String
    $walletAddress: String!
    $protocol: CryptoAddressProtocol
    $type: CryptoAddressType
    $chainId: Int
  ) {
    updateUser(
      input: {
        filter: { id: $userId }
        set: {
          walletAddresses: { name: $name, address: $walletAddress, protocol: $protocol, type: $type, chainId: $chainId }
        }
      }
    ) {
      user {
        id
        uuid
        displayName
        walletAddresses {
          name
        }
      }
    }
  }
`;

export const REMOVE_USER_WALLET = gql`
  mutation RemoveUserEmail($userId: [ID!], $walletAddress: String!) {
    updateUser(input: { filter: { id: $userId }, remove: { walletAddresses: { address: $walletAddress } } }) {
      numUids
      user {
        id
        walletAddresses {
          address
        }
      }
    }
    deleteCryptoAddress(filter: { address: { eq: $walletAddress } }) {
      msg
    }
  }
`;
