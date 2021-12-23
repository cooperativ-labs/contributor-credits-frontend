import GameInviteForm from '@src/MarketingSite/Forms/GameInviteForm';
import InlineInviteForm from '../Forms/InlineInviteForm';
import React, { FC } from 'react';
import StandardSection from '../Containers/StandardSection';
import TwoColumnLayout from '@src/Layouts/TwoColumnLayout';

const OptionBlock = ({ title, text, icon }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        <h1 className="text-3xl text-gray-900 md:text-3xl mb-1 mt-3 font-bold">{title}</h1>
        <div className="ml-2">
          <img src={icon} width="35" />
        </div>
      </div>
      <span>
        <h3 className="text-gray-900 mt-2 mb-4 font-light">{text}</h3>
      </span>
    </div>
  );
};
const OptionsExplainer = () => (
  <div style={{ maxWidth: '400px' }}>
    <OptionBlock
      title="Pledge Trigger"
      text="Funding is released to the creator if the amount pledged reaches the campaign goal."
      icon="assets/images/icons/crowdfunding-icon.png"
    />
    <OptionBlock
      title="Item pre-sale"
      text="Users can purchase the product in advance for a discount"
      icon="assets/images/icons/rook-icon.png"
    />
    <OptionBlock
      title="Votefunding"
      text="Funders pay for votes, then vote from a list of possible new features. The revenue generated from the sale of all votes goes to developing the winning feature."
      icon="assets/images/icons/vote-icon.png"
    />
  </div>
);

const FundingOptionsSection: FC = () => {
  return (
    <StandardSection backgroundColor="#fff">
      <h1 className="mb-6 text-gray-900 font-semibold">Fanfunding</h1>
      <div className="flex min-h-full min-w-full mx-auto">
        <TwoColumnLayout>
          <OptionsExplainer />
          <InlineInviteForm />
        </TwoColumnLayout>
      </div>
    </StandardSection>
  );
};

export default FundingOptionsSection;
