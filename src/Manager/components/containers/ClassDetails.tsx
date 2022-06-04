import CCClassDescription from '@src/Manager/components/CCClassDescriptions';
import ClassActions from '@src/Manager/components/CreditActions';
import ClassStatusBlock, { ClassFundingRatio } from '@src/Manager/components/ClassStatusBlock';
import FormattedCryptoAddress from '@src/Manager/components/FormattedCryptoAddress';
import HashInstructions from '@src/Manager/components/HashInstructions';
import Loading from '../Loading';
import PaymentList from '@src/Manager/components/ListPayments';
import React, { FC } from 'react';
import SectionBlock from '@src/Manager/components/containers/SectionBlock';
import { ContractManager } from '@src/Manager/pages/Dashboard';
import { ContributorCreditClass, SmartContractType, User } from 'types';
import { GET_CONTRIBUTOR_CREDITS } from '@src/utils/dGraphQueries/crypto';
import { GetClassTriggers } from '@src/utils/helpersCCClass';
import { useC2 } from '@src/web3/hooks/useC2';
import { useC3 } from '@src/web3/hooks/useC3';
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
  const activeCC =
    type === SmartContractType.C3
      ? useC3(cryptoAddress.address, memberAddresses)
      : useC2(cryptoAddress.address, memberAddresses);

  const isC2 = type === SmartContractType.C2;
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
          address={activeCC?.contract.address}
          chainId={cryptoAddress.chainId}
          withCopy
        />
        <div className="text-xs uppercase text-gray-600">
          {activeCC && isC2 && <ClassFundingRatio activeCC={activeCC} />}
        </div>
      </div>
      <div className="my-3 mb-6">
        <CCClassDescription
          payerName={agreement.organizationName}
          classShortDescription={triggerShortDescription}
          triggerFundraising={triggerFundraising}
          triggerRevenue={triggerRevenue}
        />
      </div>
      <ClassStatusBlock activeCC={activeCC} isContractManager={!!isContractManager} />
      {allPayments.length > 0 && (
        <SectionBlock sectionTitle="Payments" className="mt-6">
          {displayPayments()}
        </SectionBlock>
      )}

      <ClassActions chainId={cryptoAddress.chainId} activeCC={activeCC} ccId={id} agreementId={agreement.id} />
      <div className="mt-5">{activeCC && <HashInstructions activeCC={activeCC} agreementText={agreement.text} />}</div>
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
