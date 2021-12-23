import Button from '@src/components/Buttons/Button';
import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const bigTitleClass = `text-4xl md:text-8xl mb-4 mt-8 md:text-left font-semibold text-white`;
const subtitleClass = 'm-1 text-xl md:text-left text-gray-300 ma';
const buttonGradient =
  'bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:to-pink-500';

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  return (
    <div className="pt-6 pb-6 shadow-xl" style={{ backgroundColor: '#391962' }}>
      <div className="flex min-h-full mx-auto px-4 md:px-8" style={{ maxWidth: '1280px' }}>
        <div className="flex flex-col items-center md:items-start">
          <h1 className={bigTitleClass} style={{ textShadow: '3px 3px 5px #221C2F' }}>
            {title}
          </h1>
          <div className={subtitleClass}>{subtitle}</div>
          <a href="https://forms.gle/vNUaaTkyEPPct4F4A" target="_blank" rel="noreferrer">
            <Button
              className={`${buttonGradient} mt-8 flex justify-center md:inline-block text-white text-lg p-4 px-10 font-bold rounded-full relative focus:outline-none`}
              aria-label={`button-Get Early Access`}
            >
              <span className="uppercase">Get Early Access</span>
            </Button>
          </a>
          <div className="flex items-center w-full mt-24">
            <div className="flex flex-col mr-2 flex-grow w-11/12">
              <span className="font-bold text-purple-200">
                Status: <span className="font-normal text-purple-100">In development</span>
              </span>

              <div className="w-full h-2 bg-pink-200 bg-opacity-80 mt-2 rounded">
                <div style={{ width: '10%' }} className={'h-2 rounded bg-purple-600'} />
              </div>
            </div>
            🎉
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
