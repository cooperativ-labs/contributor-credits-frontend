import ActionDialog from '@src/Manager/components/ActionDialog';
import ChooseConnectorButton from '@src/Manager/ChooseConnectorButton';
import CreateCcClass from '@src/Manager/forms/CreateCcClass';
import FormChainWarning from '@src/Manager/components/FormChainWarning';
import ManageCredits from '@src/Manager/forms/ManageCredits';
import React, { FC, useState } from 'react';
import StandardButton from '@src/Manager/components/buttons/StandardButton';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

type ActionsBlock = {
  isProjectManager: boolean;
  projectId: string;
  userId: string;
};

const ActionsBlock: FC<any> = ({ isProjectManager, projectId, userId }) => {
  const { active } = useWeb3React<Web3Provider>();
  const [mainActionDialog, setMainActionDialog] = useState(false);
  const [deployDialog, setDeployDialogVisible] = useState(false);
  const [preventClose, setPreventClose] = useState<boolean>(false);

  const HowToCreate =
    "Create a new class by first publishing a smart contract to Ethereum, then 'Establishing' it by attaching a legal contract. You can begin paying Credits once the Class has been established.";
  if (active) {
    return (
      <div className="mt-10">
        {isProjectManager ? (
          <>
            <StandardButton
              className="mt-2 "
              outlined
              color="blue"
              text="Create New Class"
              onClick={() => setDeployDialogVisible(true)}
            />
            <ActionDialog
              visible={deployDialog}
              preventClose={preventClose}
              onClose={(e) => {
                if (e.target.id === 'dialog-curtain' || e.currentTarget.id === 'close-button')
                  setDeployDialogVisible(false);
              }}
            >
              <div className="my-3 text-sm">{HowToCreate}</div>
              <CreateCcClass projectId={projectId} userId={userId} setPreventClose={setPreventClose} />
              <FormChainWarning />
            </ActionDialog>
             
          </>
        ) : (
          <>
            <StandardButton
              className="mt-2 "
              outlined
              link=""
              color="blue"
              text="Manage Credits"
              onClick={() => {
                setMainActionDialog(true);
              }}
            />
            <ActionDialog
              visible={mainActionDialog}
              onClose={(e) => {
                if (e.target.id === 'dialog-curtain' || e.currentTarget.id === 'close-button')
                  setMainActionDialog(false);
              }}
            >
              <ManageCredits />
              <FormChainWarning />
            </ActionDialog>
          </>
        )}
      </div>
    );
  }
  return <ChooseConnectorButton buttonText="Connect wallet manage Contributor Credits" large />;
};

export default ActionsBlock;
