import React, { FC } from 'react';
import { ReactNodeLike } from 'prop-types';

export type StandardSectionProps = {
  backgroundColor?: string;
  divider?: boolean;
  children: ReactNodeLike;
};

const StandardSection: FC<StandardSectionProps> = ({ backgroundColor, divider, children }) => {
  return (
    <div style={{ backgroundColor: backgroundColor }}>
      <div className="flex flex-col min-h-full py-20 mx-auto md:py-32 px-4 md:px-8" style={{ maxWidth: '1280px' }}>
        {children}
      </div>

      {divider && <hr className="flex border-1 border-gray-400 mx-10 md:mx-48" />}
    </div>
  );
};

export default StandardSection;
