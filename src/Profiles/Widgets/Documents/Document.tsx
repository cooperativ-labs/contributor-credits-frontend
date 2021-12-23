import Button from '@src/components/Buttons/Button';
import classNames from 'classnames';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDocTypeOption } from '@src/utils/enumConverters';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { ProjectInfoDocument } from 'types';

export interface DocumentProps {
  className?: string;
  document: ProjectInfoDocument;
}

const Document: React.FunctionComponent<DocumentProps> = ({ document, ...props }) => {
  const { className } = props;

  return (
    <a href={document.url} target={'_blank'} rel={'noreferrer'}>
      <div data-test="component-document" className={classNames(className, 'flex m-4 items-center')} {...props}>
        <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gray-300 mr-2 flex justify-center items-center text-3xl text-blue-900">
          <FontAwesomeIcon icon={`${getDocTypeOption(document.type).icon}` as IconName} />
        </div>
        <div className="flex-grow flex flex-col">
          <h1 className="font-bold">{document.title}</h1>
          <h2 className="text-gray-500 text-sm font-bold">{getDocTypeOption(document.type).subtitle}</h2>
        </div>
        <Button className="p-2 text-gray-400" aria-label="Open document">
          <FontAwesomeIcon icon="link" />
        </Button>
      </div>
    </a>
  );
};

export default Document;
