import cn from 'classnames';
import HeaderPrimary from '@src/components/HeaderPrimary';
import Link from 'next/link';
import React from 'react';
import StatBlock from '@src/components/StatBlock';
import TwoColumnCard from '@src/containers/Organisms/TwoColumnCard';
import useCurrencyFormatter from '@hooks/useCurrency';
import UserInfo from '@src/components/UserInfo';
import useTotalMemberHours from '@hooks/useMemberHours';
import useWindowSize from '@hooks/useWindowSize';
import { AddFinancialInvestmentsAmount } from '@src/utils/helpersMoney';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export interface ListCreatorProps {
  creator;
}

const ListCreator: React.FunctionComponent<ListCreatorProps> = ({ creator }) => {
  const router = useRouter();
  const slug = router.query.id;
  const windowSize = useWindowSize();

  const { hopes, user, title, timeCommitment, financialInvestments } = creator;
  return (
    <div className="mb-8">
      <TwoColumnCard
        slot1={
          <div className={cn(!hopes && 'md:justify-center flex flex-col h-full')}>
            <UserInfo
              displayName={user.displayName ?? user.fullName}
              title={title}
              thumbnail={user.profileImage}
              bio={user.biography}
            />
          </div>
        }
        slot2={
          <section className="flex flex-col">
            <HeaderPrimary className="hidden md:inline-block">My Commitments</HeaderPrimary>
            <div className="flex flex-row md:flex-col mb-4 justify-center md:justify-start w-min md:w-max m-auto">
              {timeCommitment && (
                <StatBlock
                  className="mt-4"
                  type="hours"
                  value={useTotalMemberHours(timeCommitment).toString()}
                  compact={windowSize.width < 768}
                />
              )}
              <StatBlock
                className="mt-4"
                type="coins"
                value={`${
                  useCurrencyFormatter(
                    AddFinancialInvestmentsAmount(financialInvestments),
                    financialInvestments[0]?.currency
                  ).rounded
                }`}
                compact={windowSize.width < 768}
              />
            </div>
            <Link href={`/project/${slug}/team/creator/${user.id}`}>
              <a className=" text-xs text-green-500 font-bold text-center m-auto md:mx-10">
                More About {user.displayName ?? user.fullName}
                <FontAwesomeIcon className="ml-2" icon="arrow-right" />
              </a>
            </Link>
          </section>
        }
      />
    </div>
  );
};
export default ListCreator;
