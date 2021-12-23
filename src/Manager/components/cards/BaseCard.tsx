import classNames from 'classnames';
import React, { FC } from 'react';

export interface BaseCardProps {
  children: React.ReactNode;
  style?: any;
  className?: string;
  center?: boolean;
  width?: string;
}

const BaseCard: FC<BaseCardProps> = ({ children, ...rest }) => {
  const { className, style, ...props } = rest;
  return (
    <div data-test="component-card" className={classNames(`${className} bg-white shadow-md`)} style={style} {...props}>
      {children}
    </div>
  );
};

export default BaseCard;
