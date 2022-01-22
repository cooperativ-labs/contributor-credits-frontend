import AlertBanner from '@src/components/Alerts/AlertBanner';
import cn from 'classnames';
import Link from 'next/link';
import MarketingButton from '@src/components/Buttons/MarketingButton';
import React, { FC } from 'react';
import { useWindowSize } from 'react-use';

const standardClass = `text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white`;

const LandingHeader: FC = () => {
  const windowSize = useWindowSize();
  return (
    <div className="z-30 shadow-md md:pb-8">
      <AlertBanner />
      <div
        className="py-2 px-2 pr-4 mt-2 md:mt-4 h-14 z-30 flex mx-auto justify-between self-center items-center "
        style={{ maxWidth: '1580px' }}
      >
        <div className="ml-1 justify-start flex items-center">
          <img
            src={
              windowSize.width < 768
                ? '/assets/images/branding/stamp_dark_blue.svg'
                : '/assets/images/branding/stamp_dark_blue.svg'
            }
            alt="logo"
            width={windowSize.width < 768 ? '50' : '50'}
          />
        </div>
        <div className="flex justify-end">
          <span className="flex items-center">
            <Link href="/app">
              <div className={cn(standardClass, 'p-1 px-2 md:p-2 md:px-4 font-semibold rounded-full relative md:mr-2')}>
                Open App
              </div>
            </Link>
          </span>
        </div>
      </div>
      <div className="flex min-h-full mx-auto justify-center px-4 md:px-8 md:mt-8" style={{ maxWidth: '1280px' }}>
        <div className="my-10 flex flex-col">
          <div className="max-w-4xl" style={{ textShadow: '3px 3px 5px #e2e2e2' }}>
            <h1 className="ubuntu text-4xl md:text-6xl mb-4 text-center font-semibold text-cLightBlue ">
              Contributor Credits
            </h1>
            <div className="text-xl font-medium text-center text-cDarkBlue">
              Give your engineers, designers, and other contributors a stake in your business.
            </div>

            <div className="flex flex-col md:flex-row mt-10 mb-8 justify-center items-center">
              <MarketingButton
                className="mx-2 my-2 whitespace-nowrap"
                link="/app"
                text="Open App"
                symbols={
                  <div className="flex justify-center items-center ">
                    <img src="/assets/images/chain-logos/ethereum-eth-logo.svg" className="w-4 h-4 mr-1" />
                    <img src="/assets/images/chain-logos/polygon-matic-logo.svg" className="w-4 h-4" />
                  </div>
                }
              />
              <MarketingButton
                className="mx-2 my-2 whitespace-nowrap"
                outlined
                link="https://cooperativ.medium.com/a-new-way-to-compensate-contributors-to-early-stage-projects-fa7d83985fde"
                external
                text="Read whitepaper"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
