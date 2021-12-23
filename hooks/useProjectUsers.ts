import { AgreementSignatory, Project, ProjectUser, ProjectUserRole, User } from 'types';

export type ProjectUsersType = {
  projectUsers: ProjectUser[];
  creators: ProjectUser[];
  contributors: ProjectUser[];
  advisors: ProjectUser[];
  investors: ProjectUser[];
  supporters: ProjectUser[];
  isProjectManager: boolean;
  myProjectUser: ProjectUser;
  projectSignatories: AgreementSignatory[];
  memberAddresses: string[];
};

export const getUsersByRole = (projectUsers: ProjectUser[], roleType: string) => {
  return projectUsers?.filter((user) => {
    return user?.roles.map((role) => {
      if (role.toString() === roleType) {
        return user.user;
      }
      return;
    })[0];
  });
};

export const getMyProjectUser = (projectUsers: ProjectUser[], user: User) => {
  return projectUsers.find((projectUser) => projectUser.user.id === user.id);
};

export const isProjectManager = (creators: ProjectUser[], userId) => {
  return creators.find((creator) => creator.user.id === userId);
};

export const getSignatoriesFromProjectUsers = (projectUsers) => {
  return projectUsers
    .map((pUser) => {
      return pUser.agreements;
    })
    .flat();
};

const getMemberAddresses = (projectUsers: ProjectUser[]) => {
  const withWallet = projectUsers.filter((pUser) => !!pUser.user.walletAddresses[0]);
  return withWallet.map((pUser) => pUser.user.walletAddresses[0].address);
};

const useProjectUsers = (project: Project, user: User): ProjectUsersType => {
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
