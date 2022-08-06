import AddAgreementToAccount from '@src/Manager/admin/AddAgreementToAccount';
import AddCcContract from '@src/Manager/admin/AddcCContract';
import UpdateAgreementText from '@src/Manager/admin/UpdateAgreementText';
import { WalletOwnerContext } from '@src/SetAppContext';
import React from 'react';

const Admin: React.FC = () => {
  const { uuid } = React.useContext(WalletOwnerContext);

  return uuid === '0x531518985601FE8866fd5F39e9a3754F1fc38296' ? (
    <div className="mx-auto w-5/12">
      <AddCcContract />

      <AddAgreementToAccount />
      <UpdateAgreementText />
    </div>
  ) : (
    <></>
  );
};

export default Admin;
