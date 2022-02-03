import CreateAccount from '../forms/CreateAccount';
import React, { FC, useState } from 'react';

interface NeedAccountProps {}
const NeedAccount: FC<NeedAccountProps> = ({}) => {
  const [showAccountCreation, setShowAccountCreation] = useState<boolean>(true);
  return (
    <div className="flex-grow z-10">
      <div className="h-full px-4 md:px-8 py-2 md:py-5">
        <div className="mx-auto min-h-full">
          <div className="flex flex-grow justify-center h-full z-10">
            <div className="md:flex flex-col h-full w-full items-center pt-20">
              <div className="flex-col px-4 pb-10  w-full" style={{ maxWidth: '600px' }}>
                <div className="px-3  md:mx-2">
                  <CreateAccount />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedAccount;
