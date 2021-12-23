import axios from 'axios';
import Button from '@src/components/Buttons/Button';
import Card from '@src/containers/Card';
import CompensationOfferings from '@src/Profiles/Widgets/CompensationOfferings/CompensationOfferings';
import Expertise from '@src/components/Expertise';
import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import JoinButton from '@src/components/JoinButton';
import ProjectLayout from '@src/Layouts/ProjectLayout';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import useIconsPrefix from 'hooks/useIconsPrefix';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';
import { GetServerSideProps, NextPage } from 'next';
import { IconName } from '@fortawesome/fontawesome-common-types';
import { initializeApollo } from '@src/utils/apolloClient';
import { Project } from 'types';
import { useRouter } from 'next/router';

export type OpportunityText = string;

interface TeamPageProps {
  result: Project;
}

const AvailableOpportunity: NextPage<TeamPageProps> = ({ result }) => {
  const router = useRouter();
  const jobId = router.query.roleid;

  const project = result && result;
  const { info, slug } = project;

  const role = project.jobs.find((job) => job.id === jobId);

  return (
    <div data-test="page-available-opportunity" className="bg-gray-50">
      <Head>
        <title>{project.name} Opportunities</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={`We need a ${role.title}`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={info.shortDescription} />
        <meta
          property="og:image"
          content={info.sharing ? `/assets/images/sharing-images/${info.sharing.image}` : '/assets/images/share.png'}
        />
        {/** @TODO : Link to individual opportunities */}
        <meta property="og:url" content={`https://cooperativ.io/project/${slug}/opportunities`} /> {/** Twitter */}
        <meta name="twitter:title" content={`We need a ${role.title}`} />
        <meta name="twitter:description" content={info.shortDescription} />
        <meta
          name="twitter:image"
          content={info.sharing ? `/assets/images/sharing-images/${info.sharing.image}` : '/assets/images/share.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <ProjectLayout project={project} page="Opportunity">
        {role && (
          <section className="p-4 md:p-8 mx-auto" style={{ maxWidth: '1280px' }}>
            <Card className="flex flex-col items-center shadow-none md:shadow-md bg-opacity-0 md:bg-opacity-100 max-w-4xl p-4 pt-12 md:px-20 rounded-xl">
              <div className="rounded-full w-32 h-32 bg-green-500 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={[useIconsPrefix(role.icon), role.icon as IconName]}
                  className="text-7xl text-white"
                />
              </div>
              <h1 className="text-2xl font-bold flex-grow text-left mt-8 mb-4">{role.title}</h1>
              <div className="my-4 prose min-w-full">
                <ReactMarkdown source={role.description} />
              </div>
              <div className="font-bold my-4">{role.title}</div>
              <Expertise showHeader={false} expertise={role.expertise} />
              <hr className="w-full m-8" />
              <h1 className="text-2xl font-bold flex justify-start w-full mb-4">How we are paying contributors:</h1>
              {/* <CompensationOfferings data={project.compensationOfferings} className="" /> */}
              <Button className="p-4 px-8 bg-green-500 font-bold text-white my-10 shadow-lg hover:bg-green-400 rounded">
                {`Contact ${project.name}`}
              </Button>
            </Card>
          </section>
        )}
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
export default AvailableOpportunity;
