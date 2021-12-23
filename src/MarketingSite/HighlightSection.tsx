import MarketingButton from './Components/Buttons';
import React from 'react';

interface HighlightSectionProps {
  title: string;
  text: string;
  buttonLink: string;
  buttonText: string;
}

const HighlightSection: React.FC<HighlightSectionProps> = ({ title, text, buttonLink, buttonText }) => {
  return (
    <div className="py-10 px-8 md:px-14 text-white bg-cDarkBlue">
      <div className="flex-col min-h-full mx-auto pt-4" style={{ maxWidth: '1280px' }}>
        <h2 className="text-2xl mb-4 md:text-3xl font-semibold text-center md:text-left">{title}</h2>
        <div>{text}</div>

        <MarketingButton className="flex justify-center md:inline-block mt-5 " link={buttonLink} text={buttonText} />
      </div>
    </div>
  );
};

export default HighlightSection;
