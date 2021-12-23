import MarketingButton from './Components/Buttons';
import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  return (
    <div className="pt-20 pb-6 bg-cLightCream">
      <div className="flex min-h-full mx-auto justify-center px-4 md:px-8" style={{ maxWidth: '1280px' }}>
        <div className="my-10 flex flex-col">
          <div className="max-w-4xl" style={{ textShadow: '3px 3px 5px #e2e2e2' }}>
            <h1 className="ubuntu text-4xl md:text-6xl mb-8 text-center font-semibold text-cLightBlue ">{title}</h1>
            <div className="text-lg font-medium text-center">{subtitle}</div>
            <MarketingButton
              className="mt-8 flex justify-center"
              large
              link="/request-invite"
              text="Get Early Access"
            />
            <div className="m-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
