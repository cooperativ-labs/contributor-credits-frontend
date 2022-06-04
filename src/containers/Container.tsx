import cn from 'classnames';
import React from 'react';
export interface ContainerProps {
  children: React.ReactNode;
  constrain?: string;
  className?: string;
}

const Container: React.FunctionComponent<ContainerProps> = ({ className, children, constrain = '1280px' }) => {
  return (
    <div
      data-test="atom-container"
      className={cn(className, 'w-full h-full flex items-center m-auto')}
      style={{ maxWidth: constrain }}
    >
      {children}
    </div>
  );
};

export default Container;
