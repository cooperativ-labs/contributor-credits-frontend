import ClassEstablish from '@src/Manager/pages/projects/credits/ClassEstablish';
import ManagerWrapper from '@src/Manager/ManagerWrapper';
import React from 'react';
import { GET_AVAILABLE_CONTRACT } from '@src/utils/dGraphQueries/crypto';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const EstablishClassPage: NextPage = ({}) => {
  const router = useRouter();
  const cryptoAddressId = router.query.cryptoid;
  const { loading, data, error } = useQuery(GET_AVAILABLE_CONTRACT, { variables: { id: cryptoAddressId } });
  const availableContract = data?.getSmartContractUnestablished;
  console.log(error);
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <ManagerWrapper loadingComponent={loading}>
        <ClassEstablish availableContract={availableContract} />
      </ManagerWrapper>
    </div>
  );
};

export default EstablishClassPage;
