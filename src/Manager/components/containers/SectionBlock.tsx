import Button from '@src/components/Buttons/Button';
import cn from 'classnames';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNodeLike } from 'prop-types';

interface SectionBlockProps {
  sectionTitle: string;
  children: ReactNodeLike;
  className?: string;
  startOpen?: boolean;
}

const SectionBlock: React.FC<SectionBlockProps> = ({ sectionTitle, children, className, startOpen }) => {
  const [detailsShown, setDetailsShown] = useState(startOpen);
  const handleDetailsReveal = () => {
    setDetailsShown(!detailsShown);
  };
  return (
    <div className="md:w-96">
      <Button
        className={cn(className, 'h-8 py-4 mb-2 min-w-max flex items-center rounded outline-none')}
        onClick={handleDetailsReveal}
      >
        <h2 className="text-xl font-bold text-gray-800">{sectionTitle}</h2>
        <div className="ml-2">
          {detailsShown && <FontAwesomeIcon icon="chevron-up" />}
          {!detailsShown && <FontAwesomeIcon icon="chevron-down" />}
        </div>
      </Button>
      {detailsShown && <div>{children}</div>}
    </div>
  );
};

export default SectionBlock;
