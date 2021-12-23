import CCClassDescription from '@src/Manager/components/CCClassDescriptions';
import ClassActions from '@src/Manager/components/CreditActions';
import ClassStatusBlock, { ClassFundingRatio } from '@src/Manager/components/ClassStatusBlock';
import CryptoAddress from '@src/Manager/components/CryptoAddress';
import HashInstructions from '@src/Manager/components/HashInstructions';
import Loading from '../Loading';
import LoadingModal from '../ModalLoading';
import PaymentList from '@src/Manager/components/ListPayments';
import React, { FC, useContext } from 'react';
import SectionBlock from '@src/Manager/components/containers/SectionBlock';
import useClassDetails from 'hooks/useClassDetails';
import useProjectUsers from 'hooks/useProjectUsers';
import { ContributorCreditClass, Project, ProjectUser, User } from 'types';
import { GET_CONTRIBUTOR_CREDITS } from '@src/utils/dGraphQueries/crypto';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { GetClassTriggers } from '@src/utils/helpersCCClass';
import { useC2 } from '@src/web3/hooks/useC2';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';

type BaseProps = {
  project: Project;
  projectUsers: ProjectUser[];
  isProjectManager: boolean;
  memberAddresses: string[];
  user: User;
};

type DetailsProps = BaseProps & {
  CCClass: ContributorCreditClass;
};

const Details: FC<DetailsProps> = ({ CCClass, project, user, projectUsers, isProjectManager, memberAddresses }) => {
  const { name, cryptoAddress, agreement, triggers, id, triggerShortDescription, type } = CCClass;
  const { triggerFundraising, triggerRevenue } = GetClassTriggers(triggers);

  const c2 = useC2(cryptoAddress.address, memberAddresses);

  const { allClassPayments, myCreditPayments } = useClassDetails(projectUsers, user, agreement, id);

  const displayPayments = () => {
    if (isProjectManager && allClassPayments) {
      return <PaymentList payments={allClassPayments} projectUsers={projectUsers} projectLogo={project.info.logo} />;
    } else if (!isProjectManager && myCreditPayments) {
      return <PaymentList payments={myCreditPayments} projectLogo={project.info.logo} />;
    }
    return 'No payments to display';
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold">
        {name} {type}
      </h1>
      <div className="mb-6">
        <CryptoAddress label={'Address:'} address={cryptoAddress.address} chainId={cryptoAddress.chainId} />
        <ClassFundingRatio cryptoAddress={cryptoAddress.address} memberAddresses={memberAddresses} />
      </div>

      <div className="my-3 mb-6">
        <CCClassDescription
          classShortDescription={triggerShortDescription}
          projectName={project.name}
          triggerFundraising={triggerFundraising}
          triggerRevenue={triggerRevenue}
        />
      </div>
      <ClassStatusBlock cryptoAddress={cryptoAddress.address} memberAddresses={memberAddresses} />

      <SectionBlock sectionTitle="Payments" className="mt-6">
        {allClassPayments.length > 0 ? displayPayments() : 'No payments have yet been made from this class'}
      </SectionBlock>

      <ClassActions name={name} members={projectUsers} c2={c2} ccId={id} />
      <div className="mt-5">
        <HashInstructions hash={c2?.info.agreementHash} agreementText={agreement.text} />
      </div>
    </div>
  );
};

type CCClassDetailsProps = BaseProps & {
  classId: string;
};
const CCClassDetails: FC<CCClassDetailsProps> = ({
  classId,
  project,
  user,
  projectUsers,
  isProjectManager,
  memberAddresses,
}) => {
  const { data: classData } = useQuery(GET_CONTRIBUTOR_CREDITS, { variables: { id: classId } });
  const CCClass = classData?.getContributorCreditClass;
  if (!CCClass) {
    return <Loading />;
  }

  return (
    <Details
      project={project}
      CCClass={CCClass}
      projectUsers={projectUsers}
      isProjectManager={!!isProjectManager}
      memberAddresses={memberAddresses}
      user={user}
    />
  );
};

export default CCClassDetails;
