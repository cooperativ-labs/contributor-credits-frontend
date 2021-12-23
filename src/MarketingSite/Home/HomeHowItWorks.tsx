import ContractCard from '../Components/SmartContractCard';
import MarketingButton from '../Components/Buttons';
import React, { FC } from 'react';
import StandardSection from '../Containers/StandardSection';
import Card from '@src/containers/Card';

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
        <h2 className="text-lg mb-10 mt-8 font-semibold">{text}</h2>
      </div>
    </>
  );
};

const GetSetUpSection: React.FC<any> = () => {
  return (
    <StandardSection divider backgroundColor="#F4F1EC">
      <h1 className="mb-8 md:text-xl text-cDarkBlue font-semibold ">How It Works</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="col-span-1" style={{ maxWidth: '500px' }}>
          <Blurb
            title="1. Set up a Project."
            text="Describe your vision and your progress. Show potential co-founders and contributors why they should join
            your project."
          />

          <Blurb
            title="2. Configure compensation"
            text="A hybrid of simple contracts and blockchain-based financial tools let you securely promise dollars or euros to your contributors when and if your project succeeds."
          />

          <Blurb
            title="3. Send Invitations"
            text="Cooperativ invitations make clear the terms of your relationships, so you can start working together with a
              shared understanding and full transparency."
          />
        </div>

        <div className="md:-mt-10">
          <Card className="rounded-lg p-3 shadow-xl">
            <img src="assets/images/invitation-example.png" />
          </Card>
        </div>
      </div>
    </StandardSection>
  );
};

export default GetSetUpSection;
