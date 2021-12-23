import Button from '@src/components/Buttons/Button';
import React, { FC, useState } from 'react';
import TwoColumnLayout from '@src/Layouts/TwoColumnLayout';
import { ContractCard } from '../Components/SmartContractCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const revenueTokenExplainer = (
  <div>
    <h1 className="text-xl md:text-3xl mb-1 mt-3 font-bold">What is a Revenue Share Contract?</h1>
    <h3 className="text-gray-700 mb-4 font-bold">
      A way to guarantee a co-founder or partner a share of your revenue.
    </h3>
    <div className=" mb-10">
      Our revenue share contracts replicate typical revenue-share agreements. Each token represents a share of the
      project's income. Distribute them to the projects owners and they will automatically be able to access their
      share.
    </div>
    <h1 className="text-xl md:text-3xl mb-1 mt-8 font-bold">When do I use Revenue Share?</h1>
    <h3 className="text-gray-700 mb-4 font-bold">When you want to give someone a percentage of project's profits</h3>
    <div className=" mb-10">
      Revenue share contracts are great for sharing ownership of a project or compensating an investor. Some projects
      also use them for partnerships and joint ventures with other projects.
    </div>
    <h1 className="text-xl md:text-3xl mb-1 mt-8 font-bold">Fixed Issuance vs. Issuable</h1>
    <h3 className="text-gray-700 mb-4 font-bold">One offers more security, the other more flexibility</h3>
    <div className=" mb-10">
      An "Issuable" contract lets you issue more share tokens. This dilutes the current holders so that you can include
      new ones. A fixed-issuance contract can never have more than 100 share tokens - each representing 1%. This way,
      you can be sure a partner won't dilute your share by issuing him or herself more tokens.
    </div>
  </div>
);

const revenueTokenCards = (
  <div className="md:mx-4 mb-8 md:mb-0">
    <ContractCard
      header="Revenue Share"
      mainText="Fixed Issuance"
      icon="coins"
      subHeader="Each token is a right to 1% of income"
      expandedDescription="The project issues 100 tokens when this contract is established and can never issue more. Each token gives the holder access to 1% of all the income sent to it. This provides simple project the ability to share revenue without relying on trust."
      content={
        <div className="font-semibold text-gray-400 mt-4">
          The project issues 100 tokens. Each token gives the holder access to{' '}
          <span className="text-green-500 font-bold">1% of all the income sent to it</span>. The project can never issue
          more tokens from this contract.
        </div>
      }
    />
    <ContractCard
      header="Revenue Share"
      mainText="Issuable"
      icon="coins"
      subHeader="Similar to shares in a company"
      expandedDescription="Issuable Income Distribution Tokens let the company dilute the revenue share of the existing token holders in order to include new ones. This is best used with a governance contract (coming soon) so that no one person has the ability to issue more credits."
      content={
        <div className="font-semibold text-gray-400 mt-4">
          The project <span className="text-green-500 font-bold">can issue as many tokens as it wants</span>. Every new
          token <span className="text-green-500 font-bold">dilutes the share</span> that each existing token represents.
        </div>
      }
    />
  </div>
);

const RevenueShareSection: FC = () => {
  const [detailsShown, setDetailsShown] = useState(false);
  const handleDetailsReveal = () => {
    setDetailsShown(!detailsShown);
  };
  return (
    <div className="md:py-10 pb-10 md:pb-20 px-4 bg-cLightCream">
      <div className="flex-col min-h-full mx-auto pt-10" style={{ maxWidth: '1280px' }}>
        <div className=" hidden md:inline md:mx-4">
          <div className="md:mx-4 ">
            <TwoColumnLayout>
              {revenueTokenCards}
              {revenueTokenExplainer}
            </TwoColumnLayout>
          </div>
        </div>
        <div className="md:hidden">
          {revenueTokenCards}
          <div className="flex justify-center">
            <Button
              className="h-8 p-4 m-4 flex items-center rounded text-blue-800 border-2 border-blue-800"
              onClick={handleDetailsReveal}
            >
              <div className="mr-2"> Learn More About Revenue Share </div>
              {detailsShown && <FontAwesomeIcon icon="chevron-up" />}
              {!detailsShown && <FontAwesomeIcon icon="chevron-down" />}
            </Button>
          </div>

          {detailsShown && <div className="p-4 mx-4 bg-gray-200">{revenueTokenExplainer}</div>}
        </div>
      </div>
    </div>
  );
};

export default RevenueShareSection;
