import { gql } from '@apollo/client';

export const ADD_ORGANIZATION = gql`
  mutation AddOrganization(
    $userId: ID!
    $displayName: String!
    $logo: String
    $website: String
    $fullLegalName: String!
    $address: String!
    $country: String!
    $jurisdiction: String!
    $type: String!
  ) {
    addOrganization(
      input: [
        {
          users: [{ user: { id: $userId }, permission: ADMIN }]
          displayName: $displayName
          logo: $logo
          website: $website
          fullLegalName: $fullLegalName
          address: $address
          country: $country
          jurisdiction: $jurisdiction
          type: $type
        }
      ]
    ) {
      organization {
        id
        users {
          user {
            id
          }
          permission
        }
        displayName
        logo
        fullLegalName
        address
        country
        jurisdiction
        type
      }
    }
  }
`;
