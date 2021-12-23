import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import HeroSection from '@src/MarketingSite/Home/HomeHero';
import MarketingNav from '@src/MarketingSite/MarketingNav';
import React from 'react';
import server from '@src/utils/getServer';
import { GetStaticProps, NextPage } from 'next';
import { ResultProps } from '@interfaces/types';
import HomeBenefits from '@src/MarketingSite/Home/HomeBenefits';
import HomeHowItWorks from '@src/MarketingSite/Home/HomeHowItWorks';
import HomeCaseStudy from '@src/MarketingSite/Home/HomeCaseStudy';

const Application: NextPage<ResultProps> = ({ result }) => {
  const { projects } = result;

  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <Head>
        <title>Cooperativ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Cooperativ" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Get started without incorporating" />
        <meta property="og:image" content="/assets/images/share.png" />
        <meta property="og:url" content="https://cooperativ.io" />
        {/** Twitter */}
        <meta name="twitter:title" content="Cooperativ" />
        <meta name="twitter:description" content="Get started without incorporating" />
        <meta name="twitter:image" content="/assets/images/share.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <MarketingNav />
      <HeroSection />
      <HomeBenefits projects={projects} />
      <HomeHowItWorks />
      {/* <HomeCaseStudy /> */}
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${server}/api/mock/projects`);
  const result = await res.json();

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

export default Application;
