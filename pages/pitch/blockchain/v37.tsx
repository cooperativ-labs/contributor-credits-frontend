import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import MarketingNav from '@src/MarketingSite/MarketingNav';
import React from 'react';
import { ResultProps } from '@interfaces/types';
import ProjectPitch from '@src/Profiles/Widgets/ProjectPitch';

const PitchURL =
  'https://docs.google.com/presentation/d/e/2PACX-1vQX-cC3zBGmNjA5WTTqHxkU13y7gY3QVck0MUbrqB1EQ0Pr0E9f-CIp7n8lszw9tahsZR95FthCzwuJ/embed?';

const Contracts: React.FC<ResultProps> = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <Head>
        <title>Cooperativ - Pitch</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Cooperativ - Pitch" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Create projects. Share ownership and success" />
        <meta property="og:image" content="/assets/images/share.png" />
        {/** Twitter */}
        <meta name="twitter:title" content="Cooperativ - Pitch" />
        <meta name="twitter:description" content="Create projects. Share ownership and success" />
        <meta name="twitter:image" content="/assets/images/share.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <MarketingNav shadow />
      <div className="p-10 mx-auto">
        <iframe className="hidden md:flex" src={PitchURL} width="960" height="569" allowFullScreen={true} />
        <div className="md:hidden ">
          <ProjectPitch url={PitchURL} className="my-5" />
        </div>
        <div className="md:pt-8">
          <a
            className="text-cDarkBlue md:text-lg font-semibold "
            href="https://sunshinelabs.medium.com/a-new-way-to-compensate-contributors-to-early-stage-project-5fdefcf57493"
          >
            Click here to read our detailed blog post explaining Contributor Credits.
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contracts;
