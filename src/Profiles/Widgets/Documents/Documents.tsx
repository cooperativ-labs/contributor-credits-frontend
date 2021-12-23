import classNames from 'classnames';
import Document from '@src/Profiles/Widgets/Documents/Document';
import React, { FC } from 'react';
import { ProjectInfoDocument } from 'types';

export interface DocumentsProps {
  className?: string;
  documents: ProjectInfoDocument[];
}

const Documents: FC<DocumentsProps> = ({ ...props }) => {
  const { className, documents } = props;

  return (
    <div data-test="component-documents" className={classNames(className, 'mt-8 md:mt-0')}>
      {documents.map((document, index) => {
        if (!document.hidden) return <Document key={index} document={document} />;
      })}
    </div>
  );
};

export default Documents;
