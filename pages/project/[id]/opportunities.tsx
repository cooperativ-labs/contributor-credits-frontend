import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import JoinButton from '@src/components/JoinButton';
import Opportunities from '@src/Profiles/Pages/Opportunities/Opportunities';
import React from 'react';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';
import { GetServerSideProps, NextPage } from 'next';
import { initializeApollo } from '@src/utils/apolloClient';
import { Project } from 'types';

interface OpportunitiesPageProps {
  result: Project;
}

const OpportunitiesPage: NextPage<OpportunitiesPageProps> = ({ result }) => {
  const project = result && result;

  return (
    <div data-test="page-opportunities" className="bg-gray-50">
      <Head>
        <title>{project.name} Opportunities</title>
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
        <meta property="og:url" content={`https://cooperativ.io/project/${project.slug}/opportunities`} />
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
      <Opportunities project={project} />
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

export default OpportunitiesPage;
