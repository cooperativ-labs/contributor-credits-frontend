import cn from 'classnames';
import React from 'react';
import { resetNextUuid } from 'react-accessible-accordion';

import { ReactNodeLike } from 'prop-types';

export interface TwoColumnLayoutProps {
  className?: string;
  children: ReactNodeLike[];
  twoThirdsLayout?: boolean;
}

const TwoColumnLayout: React.FunctionComponent<TwoColumnLayoutProps> = ({ className, children, twoThirdsLayout }) => {
  const leftChildren = children.filter((child, index) => index % 2 === 0);
  const rightChildren = children.filter((child, index) => index % 2 !== 0);

  resetNextUuid();

  const mobileLayout = (
    <div className="flex md:hidden ">
      <div data-test="mobile-center-column" className="flex-grow">
        {children.map((child, index) => {
          if (child) {
            return (
              <div key={index} className="mb-4">
                {child}
              </div>
            );
          }
        })}
      </div>
    </div>
  );

  const desktopLayout = (
    <div className={cn(twoThirdsLayout ? 'md:grid-cols-3' : 'md:grid-cols-2', 'hidden md:grid ')}>
      <div className={cn(twoThirdsLayout ? 'md:col-span-2' : 'md:col-span-1', 'my-5')}>
        {leftChildren.map((child, index) => {
          if (child) {
            return (
              <div key={index} className="mr-2 mb-2 md:mr-2 mb-8 lg:mr-4 lg:mb-16">
                {child}
              </div>
            );
          }
        })}
      </div>
      <div className="my-5">
        {rightChildren.map((child, index) => {
          if (child) {
            return (
              <div key={index} className="mr-2 mb-2 md:ml-2 md:mb-8 lg:ml-4 lg:mb-16 ">
                {child}
              </div>
            );
          }
        })}
      </div>
    </div>
  );

  return (
    <div data-test="layout-two-column" className={cn(className, 'pt-2 md:mt-4 w-full')}>
      <div>
        {mobileLayout}
        {desktopLayout}
      </div>
    </div>
  );
};

export default TwoColumnLayout;
