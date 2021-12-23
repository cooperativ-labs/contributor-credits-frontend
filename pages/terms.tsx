import axios from 'axios';
import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import MarketingNav from '@src/MarketingSite/MarketingNav';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ResultProps } from '@interfaces/types';
import { useAsync } from 'react-use';

export type TermsOfService = string;

const Contracts: React.FC<ResultProps> = () => {
  const data = `/assets/terms-of-service.md`;
  const getTermsOfService = async (): Promise<TermsOfService> => axios.get(data).then((resp) => resp.data);
  const { value: termsOfService } = useAsync(getTermsOfService, []);

  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <Head>
        <title>Cooperativ - Terms of Service</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Cooperativ - Terms of Service" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Find collaborators for your big idea." />
        <meta property="og:image" content="/assets/images/share.png" />
        <meta property="og:url" content="https://cooperativ.io/terms" />
        {/** Twitter */}
        <meta name="twitter:title" content="Cooperativ - Terms of Service" />
        <meta name="twitter:description" content="Find collaborators for your big idea." />
        <meta name="twitter:image" content="/assets/images/share.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <MarketingNav />
      <div className="md:py-10 pb-10 px-8">
        <div className="flex-col min-h-full mx-auto pt-10 prose" style={{ maxWidth: '1000px' }}>
          <ReactMarkdown source={termsOfService} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contracts;
