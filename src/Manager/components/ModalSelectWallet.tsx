import ChooseConnector from '../ChooseConnector';
import React, { FC } from 'react';

const SelectWallet: FC = () => {
  return (
    <div className="h-screen">
      <div className="flex flex-grow justify-center h-full z-10">
        <div className="flex flex-col h-full w-full items-center md:mt-24">
          <ChooseConnector />
        </div>
      </div>
    </div>
  );
};

export default SelectWallet;
