import AlphaInvite from '@src/MarketingSite/AlphaInvite';
import ContributorCreditsSection from '@src/MarketingSite/Compensation/ContributorCreditsSection';
import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import HighlightSection from '@src/MarketingSite/HighlightSection';
import MarketingNav from '@src/MarketingSite/MarketingNav';
import React from 'react';
import RevenueShareSection from '@src/MarketingSite/Compensation/RevenueShareSection';
import StandardHero from '@src/MarketingSite/StandardHero';
import { ResultProps } from '@interfaces/types';

const Contracts: React.FC<ResultProps> = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <Head>
        <title>Cooperativ Contracts</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Cooperativ Smart Contracts" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Use automated agreements with your co-creators and contributors" />
        <meta property="og:image" content="/assets/images/money-steps.png" />
        <meta property="og:url" content="https://cooperativ.io/contracts" />
        {/** Twitter */}
        <meta name="twitter:title" content="Cooperativ Smart Contracts" />
        <meta
          name="twitter:description"
          content="Use self-enforcing agreements with your co-creators and contributors"
        />
        <meta name="twitter:image" content="/assets/images/money-steps.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <MarketingNav shadow />
      <StandardHero
        title="Automated agreements with your collaborators."
        subtitle="Give your engineers, designers, and other contributors a stake in your business."
      />
      <ContributorCreditsSection />
      <AlphaInvite />
      <RevenueShareSection />
      <HighlightSection
        title="Cooperativ Project Profiles"
        text="Set up a profile for your project on Cooperativ. You can use it to recruit collaborators from around the world."
        buttonLink="/"
        buttonText="Learn More"
      />
      <Footer />
    </div>
  );
};

export default Contracts;
