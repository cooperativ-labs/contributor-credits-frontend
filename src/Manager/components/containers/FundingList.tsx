import Card from '@src/containers/Card';
import React, { FC } from 'react';
import { colStyle } from './ClassCardList';

const FundingList: FC = () => {
  return (
    <Card className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h1 className="text-cDarkBlue text-xl font-semiBold">Funds Raised</h1>
      <div className="text-cLightBlue text-sm mb-6">
        Cooperativ will soon let you sell Contributor Credits to your fans, users, supporters. Sell 20,000 credits for
        50 cents each to raise $10,000. If the trigger is met, you fully fund the credits and your supporters double
        their money.
      </div>
      <div className="hidden md:grid grid-cols-4 border-b-2 p-1 px-2">
        <div className={colStyle}>Class</div>
        <div className={colStyle}>Triggers</div> <div className={colStyle}>Sold</div>
        <div className={colStyle}>Funding</div>
      </div>
      <div className="text-gray-500 text-lg mt-6">Coming Soon</div>
    </Card>
  );
};

export default FundingList;
