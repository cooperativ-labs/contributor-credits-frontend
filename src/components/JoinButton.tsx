import Dialog from '../containers/Dialog';
import JoinForm from '../MarketingSite/Forms/JoinForm';
import React, { useState } from 'react';
import { GeneralUseJoinButton, PopUp } from '@src/containers/Popup';

interface JoinButtonProps {
  name: string;
  generalUse?: boolean;
}

const JoinButton: React.FunctionComponent<JoinButtonProps> = ({ name, generalUse }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      {generalUse ? (
        <GeneralUseJoinButton
          action={() => {
            setDialogOpen(true);
          }}
          buttonText={`Join ${name}`}
          title={`Join ${name}`}
        />
      ) : (
        <PopUp
          action={() => {
            setDialogOpen(true);
          }}
          title={`Contact ${name}`}
          buttonText="Contact"
        />
      )}
      <Dialog
        visible={dialogOpen}
        onClose={(e) => {
          if (e.target.id === 'dialog-curtain' || e.currentTarget.id === 'close-button') setDialogOpen(false);
        }}
        className="w-11/12 md:w-1/2"
      >
        <JoinForm projectName={name} className="p-8" />
      </Dialog>
    </>
  );
};

export default JoinButton;
