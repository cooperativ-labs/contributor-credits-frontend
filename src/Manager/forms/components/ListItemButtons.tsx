import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type MarkPublicProps = {
  isPublic: boolean;
};

export const MarkPublic: FC<MarkPublicProps> = ({ isPublic }) => {
  return (
    <div className="items-center font-bold">
      {isPublic ? (
        <div className="text-sm text-green-600"> Public </div>
      ) : (
        <div className="text-sm text-red-600"> Not public </div>
      )}
    </div>
  );
};

type EditButtonProps = {
  toggle: boolean;
  setToggle: any;
};

export const EditButton: FC<EditButtonProps> = ({ toggle, setToggle }) => {
  return (
    <button aria-label="edit address info" onClick={() => setToggle(!toggle)}>
      {toggle ? (
        <FontAwesomeIcon icon="times" className="text-xl text-gray-600 mr-2" />
      ) : (
        <FontAwesomeIcon icon="pen" className="text-xl text-gray-600 mr-2" />
      )}
    </button>
  );
};
