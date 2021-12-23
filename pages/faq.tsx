import axios from 'axios';
import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import MarketingNav from '@src/MarketingSite/MarketingNav';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ResultProps } from '@interfaces/types';
import { useAsync } from 'react-use';

export type FaqText = string;

const Contracts: React.FC<ResultProps> = () => {
  const data = `/assets/faq.md`;
  const getFaqText = async (): Promise<FaqText> => axios.get(data).then((resp) => resp.data);
  const { value: faqText } = useAsync(getFaqText, []);

  return (
    <div data-test="component-landing" className="bg-cLightCream flex flex-col w-full h-full ">
      <Head>
        <title>Cooperativ - FAQ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Cooperativ - FAQ" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Find collaborators for your big idea." />
        <meta property="og:image" content="/assets/images/share.png" />
        <meta property="og:url" content="https://cooperativ.io/faq" />
        {/** Twitter */}
        <meta name="twitter:title" content="Cooperativ - FAQ" />
        <meta name="twitter:description" content="Find collaborators for your big idea." />
        <meta name="twitter:image" content="/assets/images/share.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <MarketingNav />
      <div className="md:py-10 pb-10 px-8 mx-auto self-center" style={{ maxWidth: '1280px' }}>
        <h1 className="text-3xl ubuntu font-bold md:text-6xl">Frequently Asked Questions</h1>
        <div className="flex-col min-h-full mx-auto pt-10 prose lg:prose-lg max-w-none ">
          <ReactMarkdown source={faqText} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contracts;
