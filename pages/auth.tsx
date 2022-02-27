// auth.tsx
import cn from 'classnames';
import CreateAccount from '@src/Manager/forms/CreateAccount';
import { NextPage } from 'next';

import React, { useState } from 'react';
import SetWalletContext from '@src/web3/SetWalletContext';
import WalletChooserModal from '@src/Manager/WalletChooserModal';

const BackgroundGradient = 'bg-gradient-to-b from-gray-100 to-blue-50';

const AuthPage: NextPage = ({}) => {
  const [showAccountCreation, setShowAccountCreation] = useState<boolean>(true);
  return (
    <div className="h-full">
      <div className={cn(BackgroundGradient, 'min-h-full w-screen min-h-screen')}>
        <div className="flex-grow z-10">
          <div className="h-full px-4 md:px-8 py-2 md:py-5">
            <div className="mx-auto min-h-full">
              <div className="flex flex-grow justify-center h-full z-10">
                <div className="md:flex flex-col h-full w-full items-center pt-20">
                  <div
                    className="flex-col px-4 pb-10 md:py-10 md:bg-white md:rounded-lg md:shadow-xl w-full"
                    style={{ maxWidth: '600px' }}
                  >
                    <div className="px-3  md:mx-2">
                      <SetWalletContext>
                        <WalletChooserModal />
                        <CreateAccount />
                      </SetWalletContext>
                    </div>
                  </div>
                </div>
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
