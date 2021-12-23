import ListItemMember from './ListItemMember';
import React from 'react';
import { ProjectUser } from 'types';

interface UserListProps {
  users: ProjectUser[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      {users.map((user, i) => (
        <ListItemMember
          key={i}
          imageSrc={user.user.profileImage}
          title={user.user.fullName}
          role={user.roles[0]}
          subtitle={user.title}
        />
      ))}
    </div>
  );
};

export default UserList;
