import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import InviteForm from '@src/MarketingSite/Forms/InviteForm';
import MarketingNav from '@src/MarketingSite/MarketingNav';
import React from 'react';
import { ResultProps } from '@interfaces/types';

const RequestInvite: React.FC<ResultProps> = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full bg-cLightCream">
      <Head>
        <title>Cooperativ - Request Invitation</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Cooperativ - Request Invitation" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Find collaborators for your big idea." />
        <meta property="og:image" content="/assets/images/share.png" />
        <meta property="og:url" content="https://cooperativ.io" />
        {/** Twitter */}
        <meta name="twitter:title" content="Cooperativ - Request Invitation" />
        <meta name="twitter:description" content="Find collaborators for your big idea." />
        <meta name="twitter:image" content="/assets/images/share.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <MarketingNav shadow />
      <div className="py-4 md:py-32 md:px-8">
        <div
          className="flex-col min-h-full mx-auto p-4 pt-8 md:bg-white md:max-w-xl md:rounded-lg md:shadow-xl"
          style={{ maxWidth: '700' }}
        >
          <InviteForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RequestInvite;
