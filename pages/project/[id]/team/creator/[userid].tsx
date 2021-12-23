import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import JoinButton from '@src/components/JoinButton';
import ProjectCreator from '@src/Profiles/ProjectMembers/ProjectCreator';
import ProjectLayout from '@src/Layouts/ProjectLayout';
import React from 'react';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';
import { GetServerSideProps, NextPage } from 'next';
import { initializeApollo } from '@src/utils/apolloClient';
import { Project } from 'types';
import { useRouter } from 'next/router';

export interface TeamCreatorPageProps {
  result: Project;
}

const TeamCreatorPage: NextPage<TeamCreatorPageProps> = ({ result }) => {
  const project = result && result;

  const router = useRouter();
  const userId = router.query.userid;

  const creator = project.projectUsers.find((projectUser) => projectUser.user.id === userId);

  return (
    <div data-test="page-team-creator" className="g-gray-50">
      <Head>
        {project.name} | Contributor | {creator.user.displayName}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={project.name} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={project.info.shortDescription} />
        <meta
          property="og:image"
          content={
            project.info.sharing
              ? `/assets/images/sharing-images/${project.info.sharing.image}`
              : '/assets/images/share.png'
          }
        />
        <meta property="og:url" content={`https://cooperativ.io/project/${project.slug}}/team/creator/${userId}`} />
        {/** Twitter */}
        <meta name="twitter:title" content={project.name} />
        <meta name="twitter:description" content={project.info.shortDescription} />
        <meta
          name="twitter:image"
          content={
            project.info.sharing
              ? `/assets/images/sharing-images/${project.info.sharing.image}`
              : '/assets/images/share.png'
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <ProjectLayout project={project} page="Creator">
        <ProjectCreator creator={creator} projectName={project.name} />
      </ProjectLayout>

      <JoinButton name={project.name} />
      <Footer color="bg-gray-200" />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  const data = await apolloClient.query({ variables: { projectSlug: params.id }, query: GET_PROJECT });
  const result = data.data.getProject;

  if (!result) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { result },
  };
};

export default TeamCreatorPage;
