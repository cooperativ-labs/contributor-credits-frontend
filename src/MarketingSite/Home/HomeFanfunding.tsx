import ContractCard from '../Components/SmartContractCard';
import MarketingButton from '../Components/Buttons';
import React from 'react';
import StandardSection from '../Containers/StandardSection';

const bigTitleClass = 'ubuntu text-4xl md:text-5xl font-bold text-cLightBlue';
const pointsSectionClass = 'ml-2 mb-10 md:mb-0 text-gray-800';
const pointsHeaderClass = 'text-lg mb-2 mt-8 font-semibold';

const explainerSection = (
  <>
    <div>
      <h1 className={bigTitleClass} style={{ textShadow: '3px 3px 5px #e2e2e2' }}>
        Raise funds from your fans.
      </h1>
      <div className={pointsSectionClass}>
        <div style={{ maxWidth: '500px' }}>
          <h2 className={pointsHeaderClass}>
            Use our simple crowdfunding, vote-funding, and fan-funding tools to get your project to the next level.
          </h2>
        </div>
      </div>
    </div>
    <div className="flex mt-10 justify-center md:justify-start">
      <MarketingButton className="md:mt-4" outlined large link="/fundraising" text="learn more" />
    </div>
  </>
);

const HomeFanfunding: React.FC<any> = ({ projects }) => {
  return (
    <StandardSection divider backgroundColor="#F4F1EC">
      <h1 className="mb-8 md:text-xl text-cDarkBlue font-semibold">Step 2</h1>
      <div className="flex min-h-full mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="col-span-1">{explainerSection}</div>
          <div className="col-span-1 md:-mt-8">
            <hr className="flex mx-4 mb-10 md:hidden" />

            <div className="-mt-10">
              <ContractCard
                isLive
                className="shadow-2xl"
                header="Community Investment"
                mainText="Supporter Credits"
                icon="coins"
                subHeader="Supporters get $1 later for every ¢50 they give you now"
                expandedDescription="This contract automatically allocates revenue to the holders of Credits in proportion to how many Credits they have."
                content={
                  <div className="font-semibold text-gray-400 mt-4">
                    Supporters can{' '}
                    <span className="text-green-500 font-bold">purchase a fixed amount of your future revenue</span> by{' '}
                    <span className="text-green-500 font-bold">giving you money up front</span>.
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </StandardSection>
  );
};

export default HomeFanfunding;
