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
import { ContributorCreditClass, Payment, User } from 'types';
import { GET_CONTRIBUTOR_CREDITS } from '@src/utils/dGraphQueries/crypto';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { GetClassTriggers } from '@src/utils/helpersCCClass';
import { useC2 } from '@src/web3/hooks/useC2';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';

type BaseProps = {
  isContractManager: boolean;
  memberAddresses: string[];
  user: User;
};

type DetailsProps = BaseProps & {
  CCClass: ContributorCreditClass;
};

const Details: FC<DetailsProps> = ({ CCClass, user, isContractManager, memberAddresses }) => {
  const { name, cryptoAddress, agreement, triggers, id, triggerShortDescription, type } = CCClass;
  const { triggerFundraising, triggerRevenue } = GetClassTriggers(triggers);

  const c2 = useC2(cryptoAddress.address, memberAddresses);

  //this should filter for payments to that recipient
  const allPayments = agreement.payments;
  console.log(agreement);
  const { myPayments } = useClassDetails(agreement);

  const displayPayments = () => {
    if (isContractManager && allPayments) {
      return <PaymentList payments={allPayments} />;
    } else if (!isContractManager && myPayments) {
      return <PaymentList payments={myPayments} />;
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
          payerName={agreement.organizationName}
          classShortDescription={triggerShortDescription}
          triggerFundraising={triggerFundraising}
          triggerRevenue={triggerRevenue}
        />
      </div>
      <ClassStatusBlock cryptoAddress={cryptoAddress.address} memberAddresses={memberAddresses} />

      <SectionBlock sectionTitle="Payments" className="mt-6">
        {allPayments.length > 0 ? displayPayments() : 'No payments have yet been made from this class'}
      </SectionBlock>

      <ClassActions name={name} chainId={cryptoAddress.chainId} c2={c2} ccId={id} agreementId={agreement.id} />
      <div className="mt-5">
        <HashInstructions hash={c2?.info.agreementHash} agreementText={agreement.text} />
      </div>
    </div>
  );
};

type CCClassDetailsProps = BaseProps & {
  classId: string;
};
const CCClassDetails: FC<CCClassDetailsProps> = ({ classId, user, isContractManager, memberAddresses }) => {
  const { data: classData } = useQuery(GET_CONTRIBUTOR_CREDITS, { variables: { id: classId } });
  const CCClass = classData?.getContributorCreditClass;
  if (!CCClass) {
    return <Loading />;
  }

  return (
    <Details CCClass={CCClass} isContractManager={!!isContractManager} memberAddresses={memberAddresses} user={user} />
  );
};

export default CCClassDetails;
