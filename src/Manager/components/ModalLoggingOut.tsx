import { ApplicationStoreProps, store } from '@context/store';
import Loading from './Loading';
import React, { FC, useContext } from 'react';

const LogoutModal: FC = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { LoadingModalOn } = applicationStore;

  if (LoadingModalOn) {
    return (
      <div className="flex-grow h-full z-50">
        <div className="h-full px-4 md:px-8 py-2 md:py-5">
          <div className={'mx-auto min-h-full'}>
            <div className="h-screen">
              <div className="flex flex-grow justify-center h-full z-50">
                <div className="md:flex flex-col h-full w-full items-center pt-20">
                  <div
                    className="flex-col p-6 py-6 md:bg-white md:max-w-xl md:rounded-xl md:shadow-xl"
                    style={{ maxWidth: '700' }}
                  >
                    <div className="animate-pulse">
                      <div className="flex flex-col md:flex-row items-center">
                        <div className="h-20 w-20 md:h-14 md:w-14 mb-5 md:mr-3 md:mb-0">
                          <img src="/favicon.ico" />
                        </div>
                        <div>
                          <div className="text-center font-bold text-cDarkBlue md:text-xl">Logging out...</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

export default LogoutModal;
