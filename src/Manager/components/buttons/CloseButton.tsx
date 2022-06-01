import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CloseButtonProps = {
  onClose: () => void;
  className?: string;
};

const CloseButton: FC<CloseButtonProps> = ({ onClose, className }) => {
  return (
    <button
      id="close-button"
      onClick={(e) => {
        e.preventDefault();
        onClose();
      }}
      className={
        className ? className : 'absolute -top-1 right-0 hover:shadow-lg text-gray-800 w-10 h-10 m-2 rounded-full'
      }
    >
      <FontAwesomeIcon icon="times" />
    </button>
  );
};

export default CloseButton;
