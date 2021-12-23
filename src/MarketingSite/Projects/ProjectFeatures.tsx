import InlineInviteForm from '../Forms/InlineInviteForm';
import React, { FC } from 'react';
import StandardSection from '../Containers/StandardSection';

interface BlurbProps {
  title: string;
  text: string;
}

const Blurb: FC<BlurbProps> = ({ title, text }) => {
  return (
    <>
      <h1
        className="ubuntu text-3xl md:text-3xl font-bold text-cDarkBlue "
        style={{ textShadow: '3px 3px 5px #e2e2e2' }}
      >
        {title}
      </h1>
      <div style={{ maxWidth: '500px' }}>
        <h2 className="text-lg mb-2 mt-8 font-semibold">{text}</h2>
      </div>
    </>
  );
};

const ProjectFeatures: React.FC<any> = ({ projects }) => {
  return (
    <StandardSection>
      <div className="grid md:grid-cols-2 min-h-full mx-auto w-full ">
        <div className="col-span-1">
          <div className="">
            <Blurb
              title="Find contributors for your big idea."
              text="Describe your vision and your progress. Show potential co-founders and contributors why they should join
            your project."
            />
          </div>
          <div className="mt-20">
            <Blurb
              title="Easily formalize working relationships"
              text="Cooperativ invitations make clear the terms of your relationships, so you can start working together with a
          shared understanding and full transparency."
            />
          </div>

          <div className="mt-20">
            <Blurb
              title="Share ownership and control."
              text="We are integrating blockchain-based financial tools, so you collectively control how money is managed and
            spent without ever opening a bank account."
            />
          </div>
        </div>
        <div className="col-span-1 mt-20 md:mt-0 flex flex-grow md:items-center md:justify-end">
          <InlineInviteForm />
        </div>
      </div>
    </StandardSection>
  );
};

export default ProjectFeatures;
