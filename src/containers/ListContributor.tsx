import classNames from 'classnames';
import Link from 'next/link';
import ListEntity from '@src/containers/ListEntity/ListEntity';
import React from 'react';
import useCurrencyFormatter from '@hooks/useCurrency';
import UserInfo from '@src/components/UserInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Payment } from 'types';
import { TotalCreditsWithValue } from '@src/utils/helpersMoney';
import { useRouter } from 'next/router';

export interface ListContributorProps {
  className?: string;
  id: string;
  displayName: string;
  title: string;
  thumbnail: string;
  coins: Payment[];
}

const ListContributor: React.FunctionComponent<ListContributorProps> = ({
  id,
  displayName,
  title,
  thumbnail,
  coins,
  ...props
}) => {
  const { className, ...rest } = props;
  const router = useRouter();
  const slug = router.query.id;

  return (
    <ListEntity className={classNames(className)} {...rest}>
      <Link href={`/project/${slug}/team/member/${id}`}>
        <a className="inline-block w-full flex" aria-label="To User Profile">
          <UserInfo displayName={displayName} title={title} thumbnail={thumbnail} compact />
          <div className="flex-grow" />
          <div style={{ minWidth: '40px' }} className="self-center mx-2 lg:mx-4 flex-shrink-0 text-sm lg:text-lg">
            <strong>
              {useCurrencyFormatter(TotalCreditsWithValue(coins).creditsReceived, 'Contributor Credits').rounded}
            </strong>{' '}
            <FontAwesomeIcon className="text-yellow-500" icon="coins" />
          </div>
          <div className="self-center text-gray-400 text-sm">
            <FontAwesomeIcon icon="arrow-right" />
          </div>
        </a>
      </Link>
    </ListEntity>
  );
};

export default ListContributor;
