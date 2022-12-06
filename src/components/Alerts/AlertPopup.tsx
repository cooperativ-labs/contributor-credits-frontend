import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AlertPopup: FC = () => {
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const dismissalStatus = window.sessionStorage?.getItem('DISMISS_ALERT_POPUP');
    setDismissed(dismissalStatus === 'true');
  }, [setDismissed]);

  return (
    <>
      {dismissed ? (
        <></>
      ) : (
        <div
          className="fixed bottom-0 md:bottom-4 md:right-10 z-40 mx-auto w-full md:w-auto bg-red-600 bg-opacity-90 p-2 shadow-xl md:rounded-xl cursor-pointer"
          onClick={() => {
            window.sessionStorage?.setItem('DISMISS_ALERT_POPUP', 'true');
            setDismissed(true);
          }}
        >
          <div className="flex font-medium text-white text-xs md:text-sm mx-auto px-2 ">
            <div className="mr-3"> ⚠️ This is an alpha version. Please use with caution.</div>
            <FontAwesomeIcon icon="times" />
          </div>
        </div>
      )}
    </>
  );
};

export default AlertPopup;
