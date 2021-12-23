import classNames from 'classnames';
import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  style?: any;
  className?: string;
}

const Card: React.FunctionComponent<CardProps> = ({ children, ...rest }) => {
  const { className, style, ...props } = rest;
  return (
    <div data-test="component-card" className={classNames(`${className} bg-white shadow-md`)} style={style} {...props}>
      {children}
    </div>
  );
};

export default Card;
