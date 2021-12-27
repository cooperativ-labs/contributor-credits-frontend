import React, { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row items-center">
        <div className="h-20 w-20 md:h-14 md:w-14 mb-5 md:mr-3 md:mb-0">
          <img src="/favicon.ico" />
        </div>
        <div>
          <div className="text-center font-bold text-cDarkBlue md:text-xl">Thinking...</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
