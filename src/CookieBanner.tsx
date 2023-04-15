import Button from './components/Buttons/Button';
import cn from 'classnames';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import router from 'next/router';

const buttonGradient =
  'bg-gradient-to-r from-cLightBlue to-cDarkBlue hover:from-cDarkBlue hover:to-cLightBlue shadow-lg hover:shadow-2xl focus:shadow-sm';

const CookieBanner: FC = () => {
  const [approvalState, setApprovalState] = useState(undefined);
  useEffect(() => {
    setApprovalState(window.localStorage);
  }, [setApprovalState]);

  return (
    <div className="fixed bottom-0 md:bottom-4 md:right-10 md:left-10 z-40 mx-auto w-full md:w-auto bg-cGold p-3 shadow-xl md:rounded-xl cursor-pointer">
      <div className="flex font-medium text-white text-xs md:text-base mx-auto px-2 justify-between items-center">
        <span className="mr-3">
          We use cookies to improve our services. Using this website means you agree to this.{' '}
          <Link href="/privacy">
            <span className="underline decoration-cLightBlue">Privacy Policy</span>
          </Link>
        </span>
        <Button
          className={cn(buttonGradient, 'p-3 px-6 text-sm font-bold rounded-lg')}
          onClick={() => {
            approvalState?.setItem('COOKIE_APPROVED', 'approved');
            router.reload();
          }}
        >
          Accept
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;
