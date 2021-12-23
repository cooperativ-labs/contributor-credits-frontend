import { User } from 'types/';

export const getUsersByRole = (projectUsers, roleType: string) => {
  return projectUsers?.filter((user) => {
    return user?.roles.map((role) => {
      if (role.toString() === roleType) {
        return user.user;
      }
      return;
    })[0];
  });
};

export const getMyProjectUser = (projectUsers, user: User) => {
  return projectUsers.find((projectUser) => projectUser.user.id === user.id);
};

export const isProjectManager = (creators, userId) => {
  return creators.find((creator) => creator.user.id === userId);
};

export const getSignatoriesFromProjectUsers = (projectUsers) => {
  return projectUsers
    .map((pUser) => {
      return pUser.agreements;
    })
    .flat();
};

const getMemberAddresses = (projectUsers) => {
  const withWallet = projectUsers.filter((pUser) => !!pUser.user.walletAddresses[0]);
  return withWallet.map((pUser) => pUser.user.walletAddresses[0].address);
};

const useProjectUsers = (project, user: User) => {
  const projectUsers = project?.projectUsers;
  const creators = getUsersByRole(projectUsers, ProjectUserRole.Creator);
  const contributors = getUsersByRole(projectUsers, ProjectUserRole.Contributor);
  const advisors = getUsersByRole(projectUsers, ProjectUserRole.Advisor);
  const investors = getUsersByRole(projectUsers, ProjectUserRole.Investor);
  const supporters = getUsersByRole(projectUsers, ProjectUserRole.Supporter);
  const isProjectManager = !!creators.find((creator) => creator.user.id === user.id);
  const myProjectUser = getMyProjectUser(projectUsers, user);
  const projectSignatories = getSignatoriesFromProjectUsers(projectUsers);
  const memberAddresses = getMemberAddresses(projectUsers);

  const projectUsersData = {
    projectUsers,
    creators,
    contributors,
    advisors,
    investors,
    supporters,
    isProjectManager,
    myProjectUser,
    projectSignatories,
    memberAddresses,
  };

  return projectUsersData;
};

export default useProjectUsers;
