import classNames from 'classnames';
import React from 'react';
import { ReactNodeLike } from 'prop-types';

export interface ListEntityProps {
  className?: string;
  children: ReactNodeLike;
}

const ListEntity: React.FunctionComponent<ListEntityProps> = ({ children, ...props }) => {
  const { className, ...rest } = props;
  return (
    <div data-test="component-list-entity" className={classNames(className, 'flex bg-white')} {...rest}>
      {children}
    </div>
  );
};

export default ListEntity;
