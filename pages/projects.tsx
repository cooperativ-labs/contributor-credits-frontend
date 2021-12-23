import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import MarketingNav from '@src/MarketingSite/MarketingNav';
import ProjectFeatures from '@src/MarketingSite/Projects/ProjectFeatures';
import ProjectHero from '@src/MarketingSite/Projects/ProjectHero';
import React from 'react';
import server from '@src/utils/getServer';
import { NextPage } from 'next';
import { ResultProps } from '@interfaces/types';

const Application: NextPage<ResultProps> = ({ result }) => {
  const { projects } = result;
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <Head>
        <title>Cooperativ - Projects & Invitations</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Cooperativ - Projects & Invitations" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Shared projects without incorporation" />
        <meta property="og:image" content="/assets/images/share.png" />
        <meta property="og:url" content="https://cooperativ.io/tools" />
        {/** Twitter */}
        <meta name="twitter:title" content="Cooperativ - Projects & Invitations" />
        <meta name="twitter:description" content="Shared projects without incorporation" />
        <meta name="twitter:image" content="/assets/images/share.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <MarketingNav shadow />
      <ProjectHero />
      <ProjectFeatures projects={projects} />

      <Footer />
    </div>
  );
};

Application.getInitialProps = async (ctx) => {
  /** Get All Projects */
  try {
    const res = await fetch(`${server}/api/mock/projects`);
    const result = await res.json();
    return { result };
  } catch {
    ctx.res.writeHead(301, {
      Location: '/404' /** @TODO : maybe throw an error instead */,
    });
    ctx.res.end();
    return;
  }
};

export default Application;
