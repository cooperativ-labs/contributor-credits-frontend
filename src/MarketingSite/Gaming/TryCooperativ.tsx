import Button from '@src/components/Buttons/Button';
import Link from 'next/link';
import React from 'react';
import StandardSection from '../Containers/StandardSection';

const buttonGradient =
  'bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:to-pink-500';

const TryCooperativSection: React.FC = () => {
  return (
    <StandardSection backgroundColor="#434248">
      <div className="md:mx-4 md:grid md:grid-cols-2">
        <div className="col-span-1">
          <h1 className="mb-8 text-white font-semibold">Collaboration</h1>
          <h2 className="text-2xl text-gray-100 mb-4 md:text-3xl font-semibold">Business-as-a-Service</h2>
          <div className="text-gray-100">
            Use Cooperativ Projects to share ownership of projects, across borders, without registering a business. Use
            Contributor Credits to compensate collaborators without cash.
          </div>
          <Link href="/">
            <Button
              className={`${buttonGradient} mt-8 flex justify-center md:inline-block text-white text-lg p-4 px-10 font-bold rounded-full relative focus:outline-none`}
              aria-label={`button-Learn More`}
            >
              <span className="uppercase">Learn More</span>
            </Button>
          </Link>
        </div>
        <div className="hidden md:flex md:col-span-1 max-w-lg pl-8">
          <img src="assets/images/laptop-mockup.png" />
        </div>
      </div>
    </StandardSection>
  );
};

export default TryCooperativSection;
