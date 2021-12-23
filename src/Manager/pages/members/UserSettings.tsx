import FormCard from '@src/Manager/components/cards/FormCard';
import Loading from '@src/Manager/components/Loading';
import React, { FC, useContext } from 'react';
import SettingsUserPersonalInfo from '@src/Manager/forms/SettingsUserPersonalInfo';
import SettingsUserSocial from '@src/Manager/forms/SettingsUserSocial';
import SettingsUserWallets from '@src/Manager/forms/SettingsUserWallets';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';

const UserSettings: FC = () => {
  const { userId } = useContext(UserContext);
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;

  if (!user) {
    return <Loading />;
  }

  return (
    <div data-test="component-landing" className="flex flex-col w-full h-full">
      <div>
        <FormCard center>
          <SettingsUserPersonalInfo user={user} />
        </FormCard>
        <FormCard center>
          <SettingsUserWallets user={user} />
        </FormCard>
        <FormCard center>
          <SettingsUserSocial user={user} />
        </FormCard>
      </div>
    </div>
  );
};

export default UserSettings;
