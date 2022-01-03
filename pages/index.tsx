import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import LandingHeader from '@src/landing/LandingHeader';
import React from 'react';
import { NextPage } from 'next';
import { ResultProps } from '@interfaces/types';
import ContributorCreditsSection from '@src/landing/ContributorCreditsSection';
const Application: NextPage<ResultProps> = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <Head>
        <title>Contributor Credits</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Contributor Credits" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="The best way to compensate early contributors to a project" />
        <meta property="og:image" content="/assets/images/share.png" />
        <meta property="og:url" content="https://contributorcredits.com" />
        {/** Twitter */}
        <meta name="twitter:title" content="Contributor Credits" />
        <meta name="twitter:description" content="The best way to compensate early contributors to a project" />
        <meta name="twitter:image" content="/assets/images/share.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <LandingHeader />
      <ContributorCreditsSection />
      <Footer />
    </div>
  );
};

export default Application;
