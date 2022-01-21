import React, { FC } from 'react';
import WalletAddressListItem from './WalletAddressListItem';
import { CryptoAddress } from 'types';

type WalletAddressListProps = {
  walletAddresses: CryptoAddress[];
  withEdit?: boolean;
};

const WalletAddressList: FC<WalletAddressListProps> = ({ walletAddresses, withEdit }) => {
  return (
    <div className="w-full">
      {walletAddresses.map((wallet, i) => {
        return (
          <div className="mb-3" key={i}>
            <WalletAddressListItem wallet={wallet} withEdit={withEdit} />
          </div>
        );
      })}
    </div>
  );
};

export default WalletAddressList;
