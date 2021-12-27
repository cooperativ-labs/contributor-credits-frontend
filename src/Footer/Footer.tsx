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
      className={`${
        color ? color : 'bg-cCream'
      } w-full relative bottom-0 text-gray-200 border-t-2 border-gray-400 py-4 mt-0`}
    >
      <footer
        data-test="component-footer"
        className={`px-4 mx-auto  pb-4  ${textColor} flex flex-col md:flex-row justify-between items-center w-full`}
        style={{ maxWidth: '1280px' }}
      >
        <div className="flex px-4 py-1 md:p-0">
          <span className="flex md:mr-8 w-max">
            <img src={stamp} alt="logo" width="15" /> Sunshine Labs Inc. 2021{' '}
          </span>
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
      <div className={`py-1 pb-24 md:pb-4 border-t-2 ${textColor} border-gray-400`}>
        <div className="mx-4 md:mx-8 lg:mx-16 flex flex-col md:flex-row justify-center items-center">
          <Link href={signUpLink}>
            <div className="flex items-center">
              <a className="text-grey-700 font-light">Create your own Cooperativ project</a>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
