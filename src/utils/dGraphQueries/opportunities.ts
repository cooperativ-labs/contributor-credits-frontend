import { gql } from '@apollo/client';

export const ADD_PROJECT_NEED = gql`
  mutation AddProjectNeed($projectSlug: String!, $fill: String!, $value: Int!, $name: String!) {
    updateProject(
      input: { filter: { slug: { eq: $projectSlug } }, set: { needs: { fill: $fill, value: $value, name: $name } } }
    ) {
      project {
        id
        slug
        name
        needs {
          id
          fill
          name
          value
        }
      }
    }
  }
`;

export const REMOVE_PROJECT_NEED = gql`
  mutation RemoveProjectNeed($projectSlug: String!, $needId: ID) {
    updateProject(input: { filter: { slug: { eq: $projectSlug } }, remove: { needs: { id: $needId } } }) {
      project {
        id
        slug
        name
        needs {
          id
          fill
          name
          value
        }
      }
    }
  }
`;

export const ADD_JOB = gql`
  mutation AddJob($projectId: [ID!], $title: String!, $icon: String, $expertiseAdd: [String], $description: String) {
    updateProject(
      input: {
        filter: { id: $projectId }
        set: { jobs: { title: $title, icon: $icon, description: $description, expertise: $expertiseAdd } }
      }
    ) {
      project {
        id
        jobs {
          id
          title
          icon
          expertise
        }
      }
    }
  }
`;

export const UPDATE_JOB = gql`
  mutation UpdateJob(
    $jobId: [ID!]
    $title: String!
    $icon: String
    $description: String
    $expertiseRemove: [String]
    $expertiseAdd: [String]
    $archived: Boolean
  ) {
    updateProjectOpportunitiesJob(
      input: {
        filter: { id: $jobId }
        remove: { expertise: $expertiseRemove }
        set: { title: $title, icon: $icon, description: $description, expertise: $expertiseAdd, archived: $archived }
      }
    ) {
      projectOpportunitiesJob {
        id
        title
        icon
        expertise
        archived
      }
    }
  }
`;

export const ARCHIVE_UNARCHIVE_JOB = () => {
  return gql`
    mutation UpdateJob($jobId: [ID!], $intention: Boolean) {
      updateProjectOpportunitiesJob(input: { filter: { id: $jobId }, set: { archived: $intention } }) {
        job {
          id
          archived
          title
        }
      }
    }
  `;
};
