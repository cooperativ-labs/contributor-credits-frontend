import Link from 'next/link';
import Loading from './Loading';
import React, { FC } from 'react';

interface LoadingModalProps {}
const LoadingModal: FC<LoadingModalProps> = ({}) => {
  return (
    <div className="flex-grow h-full z-10">
      <div className="h-full px-4 md:px-8 py-2 md:py-5">
        <div className={'mx-auto min-h-full'}>
          <div className="h-screen">
            <div className="flex flex-grow justify-center h-full z-10">
              <div className="md:flex flex-col h-full w-full items-center pt-20">
                <div
                  className="flex-col p-6 py-6 md:bg-white md:max-w-xl md:rounded-xl md:shadow-xl"
                  style={{ maxWidth: '700' }}
                >
                  <Loading />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
