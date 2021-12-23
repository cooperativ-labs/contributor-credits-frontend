import MarketingButton from '../Components/Buttons';
import React from 'react';
import StandardSection from '../Containers/StandardSection';

const BusinessAsAServiceSection: React.FC = () => {
  return (
    <StandardSection backgroundColor="#f3f5fb">
      <h1 className="mb-8 text-blue-500 font-semibold">Business as a Service</h1>
      <h2 className="text-2xl mb-4 md:text-3xl font-semibold">Business infrastructure for the Internet age</h2>
      <div>
        Starting a business should be much easier. There should be no incorporation, no attorneys, no awkward equity
        conversations, no invoicing, no contracts. You should be able to come up with an idea, invite people to your
        team, and start building.
      </div>
      <MarketingButton
        className="mt-8"
        outlined
        external
        link="https://forms.gle/mR7nbwqWnvzt7tZi7"
        text="Start with A Project Profile"
      />
    </StandardSection>
  );
};

export default BusinessAsAServiceSection;
