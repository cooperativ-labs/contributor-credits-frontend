import MarketingButton from './Components/Buttons';
import React from 'react';

const AlphaInvite: React.FC = () => {
  return (
    <div className="py-10 px-4 text-white bg-cDarkBlue">
      <div className="min-h-full mx-auto" style={{ maxWidth: '1280px' }}>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold">Want to try the Alpha?</h2>
            <div className="mt-2 font-semibold">Requires Ethereum Wallet</div>
          </div>
          <div>
            <MarketingButton
              className="mt-4 md:ml-6"
              link="https://contributorcredits.com/"
              external
              text="Check it Out"
            />

            <a href="https://contributorcredits.com/" target="_blank" rel="noreferrer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlphaInvite;
