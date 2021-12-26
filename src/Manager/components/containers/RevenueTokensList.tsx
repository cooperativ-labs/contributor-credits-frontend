import Card from '@src/containers/Card';
import React, { FC } from 'react';
import { colStyle } from './ClassCardList';

const RevenueTokensList: FC = () => {
  return (
    <Card className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h1 className="text-cDarkBlue text-xl font-semiBold">Revenue Tokens</h1>
      <div className="text-cLightBlue text-sm mb-6">
        Revenue Tokens let you easily distribute revenue to creators and investors in your project. Money directed to
        each class of revenue tokens is split evenly among those tokens. If you hold 30% of the tokens, you get 30% of
        the money.
      </div>
      <div className="hidden md:grid grid-cols-3 border-b-2 p-1 px-2">
        <div className={colStyle}>Class</div>
        <div className={colStyle}>Holder</div>
        <div className={colStyle}>Amount</div>
      </div>
      <div className="text-gray-500 text-lg mt-6">Coming Soon</div>
    </Card>
  );
};

export default RevenueTokensList;
