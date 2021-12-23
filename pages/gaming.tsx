import FeatureHighlightSection from '@src/MarketingSite/Gaming/FeatureHighlightSection';
import Footer from '@src/Footer/Footer';
import GamesHero from '@src/MarketingSite/Gaming/GamesHero';
import Head from 'next/head';
import MarketingNav from '@src/MarketingSite/MarketingNav';
import OptionsSection from '@src/MarketingSite/Gaming/OptionsSection';
import React from 'react';
import TryCooperativSection from '@src/MarketingSite/Gaming/TryCooperativ';
import { ResultProps } from '@interfaces/types';

const Gaming: React.FC<ResultProps> = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <Head>
        <title>Cooperativ Gaming</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Cooperativ for Gaming" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Use automated agreements with your co-creators and contributors" />
        <meta property="og:image" content="/assets/images/community-funding.png" />
        <meta property="og:url" content="https://cooperativ.io/gaming" />
        {/** Twitter */}
        <meta name="twitter:title" content="Cooperativ for Gaming" />
        <meta
          name="twitter:description"
          content="Use self-enforcing agreements with your co-creators and contributors"
        />
        <meta name="twitter:image" content="/assets/images/community-funding.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <MarketingNav gaming shadow />
      <GamesHero
        title="Let your players fund new features"
        subtitle="Simple crowdfunding tools you can build into your game."
      />
      <OptionsSection />
      <FeatureHighlightSection />
      <TryCooperativSection />
      <Footer color="bg-gray-900" lightText />
    </div>
  );
};

export default Gaming;
