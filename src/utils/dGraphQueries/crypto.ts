import gql from 'graphql-tag';
import { CORE_AGREEMENT_FIELDS, CORE_PAYMENT_FIELDS, CORE_USER_FIELDS } from './fragments';

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
  ${CORE_AGREEMENT_FIELDS}
  query GetContributorCredits($id: ID!) {
    getContributorCreditClass(id: $id) {
      id
      description
      name
      triggerShortDescription
      triggers {
        name
        type
        amount
        currency
        primary
      }
      currentFunding
      cryptoAddress
      protocol
      type
      chainId
      backingCurrency
      agreement {
        ...agreementData
      }
    }
  }
`;

export const GET_CC_CONTRACTS = gql`
  ${CORE_AGREEMENT_FIELDS}
  query QueryContributorCreditClass($walletAddresses: [String]) {
    queryContributorCreditClass(filter: { cryptoAddress: $walletAddresses }) {
      id
      triggerShortDescription
      triggers {
        name
        type
        amount
        currency
        primary
      }
      currentFunding
      cryptoAddress
      protocol
      type
      chainId
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
          cryptoAddress: $cryptoAddress
          type: CONTRACT
          chainId: $chainId
          protocol: $protocol
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
        }
        cryptoAddress
        chainId
      }
    }
  }
`;
