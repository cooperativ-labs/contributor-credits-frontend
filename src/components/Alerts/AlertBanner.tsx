import React, { FC } from 'react';

const AlertBanner: FC = () => {
  return (
    <a
      className="bg-emerald-600 bg-opacity-90 flex p-2 shadow-xl"
      href="https://cooperativ.medium.com/a-new-way-to-compensate-contributors-to-early-stage-projects-fa7d83985fde"
      target="_blank"
      rel="noreferrer"
    >
      <div className="font-medium text-white text-xs md:text-sm mx-auto px-2 ">
        <div>
          Contributor Credits work on Ethereum, Polygon, and Ropsten.{' '}
          <span className="underline mr-1"> Click here to read more about them.</span> 🎉
        </div>
      </div>
    </a>
  );
};

export default AlertBanner;
