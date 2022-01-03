import cn from 'classnames';
import Link from 'next/link';
import React from 'react';

export interface FooterProps {
  color?: string;
  lightText?: boolean;
}

const signUpLink = '';

const Footer: React.FunctionComponent<FooterProps> = ({ color, lightText }) => {
  const textColor = lightText ? 'text-gray-300' : 'text-gray-600';
  const stamp = lightText
    ? 'https://cooperativ.io/assets/images/branding/stamp_white.svg'
    : 'https://cooperativ.io/assets/images/branding/stamp_dark_blue.svg';
  return (
    <div
      className={cn(
        [color ? color : 'bg-cCream'],
        'w-full relative bottom-0 text-gray-200 border-t-2 border-gray-400 py-4 mt-0'
      )}
    >
      <footer
        data-test="component-footer"
        className={`px-4 mx-auto  pb-4  ${textColor} flex flex-col md:flex-row justify-between items-center w-full`}
        style={{ maxWidth: '1280px' }}
      >
        <div className="flex px-4 py-1 md:p-0">
          <a href="https://cooperativ.io" rel="noreferrer" target="_blank">
            <span className="flex md:mr-8 w-max">
              <img src={stamp} alt="logo" width="15" /> Cooperativ Labs 2022{' '}
            </span>
          </a>
          <a target="_blank" rel="noreferrer" href="undefined/icons/set/api">
            Icons by Icons8
          </a>
        </div>
        <div>
          <Link href="/terms">
            <a className="px-4 py-1 md:p-0 md:mr-8 w-max">Terms of Service</a>
          </Link>
          <Link href="/privacy">
            <a className="px-4 py-1 md:p-0 w-max">Privacy Policy</a>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
