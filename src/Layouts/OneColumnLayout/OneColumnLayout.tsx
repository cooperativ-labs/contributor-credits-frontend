import React from 'react';
import { ReactNodeLike } from 'prop-types';

export interface OneColumnLayoutProps {
  className?: string;
  children: ReactNodeLike | ReactNodeLike[];
}

const OneColumnLayout: React.FunctionComponent<OneColumnLayoutProps> = ({ className, children }) => {
  return (
    <div data-test="layout-one-column" className="w-full">
      {children}
    </div>
  );
};

export default OneColumnLayout;
