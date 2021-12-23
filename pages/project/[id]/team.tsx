import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import JoinButton from '@src/components/JoinButton';
import React from 'react';
import Team from '@src/Profiles/Pages/Team';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';
import { GetServerSideProps, NextPage } from 'next';
import { initializeApollo } from '@src/utils/apolloClient';
import { Project } from 'types';

interface TeamPageProps {
  result: Project;
}

const TeamPage: NextPage<TeamPageProps> = ({ result }) => {
  const project = result && result;
  const { name, info, slug } = project;

  return (
    <div data-test="component-team" className="bg-gray-50">
      <Head>
        <title>{name}'s Team</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={name} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={info.shortDescription} />
        <meta
          property="og:image"
          content={info.sharing ? `/assets/images/sharing-images/${info.sharing.image}` : '/assets/images/share.png'}
        />
        <meta property="og:url" content={`https://cooperativ.io/project/${slug}/team`} />
        {/** Twitter */}
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={info.shortDescription} />
        <meta
          name="twitter:image"
          content={info.sharing ? `/assets/images/sharing-images/${info.sharing.image}` : '/assets/images/share.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Team project={project} />
      <JoinButton name={name} />
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

export default TeamPage;
