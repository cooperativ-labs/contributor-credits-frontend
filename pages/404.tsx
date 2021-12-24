import Footer from '@src/Footer/Footer';
import Link from 'next/link';

import React from 'react';
import RoundedImage from '@src/components/RoundedImage/RoundedImage';

export default function Custom404() {
  return (
    <div className="w-full h-full min-h-full flex-col justify-center items-center">
      <div
        className="my-20 p-8 text-center min-h-full mx-auto flex flex-col items-center"
        style={{ maxWidth: '1280px' }}
      >
        <RoundedImage src="https://cooperativ.io/assets/images/404.jpg" className="h-48 w-48" />
        <h1 className="text-xl mt-8">
          Page Not Found. Try hitting the back button, or going the{' '}
          <span className="text-blue-500">
            <Link href="/">homepage</Link>.
          </span>
        </h1>
      </div>
      <Footer />
    </div>
  );
}
