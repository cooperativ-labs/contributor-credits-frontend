import { initializeApollo } from '@src/utils/apolloClient';
import { GET_USERS } from '@src/utils/dGraphQueries/user';
import React, { FC, useState } from 'react';

const ShowCurrentUsers: FC = () => {
  const apolloClient = initializeApollo();
  const [users, setUsers] = useState(undefined);
  async function getUserList() {
    await apolloClient
      .query({
        query: GET_USERS(),
      })
      .then((result) => {
        setUsers(result.data.queryUser);
      });
  }

  getUserList();

  return <> {console.log(users)} </>;
};

export default ShowCurrentUsers;
