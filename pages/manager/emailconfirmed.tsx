import React from 'react';
import { ResultProps } from '@interfaces/types';

const EmailConfirmed: React.FC<ResultProps> = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <div className="py-8 md:py-32 md:px-8" style={{ backgroundColor: '#f3f5fb' }}>
        <div
          className="flex flex-col min-h-full mx-auto items-center p-4 pt-8 md:bg-white md:max-w-lg md:rounded-lg md:shadow-xl"
          style={{ maxWidth: '500' }}
        >
          <img src="/assets/images/branding/symbol_dark_blue.svg" aria-label="logo" />
          <div className="px-3 pb-8 md:mx-2 text-center text-xl font-semibold text-blue-900">
            Thank you for confirming your email address
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmed;
