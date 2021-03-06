import gql from 'graphql-tag';
import { CORE_AGREEMENT_FIELDS, CORE_PAYMENT_FIELDS, CORE_USER_FIELDS } from './fragments';

export const CHECK_WALLET_EXIST = gql`
  query ($walletAddress: String!) {
    getCryptoAddress(address: $walletAddress) {
      address
      user {
        uuid
      }
    }
  }
`;

export const GET_CRYPTO_ADDRESS = gql`
  query GetCryptoAddress($walletAddress: String!) {
    getCryptoAddress(address: $walletAddress) {
      id
      user {
        id
        uuid
      }
    }
  }
`;

export const UPDATE_CRYPTO_ADDRESS = gql`
  mutation UpdateCryptoAddress($id: [ID!], $name: String, $public: Boolean) {
    updateCryptoAddress(input: { filter: { id: $id }, set: { name: $name, public: $public } }) {
      cryptoAddress {
        id
        name
        address
        public
        description
        user {
          id
        }
      }
    }
  }
`;

export const GET_CONTRIBUTOR_CREDITS = gql`
  ${CORE_PAYMENT_FIELDS}
  ${CORE_AGREEMENT_FIELDS}
  query GetContributorCredits($id: ID!) {
    getContributorCreditClass(id: $id) {
      id
      description
      triggerShortDescription
      type
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
        ...agreementData
      }
      name
    }
  }
`;

export const GET_AVAILABLE_CONTRACT = gql`
  ${CORE_USER_FIELDS}
  query GetSmartContractUnestablished($id: ID!) {
    getSmartContractUnestablished(id: $id) {
      id
      type
      used
      cryptoAddress {
        address
        protocol
        chainId
      }
      type
      owner {
        ...userData
      }
    }
  }
`;

export const CREATE_UNESTABLISHED_SMART_CONTRACT = gql`
  mutation AddUnestablishedSmartContract(
    $cryptoAddress: String!
    $chainId: Int
    $type: SmartContractType!
    $protocol: CryptoAddressProtocol
    $owner: ID!
  ) {
    addSmartContractUnestablished(
      input: [
        {
          cryptoAddress: { address: $cryptoAddress, type: CONTRACT, chainId: $chainId, protocol: $protocol }
          owner: { id: $owner }
          type: $type
          used: false
        }
      ]
    ) {
      smartContractUnestablished {
        id
        owner {
          id
          unestablishedSmartContracts {
            id
            cryptoAddress {
              id
            }
          }
        }
        cryptoAddress {
          id
          address
          chainId
        }
      }
    }
  }
`;
