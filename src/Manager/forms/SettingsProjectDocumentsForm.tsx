import FormButton from '../components/buttons/FormButton';
import React, { FC, useState } from 'react';
import Select from './components/Select';
import { defaultFieldDiv, Input } from './components/Inputs';
import { docTypeOptions } from '@src/utils/enumConverters';
import { Form, Formik } from 'formik';
import { ProjectInfoDocument, ProjectInfoDocumentType } from 'types';

import { UPDATE_PROJECT_DOCUMENT } from '@src/utils/dGraphQueries/project';
import { useMutation } from '@apollo/client';

import Checkbox from './components/Checkbox';

interface SettingsProjectDocumentsFormProps {
  projectInfoId?: string;
  addProjectDocument?: any;
  document?: ProjectInfoDocument;
}

const SettingsProjectDocumentsForm: FC<SettingsProjectDocumentsFormProps> = ({
  projectInfoId,
  addProjectDocument,
  document,
}) => {
  const [updateProjectDocument, { data, error }] = useMutation(UPDATE_PROJECT_DOCUMENT);
  const [alerted, setAlerted] = useState<boolean>(false);

  if (error && !alerted) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }
  if (data && !alerted) {
    alert(`Document was successfully updated!`);
    setAlerted(true);
  }

  const submitUpdate = async (title: string, type: ProjectInfoDocumentType, url: string, hidden: boolean) => {
    if (document) {
      await updateProjectDocument({
        variables: {
          documentId: document.id,
          title: title,
          type: type,
          url: url,
          hidden: hidden,
        },
      });
    }
    await addProjectDocument({
      variables: {
        projectInfoId: projectInfoId,
        title: title,
        type: type,
        url: url,
      },
    });
  };

  return (
    <Formik
      initialValues={{
        title: document ? document.title : '',
        type: document ? document.type : undefined,
        url: document ? document.url : '',
        hidden: document ? document.hidden : false,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.title) {
          errors.name = 'Please set a title';
        }
        if (!values.type || values.type === undefined) {
          errors.name = 'Please choose a type';
        }
        if (!values.url || values.url === '') {
          errors.name = 'Please include a link';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await submitUpdate(values.title, values.type, values.url, values.hidden);
        setAlerted(false);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="">
          <div className="md:grid grid-cols-9 gap-4">
            <div className="col-span-2">
              <Input className={defaultFieldDiv} name="title" type="text" placeholder="Business Plan" />
            </div>
            <div className="col-span-3">
              <Select className={defaultFieldDiv} name="type">
                <option value="">Select type</option>;
                {docTypeOptions.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div className="col-span-3">
              <Input className={defaultFieldDiv} name="url" type="text" placeholder="https://notion.so/your-document" />
            </div>
            <div className="col-span-1 flex items-center">
              <Checkbox className="" name="hidden" checked={values.hidden} />
            </div>
          </div>
          <FormButton
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4 w-full"
          >
            {document ? 'Update' : `Add Document`}
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsProjectDocumentsForm;
