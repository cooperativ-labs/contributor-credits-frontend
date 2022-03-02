import React, { FC } from 'react';
import { GET_USERS } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';

const ShowCurrentUsers: FC = () => {
  const { data } = useQuery(GET_USERS);

  return <> {console.log(data.queryUser.user)} </>;
};

export default ShowCurrentUsers;
