import React from 'react';

export interface ThreeColumnLayoutProps {
  className?: string;
  children: React.ReactNode[];
}

const ThreeColumnLayout: React.FunctionComponent<ThreeColumnLayoutProps> = ({ className, children }) => {
  const leftColumn = children[0];
  const centerColumn = children[1];
  const rightColumn = children[2];

  return (
    <div data-test="layout-two-column" className="flex">
      <div data-test="left-column">{leftColumn}</div>
      <div data-test="center-column" className="flex-grow">
        {centerColumn}
      </div>
      <div data-test="right-column">{rightColumn}</div>
    </div>
  );
};

export default ThreeColumnLayout;
