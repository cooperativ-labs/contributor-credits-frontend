import AddAgreementToAccount from '@src/Manager/admin/AddAgreementToAccount';
import AddCcContract from '@src/Manager/admin/AddCcContract';
import CCClassDetails from '@src/Manager/components/containers/ClassDetails';
import React from 'react';
import UpdateAgreementText from '@src/Manager/admin/UpdateAgreementText';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { WalletOwnerContext } from '@src/SetAppContext';

const Admin: React.FC = () => {
  const { uuid } = React.useContext(WalletOwnerContext);
  const [selectedUUID, setSelectedUUID] = React.useState(null);
  const [selectedClassId, setSelectedClassId] = React.useState(null);

  const { data: userData, error: userError } = useQuery(GET_USER, {
    variables: { uuid: selectedUUID },
  });
  const user = userData?.queryUser[0];

  console.log(userError, userData);

  return uuid === '0x531518985601FE8866fd5F39e9a3754F1fc38296' ? (
    <div className="mx-auto w-5/12">
      <AddCcContract />
      <AddAgreementToAccount />
      <UpdateAgreementText />
      <hr className="border-t-2 my-6 border-gray-300" />
      <div className="my-3">
        UUID: <input name="user" onChange={(e) => setSelectedUUID(e.target.value)} />
      </div>
      <div className="my-3">
        ClassID: <input name="user" onChange={(e) => setSelectedClassId(e.target.value)} />
      </div>
      {user && selectedClassId && <CCClassDetails classId={selectedClassId} user={user} />}
    </div>
  ) : (
    <></>
  );
};

export default Admin;
