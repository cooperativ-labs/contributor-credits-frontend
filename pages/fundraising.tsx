import Footer from '@src/Footer/Footer';
import FundingOptionsSection from '@src/MarketingSite/Fundraising/FundingOptionsSection';
import Head from 'next/head';
import MarketingNav from '@src/MarketingSite/MarketingNav';
import React from 'react';
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
        title="Raise funding from your fans."
        subtitle="Simple crowdfunding, vote-funding, and fan-funding tools to get your project to the next level"
      />
      <FundingOptionsSection />
      <Footer />
    </div>
  );
};

export default Contracts;
