import ContractsPage from '@src/Profiles/Pages/ProjectContracts';
import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import JoinButton from '@src/components/JoinButton';
import React from 'react';
import server from '@src/utils/getServer';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

export interface ContractsProps {
  result: any;
}

const ProjectContracts: NextPage<ContractsProps> = ({ result }) => {
  const router = useRouter();
  const CreditsId = router.query.creditsid;
  let stringClassId;
  if (typeof CreditsId === 'string') {
    stringClassId = parseInt(CreditsId, 10);
  }
  const project = result ? result.project : null;
  const users = result ? result.users : [];
  const contributorCreditClasses = project.credits?.contributorCreditClasses;

  return (
    <div data-test="component-contracts" className="bg-gray-50">
      <Head>
        <title>{project.name} Contracts</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={project.name} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={project.shortDescription} />
        <meta
          property="og:image"
          content={
            project.sharing ? `/assets/images/sharing-images/${project.sharing.image}` : '/assets/images/share.png'
          }
        />
        <meta property="og:url" content={`https://cooperativ.io/project/${project.nameNormalized}/contracts`}></meta>
        {/** Twitter */}
        <meta name="twitter:title" content={project.name} />
        <meta name="twitter:description" content={project.shortDescription} />
        <meta
          name="twitter:image"
          content={
            project.sharing ? `/assets/images/sharing-images/${project.sharing.image}` : '/assets/images/share.png'
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <ContractsPage
        project={project}
        users={users}
        contributorCreditClasses={contributorCreditClasses}
      ></ContractsPage>
      <JoinButton name={project.name} />
      <Footer color="bg-gray-200" />
    </div>
  );
};

ProjectContracts.getInitialProps = async (ctx) => {
  /** Get Project ID from URL Query Params */
  const { id } = ctx.query;
  try {
    const res = await fetch(`${server}/api/mock/project/${id}/`);
    const result = await res.json();
    if (
      !result.project.dynamicDataModules ||
      (result.project.dynamicDataModules && !result.project.dynamicDataModules.pages) ||
      (result.project.dynamicDataModules &&
        result.project.dynamicDataModules.pages &&
        result.project.dynamicDataModules.pages.contracts)
    ) {
      return { result };
    }
    ctx.res.writeHead(301, {
      Location: `/project/${id}`,
    });
    ctx.res.end();
  } catch {
    ctx.res.writeHead(301, {
      Location: '/404',
    });
    ctx.res.end();
    return;
  }
};

export default ProjectContracts;
