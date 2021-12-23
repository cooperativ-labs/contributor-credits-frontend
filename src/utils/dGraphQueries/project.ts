import gql from 'graphql-tag';
import { CORE_PROJECT_INFO_FIELDS, CORE_PROJECT_USER_FIELDS } from './fragments';

export const GET_ID_FROM_SLUG = (slug: string) => {
  return gql`
   query {
    getProject(slug: "${slug}") {
    name
    id
    slug
  }
   }
 `;
};

export const GET_PROJECT = gql`
  ${CORE_PROJECT_INFO_FIELDS}
  ${CORE_PROJECT_USER_FIELDS}
  query GetProject($projectSlug: String!) {
    getProject(slug: $projectSlug) {
      id
      name
      slug
      info {
        ...projectInfoData
      }
      projectUsers {
        ...projectUserData
        timeCommitment {
          total
          byDay {
            sun
            mon
            tue
            wed
            thu
            fri
            sat
          }
        }
      }
      seeking
      needSummary
      needs {
        id
        name
        value
        fill
      }
      jobs {
        id
        title
        icon
        description
        expertise
        compensation
        archived
      }
      organization {
        id
        displayName
        logo
        website
        fullLegalName
        address
        country
        jurisdiction
        type
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

export const ADD_PROJECT = gql`
  ${CORE_PROJECT_INFO_FIELDS}
  ${CORE_PROJECT_USER_FIELDS}
  mutation AddProject(
    $currentDate: DateTime!
    $userId: ID!
    $name: String!
    $slug: String!
    $title: String
    $timeCommitment: Int
    $agreementTitle: String!
    $organizationId: ID!
    $category: ProjectInfoCategory
    $brandColor: String
    $progress: ProjectInfoProgress
    $intention: ProjectInfoIntention
    $shortDescription: String
    $website: String
  ) {
    addProject(
      input: [
        {
          name: $name
          slug: $slug
          lastUpdate: $currentDate
          projectUsers: {
            lastUpdate: $currentDate
            user: { id: $userId }
            roles: [CREATOR]
            title: $title
            timeCommitment: { total: $timeCommitment }
            agreements: { agreement: { title: $agreementTitle, creationDate: $currentDate } }
            archived: false
          }
          organization: { id: $organizationId }
          info: {
            creationDate: $currentDate
            category: $category
            brandColor: $brandColor
            lightBrand: true
            progress: $progress
            intention: $intention
            shortDescription: $shortDescription
            website: $website
          }
        }
      ]
    ) {
      project {
        id
        name
        slug
        info {
          ...projectInfoData
        }
        projectUsers {
          ...projectUserData
        }
      }
    }
  }
`;

export const UPDATE_PROJECT_MAIN_INFO = gql`
  ${CORE_PROJECT_INFO_FIELDS}
  mutation UpdateProjectInfo(
    $currentDate: DateTime
    $projectSlug: String!
    $projectName: String!
    $projectInfoId: [ID!]
    $category: ProjectInfoCategory
    $logo: String
    $shortDescription: String
    $brandColor: String
    $lightBrand: Boolean
    $progress: ProjectInfoProgress
    $intention: ProjectInfoIntention
    $website: String
    $videoURL: String
    $pitchDeck: String
  ) {
    updateProject(
      input: { filter: { slug: { eq: $projectSlug } }, set: { name: $projectName, lastUpdate: $currentDate } }
    ) {
      project {
        id
        name
        slug
        lastUpdate
      }
    }
    updateProjectInfo(
      input: {
        filter: { id: $projectInfoId }
        set: {
          category: $category
          logo: $logo
          shortDescription: $shortDescription
          brandColor: $brandColor
          lightBrand: $lightBrand
          progress: $progress
          intention: $intention
          website: $website
          videoURL: $videoURL
          pitchDeck: $pitchDeck
        }
      }
    ) {
      projectInfo {
        ...projectInfoData
      }
    }
  }
`;

export const UPDATE_PROJECT_FULL_DESCRIPTION = gql`
  ${CORE_PROJECT_INFO_FIELDS}
  mutation UpdateProjectFullDescription(
    $description: String!
    $currentDate: DateTime
    $projectSlug: String!
    $projectInfoId: [ID!]
  ) {
    updateProject(input: { filter: { slug: { eq: $projectSlug } }, set: { lastUpdate: $currentDate } }) {
      project {
        id
        name
        slug
        lastUpdate
      }
    }
    updateProjectInfo(input: { filter: { id: $projectInfoId }, set: { generalDescription: $description } }) {
      projectInfo {
        ...projectInfoData
      }
    }
  }
`;

export const ADD_OR_UPDATE_PROJECT_BACKER = gql`
  mutation AddOrUpdateBacker(
    $projectInfoId: ID!
    $logo: String
    $url: String
    $name: String
    $type: ProjectInfoBackerType
    $organizations: [String]
  ) {
    updateProjectInfo(
      input: {
        filter: { id: $projectInfoId }
        set: { backers: { logo: $logo, url: $url, name: $name, type: $type, organization: { id: $organizations } } }
      }
    ) {
      numUids
      projectInfo {
        id
        backers {
          name
          type
        }
      }
    }
  }
`;

export const ADD_PROJECT_DOCUMENT = gql`
  mutation AddProjectInfoDocument(
    $projectInfoId: [ID!]
    $title: String
    $url: String
    $type: ProjectInfoDocumentType
    $hidden: Boolean
  ) {
    updateProjectInfo(
      input: {
        filter: { id: $projectInfoId }
        set: { documents: { title: $title, url: $url, type: $type, hidden: $hidden } }
      }
    ) {
      numUids
      projectInfo {
        id
        documents {
          id
          title
          type
        }
      }
    }
  }
`;

export const REMOVE_PROJECT_DOCUMENT = gql`
  mutation RemoveProjectInfoDocument($projectInfoId: [ID!], $documentId: ID!) {
    updateProjectInfo(input: { filter: { id: $projectInfoId }, remove: { documents: { id: $id } } }) {
      numUids
      projectInfo {
        id
      }
    }
  }
  mutation DeleteProjectInfoDocument($documentId: ID!) {
    deleteProjectInfoDocument(filter: { id: $id }) {
      msg
    }
  }
`;

export const UPDATE_PROJECT_DOCUMENT = gql`
  mutation UpdateProjectInfoDocument(
    $documentId: [ID!]
    $title: String
    $url: String
    $type: ProjectInfoDocumentType
    $hidden: Boolean
  ) {
    updateProjectInfoDocument(
      input: { filter: { id: $documentId }, set: { title: $title, url: $url, type: $type, hidden: $hidden } }
    ) {
      numUids
      projectInfoDocument {
        id
        title
        type
      }
    }
  }
`;
