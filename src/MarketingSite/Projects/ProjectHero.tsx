import MarketingButton from '../Components/Buttons';
import React from 'react';

export const ProjectHero: React.FC = () => {
  return (
    <div className="pt-20 pb-16 md:pb-20 bg-cLightCream">
      <div className="flex min-h-full mx-auto justify-center px-4 md:px-8" style={{ maxWidth: '1280px' }}>
        <div className="flex flex-col">
          <div className="max-w-5xl" style={{ textShadow: '3px 3px 5px #e2e2e2' }}>
            <h1 className="ubuntu text-4xl md:text-5xl mb-4 md:mt-14 text-center font-bold text-cLightBlue">
              Registering a business is a pain.
            </h1>
            <h1
              className="ubuntu text-4xl md:text-6xl mb-4 md:mb-8 text-center font-bold text-cLightBlue"
              style={{ textShadow: '3px 3px 5px #e2e2e2' }}
            >
              Create a Project instead.
            </h1>

            <div className="text-lg font-medium text-center">
              Recruit contributors. Formalize relationships. Share ownership.
            </div>

            <div className="flex justify-center">
              <MarketingButton className="mt-8" large link="/request-invite" text="Request Invite" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
