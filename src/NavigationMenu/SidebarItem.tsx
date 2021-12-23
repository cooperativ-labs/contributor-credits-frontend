import classNames from 'classnames';
import React from 'react';
import { ReactNodeLike } from 'prop-types';
export interface SidebarItemProps {
  className?: string;
  toggleable?: boolean;
  children: ReactNodeLike;
  onClick?(): any;
  subItem?: boolean;
}

const SidebarItem: React.FunctionComponent<SidebarItemProps> = ({ children, subItem, ...props }) => {
  const { className, ...rest } = props;
  return (
    <div
      data-test="component-sidebar-item"
      className={classNames(className, 'w-full', !subItem ? 'px-2 py-4 border-b-2 border-gray-300' : 'pr-2 py-2')}
      {...rest}
    >
      {children}
    </div>
  );
};

export default SidebarItem;
