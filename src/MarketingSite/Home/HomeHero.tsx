import MarketingButton from '../Components/Buttons';
import React from 'react';
import TextLoop from 'react-text-loop';

const rollerTitleClass = `text-cDarkBlue`;
const forEntrepreneurs = (
  <div>
    <h1
      className="ubuntu text-3xl md:text-4xl lg:text-5xl lg:leading-snug mb-4 md:mb-8 md:mt-0 text-center md:text-left font-bold text-cLightBlue"
      style={{ textShadow: '3px 3px 5px #e2e2e2' }}
    >
      Share ownership of a project, across borders, without lawyers, in 30 minutes.
      {/* <div> Create a virtual business for your</div>
      <TextLoop>
        <span className={rollerTitleClass}>Side-Hustle Team.</span>
        <span className={rollerTitleClass}>Creator Supporters.</span>
        <span className={rollerTitleClass}>Influencer Entourage.</span>
        <span className={rollerTitleClass}>Indie Game Studio.</span>
      </TextLoop>*/}
    </h1>
    {/* <div className={pointsSectionClass}>
      <div className={pointsClass}>
        Share ownership of projects. Test out co-founder relationships. Raise funding. Compensate collaborators.
      </div>
    </div> */}
  </div>
);

export const HeroSection: React.FC = () => {
  return (
    <div className="shadow-lg pt-6 pb-16 md:pb-20 z-10">
      <div className="flex min-h-full mx-auto px-4 md:px-8" style={{ maxWidth: '1280px' }}>
        <div className="my-10 md:grid grid-cols-3">
          <div className="col-span-2 md:mt-6">
            <div style={{ maxWidth: '750px' }}>{forEntrepreneurs}</div>
            <div className="flex justify-center md:justify-start">
              <MarketingButton className="mt-4" large text="Try Alpha" link="/manager" />
            </div>
          </div>

          <div className="hidden md:block col-span-1 md:mt-10 w-full">
            <img src="assets/images/laptop-mockup.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
