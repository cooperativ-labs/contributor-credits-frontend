import Popup from 'reactjs-popup';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface DialogProps {
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element);
  body: React.ReactNode;
}

const Dialog: React.FunctionComponent<DialogProps> = ({ body, trigger }) => {
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div>
          <button
            onClick={close}
            className="close-button absolute border-4 border-white bg-red-500 hover:bg-red-400 text-white -top-6 -right-6 w-12 h-12 rounded-full"
          >
            <FontAwesomeIcon icon="times" />
          </button>

          {body}
        </div>
      )}
    </Popup>
  );
};

export default Dialog;
