import React from 'react';

export interface OneColumnLayoutProps {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

const OneColumnLayout: React.FunctionComponent<OneColumnLayoutProps> = ({ className, children }) => {
  return (
    <div data-test="layout-one-column" className="w-full">
      {children}
    </div>
  );
};

export default OneColumnLayout;
