import EmailAddressList from '@src/Manager/components/EmailAddressList';
import FormCard from '@src/Manager/components/cards/FormCard';
import Loading from '@src/Manager/components/Loading';
import React, { FC, useContext } from 'react';
import SettingsUserEmails from '@src/Manager/forms/SettingsUserEmails';
import SettingsUserPersonalInfo from '@src/Manager/forms/SettingsUserPersonalInfo';
import SettingsUserWallets from '@src/Manager/forms/SettingsUserWallets';
import WalletAddressList from '@src/Manager/components/WalletAddressList';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';

const UserSettings: FC = () => {
  const { userId } = useContext(UserContext);
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.queryUser[0];

  if (!user) {
    return <Loading />;
  }
  return (
    <div data-test="component-landing" className="flex flex-col w-full h-full mt-4">
      <div>
        <FormCard center>
          <SettingsUserPersonalInfo user={user} />
        </FormCard>
        <FormCard center>
          <h2 className="text-xl text-blue-900 font-semibold mb-4">Wallet Addresses</h2>
          <WalletAddressList walletAddresses={user.walletAddresses} withEdit />
          <SettingsUserWallets user={user} />
        </FormCard>
        <FormCard center>
          <h2 className="text-xl text-blue-900 font-semibold mb-4">Email Addresses </h2>
          <EmailAddressList emailAddresses={user.emailAddresses} withEdit />
          <SettingsUserEmails user={user} />
        </FormCard>
      </div>
    </div>
  );
};

export default UserSettings;
