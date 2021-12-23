import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import JoinButton from '@src/components/JoinButton';
import ProjectLayout from '@src/Layouts/ProjectLayout';
import ProjectMember from '@src/Profiles/ProjectMembers/ProjectMember';
import React from 'react';
import { GET_PROJECT } from '@src/utils/dGraphQueries/project';
import { GetServerSideProps, NextPage } from 'next';
import { initializeApollo } from '@src/utils/apolloClient';
import { Project } from 'types';
import { useRouter } from 'next/router';

export interface TeamMemberPageProps {
  result: Project;
}

const TeamMemberPage: NextPage<TeamMemberPageProps> = ({ result }) => {
  const project = result && result;

  const router = useRouter();
  const userId = router.query.userid;
  let stringUserId;
  if (typeof userId === 'string') {
    stringUserId = parseInt(userId, 10);
  }

  const contributor = project.projectUsers.find((projectUser) => projectUser.user.id === userId);

  return (
    <div data-test="page-team-member" className="bg-gray-50">
      <Head>
        <title>
          {project.name} | Contributor | {contributor.user.displayName}
        </title>
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
        <meta property="og:url" content={`https://cooperativ.io/project/${project.slug}/team/member/${userId}`} />
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
      <ProjectLayout project={project} page="Member">
        <ProjectMember contributor={contributor} projectName={project.name} />
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

export default TeamMemberPage;
