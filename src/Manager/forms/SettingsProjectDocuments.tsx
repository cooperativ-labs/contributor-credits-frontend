import FormButton from '../components/buttons/FormButton';
import React, { FC, useState } from 'react';
import Select from './components/Select';
import { defaultFieldLabelClass, Input } from './components/Inputs';
import { docTypeOptions } from '@src/utils/enumConverters';
import { Form, Formik } from 'formik';
import { Project } from 'types';

import SettingsProjectDocumentsForm from './SettingsProjectDocumentsForm';
import { ADD_PROJECT_DOCUMENT } from '@src/utils/dGraphQueries/project';
import { useMutation } from '@apollo/client';

interface SettingsProjectDocumentsProps {
  project?: Project;
}

const SettingsProjectDocuments: FC<SettingsProjectDocumentsProps> = ({ project }) => {
  const [addProjectDocument, { data, error }] = useMutation(ADD_PROJECT_DOCUMENT);
  const [alerted, setAlerted] = useState<boolean>(false);

  if (error && !alerted) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }
  if (data && !alerted) {
    alert(`Document successfully added!`);
    setAlerted(true);
  }

  return (
    <>
      <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">Project Documents</h2>
      <div className="md:grid grid-cols-9 gap-4 mt-4">
        <div className="col-span-2">
          <div className={defaultFieldLabelClass}> Title </div>
        </div>
        <div className="col-span-3">
          <div className={defaultFieldLabelClass}> Type </div>
        </div>
        <div className="col-span-3">
          <div className={defaultFieldLabelClass}> Link </div>
        </div>
        <div className="col-span-1">
          <div className={defaultFieldLabelClass}> Hide </div>
        </div>
      </div>
      {project.info.documents.map((document, i) => {
        return <SettingsProjectDocumentsForm key={i} document={document} />;
      })}
      <SettingsProjectDocumentsForm addProjectDocument={addProjectDocument} projectInfoId={project.info.id} />
    </>
  );
};

export default SettingsProjectDocuments;
