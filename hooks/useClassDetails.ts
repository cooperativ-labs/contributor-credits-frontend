import { GetCcPayments, GetPaymentsFromProjectUsers } from '@src/utils/helpersMoney';
import { Agreement, Payment, ProjectUser, User } from 'types';
import { getMyProjectUser } from './useProjectUsers';

export type ClassDetailsType = {
  allClassPayments: Payment[];
  myCreditPayments: Payment[];
};

const useClassDetails = (
  projectUsers: ProjectUser[],
  user: User,
  agreement: Agreement,
  classId: string
): ClassDetailsType => {
  const myProjectUser = getMyProjectUser(projectUsers, user);
  const mySignatory = agreement.signatories.find((signatory) => signatory.projectUser.id === myProjectUser.id);
  const allProjectPayments = GetPaymentsFromProjectUsers(projectUsers);
  const allClassPayments = GetCcPayments(allProjectPayments, classId);
  const myProjectPayments = mySignatory && GetPaymentsFromProjectUsers([myProjectUser]);
  const myCreditPayments = myProjectPayments && GetCcPayments(myProjectPayments, classId);

  const classDetails = {
    // myProjectUser,
    // mySignatory,
    allClassPayments,
    myCreditPayments,
  };

  return classDetails;
};

export default useClassDetails;
