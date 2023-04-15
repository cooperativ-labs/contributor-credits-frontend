import cn from 'classnames';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SectionBlockProps = {
  sectionTitle: string;
  children: React.ReactNode;
  className?: string;
  startOpen?: boolean;
};

const SectionBlock: React.FC<SectionBlockProps> = ({ sectionTitle, children, className, startOpen }) => {
  const [detailsShown, setDetailsShown] = useState(startOpen);
  const handleDetailsReveal = () => {
    setDetailsShown(!detailsShown);
  };
  return (
    <div className="lg:min-w-min">
      <button
        className={cn(className, 'h-8 py-4 mb-2 min-w-max flex items-center rounded outline-none')}
        onClick={handleDetailsReveal}
      >
        <h2 className="text-xl font-bold text-gray-800">{sectionTitle}</h2>
        <div className="ml-2">
          {detailsShown && <FontAwesomeIcon icon="chevron-up" />}
          {!detailsShown && <FontAwesomeIcon icon="chevron-down" />}
        </div>
      </button>
      {detailsShown && <div>{children}</div>}
    </div>
  );
};

export default SectionBlock;
