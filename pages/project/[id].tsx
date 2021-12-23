import ContractsPage from '@src/Profiles/Pages/ProjectContracts';
import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import JoinButton from '@src/components/JoinButton';
import Opportunities from '@src/Profiles/Pages/Opportunities/Opportunities';
import ProjectPage from '@src/Profiles/Pages/Project';
import React, { FC } from 'react';
import Team from '@src/Profiles/Pages/Team';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';
import { GetServerSideProps, NextPage } from 'next';
import { initializeApollo } from '@src/utils/apolloClient';
import { Project } from 'types';

interface ResultProps {
  result: Project;
}

const ProjectProfile: NextPage<ResultProps> = ({ result }) => {
  const project = result && result;

  return project ? (
    <div data-test="component-project" className="bg-gray-50">
      <Head>
        <title>{project.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={project.name} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={project.info.shortDescription} />
        <meta
          property="og:image"
          content={
            project.info.sharing
              ? `/assets/images/sharing-images/${project.info.sharing?.image}`
              : '/assets/images/share.png'
          }
        />
        <meta property="og:url" content={`https://cooperativ.io/project/${project.slug}`}></meta>
        {/** Twitter */}
        <meta name="twitter:title" content={project.name} />
        <meta name="twitter:description" content={project.info.shortDescription} />
        <meta
          name="twitter:image"
          content={
            project.info.sharing
              ? `/assets/images/sharing-images/${project.info.sharing?.image}`
              : '/assets/images/share.png'
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <>
        <ProjectPage project={project} />
        <div className="md:hidden">
          <Team project={project} fromInfiniteScroll />
          <Opportunities project={project} fromInfiniteScroll />
          {/* <ContractsPage
              project={project}
              users={users}
              contributorCreditClasses={contributorCreditClasses}
              fromInfiniteScroll
            /> */}
        </div>
        <JoinButton name={project.name} />
      </>
      <Footer color="bg-gray-200" />
    </div>
  ) : null;
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

export default ProjectProfile;
