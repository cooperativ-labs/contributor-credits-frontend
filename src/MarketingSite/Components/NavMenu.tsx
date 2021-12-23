import cn from 'classnames';
import React, { FC, useState } from 'react';
import { ReactNodeLike } from 'prop-types';

interface NavDropdownProps {
  children: ReactNodeLike[];
  name: string;
  gaming: boolean;
}

export const NavDropdown: FC<NavDropdownProps> = ({ children, name, gaming }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'uppercase font-semibold text-sm hover:text-cGold mr-10',
          gaming ? 'text-white' : 'text-cDarkBlue'
        )}
      >
        {name}
      </button>
      {open && (
        <div className="absolute mt-3 z-50 bg-cCream shadow-xl p-4 rounded ">
          {children.map((link) => {
            return <div className="my-1">{link}</div>;
          })}
        </div>
      )}
    </>
  );
};
