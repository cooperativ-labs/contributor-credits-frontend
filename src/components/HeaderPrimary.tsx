import classNames from 'classnames';
import React from 'react';
import { ReactNodeLike } from 'prop-types';
export interface HeaderPrimaryProps {
  className?: string;
  children: ReactNodeLike;
}

const HeaderPrimary: React.FunctionComponent<HeaderPrimaryProps> = ({ children, ...props }) => {
  const { className, ...rest } = props;
  return (
    <h1
      data-test="component-header-primary"
      className={classNames(className, 'font-bold text-xs md:text-base lg:text-lg')}
      {...rest}
    >
      {children}
    </h1>
  );
};

HeaderPrimary.propTypes = {};

export default HeaderPrimary;
