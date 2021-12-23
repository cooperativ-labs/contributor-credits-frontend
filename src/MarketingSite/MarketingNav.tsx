import Button from '@src/components/Buttons/Button';
import cn from 'classnames';
import Link from 'next/link';
import NavLink from './Components/NavLink';
import React, { FC } from 'react';
import { NavDropdown } from './Components/NavMenu';

interface MarketingNavProps {
  shadow?: boolean;
  gaming?: boolean;
}

export const MarketingNav: FC<MarketingNavProps> = ({ shadow, gaming }) => {
  return (
    <div
      className={`h-14 md:h-20 md:pb-1 flex z-30 ${shadow && 'shadow-md'}`}
      style={gaming ? { backgroundColor: '#2f2d34' } : { backgroundColor: '#fff' }}
    >
      <header
        className="py-4 px-2 md:px-6 pr-4 py-8 flex justify-between w-full mx-auto self-center"
        style={{ maxWidth: '1280px' }}
      >
        <a href="/">
          <div>
            <span className="flex mt-1 mx-1 items-center md:flex h-12">
              {/* WebKit required the width to be set or it defaults to 100% */}

              <div className="hidden md:flex">
                <img
                  src={`https://cooperativ.io/assets/images/branding/full_${gaming ? 'white' : 'dark_blue'}.svg`}
                  alt="logo"
                  width="230"
                />
              </div>
              <div className="flex flex-col ml-1 md:hidden">
                <img
                  src={`https://cooperativ.io/assets/images/branding/full_${gaming ? 'white' : 'dark_blue'}.svg`}
                  alt="logo"
                  width="150"
                />
              </div>
            </span>
          </div>
        </a>
        <span className="flex items-center">
          <div className="hidden md:inline lg:hidden">
            <NavDropdown name="Uses" gaming={gaming}>
              <NavLink gaming={gaming} link="/gaming" text="Game Development" />
              <NavLink gaming={gaming} disabled link="" text="More coming soon" />
            </NavDropdown>
          </div>
          <div className="hidden md:inline lg:hidden">
            <NavDropdown name="Tools" gaming={gaming}>
              <NavLink gaming={gaming} link="/projects" text="Projects & Invitations" />
              <NavLink gaming={gaming} link="/fundraising" text="Fundraising" />
              <NavLink gaming={gaming} link="/compensation" text="Compensation" />
            </NavDropdown>
          </div>
          <div className="hidden lg:inline">
            <NavLink gaming={gaming} link="/projects" text="Projects & Invitations" />
            <NavLink gaming={gaming} link="/fundraising" text="Fundraising" />
            <NavLink gaming={gaming} link="/compensation" text="Compensation" />
            <NavLink gaming={gaming} link="/faq" text="FAQ" />
          </div>
          <span className="flex">
            <Link href="/manager">
              <Button
                className={cn(
                  'flex p-1 md:p-2 px-4 md:px-6 text-sm md:text-base rounded-full md:max-w-xs relative focus:outline-none',
                  gaming
                    ? 'text-white hover:text-cGold bg-opacity-100 border-2 border-white hover:bg-white'
                    : 'text-cDarkBlue hover:text-white bg-opacity-100 border-2 border-cDarkBlue hover:bg-cDarkBlue'
                )}
              >
                <span className="inline md:font-bold md:uppercase">Log In</span>
              </Button>
            </Link>
          </span>
        </span>
      </header>
    </div>
  );
};

export default MarketingNav;
