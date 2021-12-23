import React, { FC } from 'react';
import StandardSection from '../Containers/StandardSection';

const FeatureHighlightSection: FC = () => {
  return (
    <StandardSection backgroundColor="#393347">
      <div className="grid grid-cols-3">
        <div className="md:flex text-center md:text-left items-center span-col-1">
          <div className="flex justify-center md:items-start">
            <img src="assets/images/icons/blockchain-icon.png" />
          </div>
          <div>
            <h3 className="text-gray-100 font-semibold my-auto pl-3">Blockchain Compatible</h3>
            <div className="text-gray-100 my-auto pl-3 font-light">Let your players pay crypto.</div>
          </div>
        </div>
        <div className="md:flex text-center md:text-left items-center span-col-1">
          <div className="flex justify-center md:items-start">
            <img src="assets/images/icons/api-icon.png" />
          </div>
          <div>
            <h3 className="text-gray-100 font-semibold my-auto pl-3">API Available</h3>
            <div className="text-gray-100 my-auto pl-3 font-light">Offer funding in-game.</div>
          </div>
        </div>
        <div className="md:flex text-center md:text-left items-center span-col-1">
          <div className="flex justify-center md:items-start">
            <img src="https://img.icons8.com/nolan/96/discord-logo.png" />
          </div>
          <div>
            <h3 className="text-gray-100 font-semibold my-auto pl-3">Discord Integration</h3>
            <div className="text-gray-100 my-auto pl-3 font-light">Connect with your player-funders.</div>
          </div>
        </div>
      </div>
    </StandardSection>
  );
};

export default FeatureHighlightSection;
