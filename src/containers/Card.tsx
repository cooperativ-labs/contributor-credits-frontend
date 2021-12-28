import classNames from 'classnames';
import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  style?: any;
  className?: string;
  onClick?: () => void;
}

const Card: React.FunctionComponent<CardProps> = ({ children, onClick, ...rest }) => {
  const { className, style, ...props } = rest;
  return (
    <div
      data-test="component-card"
      className={classNames(`${className} bg-white shadow-md`)}
      style={style}
      {...props}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
