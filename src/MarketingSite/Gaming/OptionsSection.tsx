import GameInviteForm from '@src/MarketingSite/Forms/GameInviteForm';
import React, { FC } from 'react';
import StandardSection from '../Containers/StandardSection';
import TwoColumnLayout from '@src/Layouts/TwoColumnLayout';

const OptionBlock = ({ title, text, icon }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        <h1 className="text-3xl text-gray-100 md:text-3xl mb-1 mt-3 font-bold">{title}</h1>
        <div className="ml-2">
          <img src={icon} width="35" />
        </div>
      </div>
      <span>
        <h3 className="text-gray-100 mt-2 mb-4 font-light">{text}</h3>
      </span>
    </div>
  );
};
const OptionsExplainer = () => (
  <div style={{ maxWidth: '400px' }}>
    <OptionBlock
      title="Pledge Trigger"
      text="Funding is released to the developer if the amount pledged reaches the campaign goal."
      icon="assets/images/icons/crowdfunding-icon.png"
    />
    <OptionBlock
      title="Item pre-sale"
      text="Players can purchase in-game items in advance for a discount"
      icon="assets/images/icons/rook-icon.png"
    />
    <OptionBlock
      title="Votefunding"
      text="Funders pay for votes, then vote from a list of possible new features. The revenue generated from the sale of all votes goes to developing the winning feature."
      icon="assets/images/icons/vote-icon.png"
    />
  </div>
);

const OptionsSection: FC = () => {
  return (
    <StandardSection backgroundColor="#2f2d34">
      <div>
        <h1 className="mb-6 text-gray-100 font-semibold">Crowdfunding</h1>
        <TwoColumnLayout>
          <OptionsExplainer />
          <GameInviteForm />
        </TwoColumnLayout>
      </div>
    </StandardSection>
  );
};

export default OptionsSection;
