import { gql } from '@apollo/client';
import { CORE_PROJECT_USER_FIELDS } from './fragments';
import { currentDate } from './gqlUtils';

export const ADD_PROJECT_USER = gql`
${CORE_PROJECT_USER_FIELDS}
  mutation AddProjectUser($projectId: ID!, $role: [ProjectUserRole!], $title: String!, $userId: ID!, $agreementTitle: String!, $agreementText: String ){
     addProjectUser(
       input: {
         project: { id: $projectId }
         roles: $role,
         title: $title
         user: { id: $userId}
         agreements: { 
           agreement: { 
            creationDate: "${currentDate}",
            title: $agreementTitle,
            text: $agreementText
            type: PROJECT_RELATIONSHIP
           }
         }
         archived: false
       }
     ) {
       numUids
       projectUser {
        ...projectUserData
       }
     }
   }
  `;

export const UPDATE_PROJECT_USER = () => {
  return gql`
   mutation (
      $projectUserId: [ID!]
      $role: ProjectUserRole
      $title: String
      $archived: Boolean
    ){
     updateProjectUser(
       input: {
         filter: { id: $projectUserId }
         set: {
           lastUpdate: "${currentDate}"
           roles: $role
           title: $title
           archived: $archived
         }
       }
     ) {
       projectUser {
         id
         title
         archived
         user {
           fullName
         }
         project {
           id
         }
       }
     }
   }
  `;
};

export const UPDATE_PROJECT_USER_SELF_SETTINGS = () => {
  return gql`
   mutation (
      $projectUserId: [ID!]
      $projectLove: String
      $timeCommitment: Int
      $date: DateTime!
    ){
     updateProjectUser(
       input: {
         filter: { id: $projectUserId }
         set: {
          lastUpdate: "${currentDate}"
          projectLove: $projectLove
          timeCommitment: { total: $timeCommitment }
        }
       }
     ) {
       projectUser {
         id
         title
         user {
           fullName
         }
         project {
           id
         }
       }
     }

   }
  `;
};

export const UPDATE_PROJECT_USER_FINANCIAL_INVESTMENT = gql`
    mutation (
      $projectUserId: [ID!]
      $financialInvestmentAmount: Int64!
      $financialInvestmentCurrency: CurrencyCode!
      $date: DateTime!
    ) {
      updateProjectUser(
        input: {
          filter: { id: $projectUserId }
          set: {
            lastUpdate: "${currentDate}"
            financialInvestments: {
              amount: $financialInvestmentAmount
              currency: $financialInvestmentCurrency
              date: $date
            }
          }
        }
      ) {
        projectUser {
          id
          title
          financialInvestments {
            amount
            currency
            date
          }
          user {
            id
            fullName
            displayName
          }
          project {
            id
          }
        }
      }
    }
  `;

export const DELETE_PROJECT_USER = (projectUserInfo) => {
  const { values } = projectUserInfo;

  return gql`
    mutation ($projectUserId: [ID!]) {
      deleteProjectUser(filter: { id: $projectUserId }) {
        numUids
        msg
      }
    }
  `;
};

export const DELETE_PROJECT_USER_FINANCIAL_INVESTMENT = gql`
  mutation DeleteFinancialInvestment($projectUserId: [ID!], $investmentId: ID!) {
    updateProjectUser(
      input: { filter: { id: $projectUserId }, remove: { financialInvestments: { id: $investmentId } } }
    ) {
      projectUser {
        id
        user {
          fullName
          displayName
        }
      }
    }
    deleteProjectUserFinancialInvestment(filter: { id: [$investmentId] }) {
      msg
      numUids
    }
  }
`;
