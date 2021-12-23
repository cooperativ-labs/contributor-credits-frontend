import ContractCard from '../Components/SmartContractCard';
import MarketingButton from '../Components/Buttons';
import React from 'react';
import StandardSection from '../Containers/StandardSection';

const GetSetUpSection: React.FC<any> = () => {
  const bigTitleClass = 'text-4xl mb-4 md:mb-8 md:text-5xl font-bold text-blue-900';
  const pointsHeaderClass = 'text-lg mb-2 mt-10 font-semibold ';

  return (
    <StandardSection backgroundColor="#fff">
      <h1 className="mb-8 md:text-xl text-blue-500 font-semibold ">Step 2</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="col-span-1" style={{ maxWidth: '500px' }}>
          <h1 className={bigTitleClass} style={{ textShadow: '3px 3px 5px #e2e2e2' }}>
            Pay Credits.
          </h1>
          <h2 className={pointsHeaderClass}>More available than cash</h2>
          <div>
            Most early-stage projects don't have much money. They need a way to give collaborators a stake in their
            success.
          </div>
          <h2 className={pointsHeaderClass}>Safer than free</h2>
          <div>
            Don't accept work for free. It makes intellectual property ownership unclear, and it's also unfair to your
            collaborators.
          </div>
          <h2 className={pointsHeaderClass}>Simpler than equity</h2>
          <div>
            Your collaborators can come and go as they please without you ending up with a bunch of long-gone equity
            holders.
          </div>

          <div className="flex mt-4 justify-center md:justify-start">
            <MarketingButton className="mt-4 md:mt-8" large outlined link="/tools/compensation" text="Learn More" />
          </div>
        </div>
        <hr className="flex mx-4 mt-4 md:hidden" />
        <div>
          <ContractCard
            className="shadow-2xl md:-mt-10"
            isLive
            header="Contributor Credits "
            mainText="Trigger-Based"
            icon="coins"
            subHeader="Contributors get paid when the business reaches a trigger"
            expandedDescription="The project is obligated to fully fund all the outstanding Credits when it reaches any one of the
triggers specified in the contract. When this happens, each credit will be worth one dollar or euro
and holders of these credits will be able to cash them in. For an in-depth explanation of how credits work:"
            content={
              <div className="font-semibold text-gray-400 mt-4">
                Contributors can easily "charge" for their work on an early-stage passion-project as a way of ensuring
                that they <span className="text-green-500 font-bold">share in the profits</span> if the project{' '}
                <span className="text-green-500 font-bold">turns out to be successful</span>.
              </div>
            }
          />
          <ContractCard
            className="shadow-2xl"
            header="Contributor Credits "
            mainText="Revenue-Based"
            icon="coins"
            subHeader="Contributors get paid as dollars/euros arrive"
            expandedDescription="This contract automatically allocates revenue to the holders of Credits in proportion to how many Credits they have. If I hold 10 out of 20 total credits, 50% of each Dollar or Euro is available for me to cash in as soon as it in the project's account."
            content={
              <div className="font-semibold text-gray-400 mt-4">
                Contributors can easily "charge" for their work on an early-stage passion-project and{' '}
                <span className="text-green-500 font-bold">claim their share</span> of each Dollar or Euro{' '}
                <span className="text-green-500 font-bold">as it arrives</span>.
              </div>
            }
          />
        </div>
      </div>
    </StandardSection>
  );
};

export default GetSetUpSection;
