import CCClassDescription from '@src/Manager/components/CCClassDescriptions';
import ClassActions from '@src/Manager/components/CreditActions';
import ClassStatusBlock, { ClassFundingRatio } from '@src/Manager/components/ClassStatusBlock';
import FormattedCryptoAddress from '@src/Manager/components/FormattedCryptoAddress';
import HashInstructions from '@src/Manager/components/HashInstructions';
import Loading from '../Loading';
import PaymentList from '@src/Manager/components/ListPayments';
import React, { FC } from 'react';
import SectionBlock from '@src/Manager/components/containers/SectionBlock';
import { ClassStatus } from '@src/utils/classStatus';
import { ContractManager } from '@src/Manager/pages/Dashboard';
import { ContributorCreditClass, Payment, User } from 'types';
import { GET_CONTRIBUTOR_CREDITS } from '@src/utils/dGraphQueries/crypto';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { GetClassTriggers } from '@src/utils/helpersCCClass';
import { useC2 } from '@src/web3/hooks/useC2';
import { useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

type BaseProps = {
  user: User;
};

type DetailsProps = BaseProps & {
  CCClass: ContributorCreditClass;
};

const Details: FC<DetailsProps> = ({ CCClass, user }) => {
  const { account } = useWeb3React<Web3Provider>();
  const { name, cryptoAddress, agreement, triggers, id, triggerShortDescription, type } = CCClass;
  const { triggerFundraising, triggerRevenue } = GetClassTriggers(triggers);
  const memberAddresses = agreement.payments.map((payment) => payment.recipient);

  const c2 = useC2(cryptoAddress.address, memberAddresses);

  const isContractManager = ContractManager(agreement, user);

  //this should filter for payments to that recipient
  const allPayments = agreement.payments;
  const myPayments = allPayments.filter((payment) => payment.recipient === account);

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
        <FormattedCryptoAddress
          label={'Address:'}
          address={cryptoAddress.address}
          chainId={cryptoAddress.chainId}
          withCopy
        />
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

      {allPayments.length > 0 && (
        <SectionBlock sectionTitle="Payments" className="mt-6">
          {displayPayments()}
        </SectionBlock>
      )}

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
const CCClassDetails: FC<CCClassDetailsProps> = ({ classId, user }) => {
  const { data: classData } = useQuery(GET_CONTRIBUTOR_CREDITS, { variables: { id: classId } });
  const CCClass = classData?.getContributorCreditClass;
  if (!CCClass) {
    return <Loading />;
  }

  return <Details CCClass={CCClass} user={user} />;
};

export default CCClassDetails;
