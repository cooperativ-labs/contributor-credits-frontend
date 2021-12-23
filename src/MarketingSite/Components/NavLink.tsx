import cn from 'classnames';
import React from 'react';

interface NavLinkProps {
  link: string;
  text: string;
  disabled?: boolean;
  gaming: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ link, text, disabled, gaming }) => {
  return (
    <a href={!disabled && link}>
      <span
        className={cn(
          'uppercase font-semibold text-sm hover:text-cGold mr-10',
          gaming ? 'text-white' : 'text-cDarkBlue',
          disabled && 'text-opacity-50'
        )}
      >
        {text}
      </span>
    </a>
  );
};

export default NavLink;
