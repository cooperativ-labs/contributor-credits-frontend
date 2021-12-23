import gql from 'graphql-tag';
import { CORE_PAYMENT_FIELDS } from './fragments';

export const CHECK_WALLET_EXIST = () => {
  return gql`
    query ($address: String!) {
      getCryptoAddress(address: $address) {
        address
      }
    }
  `;
};

export const GET_CRYPTO_ADDRESS = gql`
  query GetCryptoAddress($walletAddress: String!) {
    getCryptoAddress(address: $walletAddress) {
      id
      user {
        id
      }
    }
  }
`;

export const GET_CONTRIBUTOR_CREDITS = gql`
  ${CORE_PAYMENT_FIELDS}
  query GetContributorCredits($id: ID!) {
    getContributorCreditClass(id: $id) {
      id
      description
      triggerShortDescription
      triggers {
        name
        type
        amount
        currency
        primary
      }
      currentFunding
      cryptoAddress {
        id
        protocol
        type
        name
        chainId
        address
      }
      backingCurrency
      agreement {
        id
        title
        text
        signatories {
          id
          payments {
            ...paymentData
          }
          projectUser {
            id
            user {
              id
              fullName
              displayName
            }
            roles
            project {
              id
              name
            }
            archived
          }
        }
      }
      name
    }
  }
`;

export const GET_AVAILABLE_CONTRACT = gql`
  query GetSmartContractUnestablished($id: ID!) {
    getSmartContractUnestablished(id: $id) {
      id
      type
      cryptoAddress {
        address
        protocol
        chainId
      }
      type
      project {
        id
        slug
        name
        projectUsers {
          id
          user {
            id
          }
        }
        organization {
          displayName
          fullLegalName
          country
          address
          jurisdiction
          type
        }
      }
    }
  }
`;

export const CREATE_UNESTABLISHED_SMART_CONTRACT = gql`
  mutation AddUnestablishedSmartContract(
    $cryptoAddress: String!
    $chainId: Int
    $type: SmartContractType!
    $projectId: ID!
    $protocol: CryptoAddressProtocol
    $owner: ID!
  ) {
    addSmartContractUnestablished(
      input: [
        {
          cryptoAddress: { address: $cryptoAddress, type: CONTRACT, chainId: $chainId, protocol: $protocol }
          project: { id: $projectId }
          owner: { id: $owner }
          type: $type
          used: false
        }
      ]
    ) {
      smartContractUnestablished {
        id
        project {
          id
        }
        cryptoAddress {
          address
          chainId
        }
      }
    }
  }
`;
