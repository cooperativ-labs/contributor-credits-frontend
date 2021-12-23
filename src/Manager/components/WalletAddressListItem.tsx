import React, { FC } from 'react';

interface WalletAddressListItemProps {
  name: string;
  address: string;
}

const WalletAddressListItem: FC<WalletAddressListItemProps> = ({ name, address }) => {
  return (
    <div>
      <div>{name}</div>
      <div className="w-72 md:w-auto">
        <div className="truncate md:ext-lg font-bold text-gray-600">{address} </div>
      </div>
    </div>
  );
};

export default WalletAddressListItem;
