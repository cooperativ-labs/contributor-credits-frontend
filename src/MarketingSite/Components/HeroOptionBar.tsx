import React, { ReactChild, useState } from 'react';

interface HeroOptionBarProps {
  firstButtonText: string;
  secondButtonText: string;
  firstOptionContent: ReactChild;
  secondOptionContent: ReactChild;
}

const HeroOptionBar: React.FC<HeroOptionBarProps> = ({
  firstButtonText,
  secondButtonText,
  firstOptionContent,
  secondOptionContent,
}) => {
  const [audience, setAudience] = useState<'creator' | 'collaborator'>('creator');
  const buttonTextClass = 'text-sm font-medium whitespace-nowrap text-gray-900';
  const buttonSliderClass = 'border-2 border-blue-900 mt-2 md:flex';
  return (
    <div className="">
      <div className="flex">
        <div onClick={() => setAudience('creator')} className="max-w-min cursor-pointer">
          <div className={buttonTextClass}>{firstButtonText}</div>
          {audience === 'creator' && <div className={buttonSliderClass} />}
        </div>
        <div onClick={() => setAudience('collaborator')} className="ml-8 max-w-min cursor-pointer">
          <div className={buttonTextClass}>{secondButtonText}</div>
          {audience === 'collaborator' && <div className={buttonSliderClass} />}
        </div>
      </div>
      <hr className="border-gray-600 mb-5 md:mb-10" style={{ maxWidth: '450px' }} />
      {audience === 'creator' ? firstOptionContent : secondOptionContent}
    </div>
  );
};

export default HeroOptionBar;
