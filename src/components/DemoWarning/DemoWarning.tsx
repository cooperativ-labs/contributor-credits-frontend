import Link from 'next/link';
import React from 'react';

const DemoWarning = (
  <div className="bg-green-600 flex p-1 shadow-xl">
    <Link href="/manager">
      <div className="font-medium text-white md:text-base text-sm mx-auto px-2">
        Click here to set up your own Cooperativ project (please note that we are still in alpha)! 🎉
      </div>
    </Link>
  </div>
);

export default DemoWarning;
