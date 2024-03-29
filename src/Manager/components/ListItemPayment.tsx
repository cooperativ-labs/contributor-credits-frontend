import React from 'react';
import { getHumanDate } from '@src/utils/helpersGeneral';
import { numberWithCommas } from '@src/utils/helpersMoney';

export type ListItemPaymentProps = {
  title: any;
  amount?: number;
  currency?: number | string;
  date?: string;
  note?: string;
};

const ListItemPayment: React.FC<ListItemPaymentProps> = ({ title, amount, currency, date, note }) => {
  return (
    <div className="grid grid-cols-11 my-4 md:mr-8 rounded-xl bg-white shadow-lg p-2 pr-4">
      <div className="col-span-2 overflow-hidden items-center rounded-xl h-14 w-14">
        <img src={'/assets/images/UserImages/placeholder.png'} />
      </div>
      <div className="col-span-9 grid grid-cols-9 ml-1">
        <div className="col-span-5 mx-1">
          <div className="text-sm md:text-md font-bold text-gray-800 ">{title}</div>
          <div className="text-xs text-gray-600">{getHumanDate(date)}</div>
        </div>
        <div className="col-span-4 font-bold flex justify-end">{`${numberWithCommas(amount)} ${currency}`}</div>
        {note && <div className="col-span-9 text-xs text-gray-600 mt-3 ml-1">Note: {note}</div>}
      </div>
    </div>
  );
};

export default ListItemPayment;
