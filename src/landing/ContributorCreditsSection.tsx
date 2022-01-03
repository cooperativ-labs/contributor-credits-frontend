import Button from '@src/components/Buttons/Button';
import React, { FC, useState } from 'react';
import TwoColumnLayout from '@src/Layouts/TwoColumnLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContractCard from '@src/components/SmartContractCard';

const contributorCreditsExplainer = (
  <div className="mt-5">
    <h1 className="text-xl md:text-3xl mb-1 mt-3 font-bold">What is a Contributor Credit (C²)? </h1>
    <h3 className="text-gray-700 mb-4 font-bold">
      A way to pay your collaborators before you have money or even a business.
    </h3>
    <div className=" mb-10">
      Each Contributor Credit, written "C²", is a promise to pay $1 the future, when the project or business has cash.
      If an project pays 300 C², then it must pay the holder of those C² $300 when it either reaches a trigger (like a
      round of investment) or begins earning revenue. If the project fails to bring in money, then it doesn't have to
      pay.
    </div>
    <h1 className="text-xl md:text-3xl mb-1 mt-8 font-bold">When do I use C²?</h1>
    <h3 className="text-gray-700 mb-4 font-bold">When you have a cool idea and collaborators to help you build it.</h3>
    <div className=" mb-10">
      Most businesses start out as projects, experiments to see whether a product or service is useful and valuable.
      These projects often don't have much funding, and often aren't even part of a registered business. In these cases,
      the people who contribute to the project need a secure and transparent way to share in its success if goes on to
      become a valuable business.
    </div>
    <h1 className="text-xl md:text-3xl mb-1 mt-8 font-bold">Can I trust C²? </h1>
    <h3 className="text-gray-700 mb-4 font-bold">Yup. This is why we built it on the Ethereum blockchain.</h3>
    <div className=" mb-10">
      Remember that C² are essentially promises. By using the blockchain for C² transactions, we are making sure those
      promises are public, permanent, and impossible to erase. It doesn't even matter if Cooperativ disappears. Your C²
      are still there in your wallet, and the contract the payor signed is still valid.
    </div>
  </div>
);

const contributorCreditsCards = (
  <div className="md:mx-4 mb-8 md:mb-0">
    <ContractCard
      className="hover:shadow-xl"
      isLive
      header="Contributor Credits "
      mainText="Trigger-Based"
      icon="coins"
      subHeader="Contributors get paid when the business reaches a trigger"
      expandedDescription="The project is obligated to fully fund all the outstanding Credits when it reaches any one of the
triggers specified in the contract. When this happens, each credit will be worth one dollar or euro
and holders of these credits will be able to cash them in. For an in-depth explanation of how credits work:"
      link="https://cooperativ.medium.com/a-new-way-to-compensate-contributors-to-early-stage-projects-fa7d83985fde"
      content={
        <div className="font-semibold text-gray-400 mt-4">
          Contributors can easily "charge" for their work on an early-stage passion-project as a way of ensuring that
          they <span className="text-green-500 font-bold">share in the profits</span> if the project{' '}
          <span className="text-green-500 font-bold">turns out to be successful</span>.
        </div>
      }
    />
    <ContractCard
      header="Contributor Credits "
      mainText="Revenue-Based"
      icon="coins"
      subHeader="Contributors get paid as dollars/euros arrive"
      expandedDescription="This contract automatically allocates revenue to the holders of Credits in proportion to how many Credits they have. If I hold 10 out of 20 total credits, 50% of each Dollar or Euro is available for me to cash in as soon as it in the project's account."
      content={
        <div className="font-semibold text-gray-400 mt-4">
          Contributors can easily "charge" for their work on an early-stage passion-project and{' '}
          <span className="text-green-500 font-bold">claim their share</span> of each Dollar or Euro{' '}
          <span className="text-green-500 font-bold">as it arrives</span>.
        </div>
      }
    />
  </div>
);

const ContributorCreditsSection: FC = () => {
  const [detailsShown, setDetailsShown] = useState(false);
  const handleDetailsReveal = () => {
    setDetailsShown(!detailsShown);
  };
  return (
    <div className="md:py-10 pb-10 md:pb-20 px-4 bg-cLightCream">
      <div className="flex-col min-h-full mx-auto pt-10" style={{ maxWidth: '1280px' }}>
        <div className="hidden md:inline md:mx-4 ">
          <div className="md:mx-4">
            <TwoColumnLayout>
              {contributorCreditsCards}
              {contributorCreditsExplainer}
            </TwoColumnLayout>
          </div>
        </div>
        <div className="md:hidden">
          {contributorCreditsCards}
          <div className="flex justify-center">
            <Button
              className="h-8 p-4 m-4 min-w-max flex items-center rounded text-blue-800 border-2 border-blue-800"
              onClick={handleDetailsReveal}
            >
              <div className="mr-2"> Learn More About Contributor Credits </div>
              {detailsShown && <FontAwesomeIcon icon="chevron-up" />}
              {!detailsShown && <FontAwesomeIcon icon="chevron-down" />}
            </Button>
          </div>
          {detailsShown && <div className="p-4 mx-4">{contributorCreditsExplainer}</div>}
        </div>
      </div>
    </div>
  );
};

export default ContributorCreditsSection;
