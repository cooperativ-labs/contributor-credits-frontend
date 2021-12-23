import FormButton from '../components/buttons/FormButton';
import React, { FC } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { Input } from './components/Inputs';
import { Project } from 'types';
import { UPDATE_PROJECT_FULL_DESCRIPTION } from '@src/utils/dGraphQueries/project';
import { useMutation } from '@apollo/client';
interface SettingsProjectFullDescriptionProps {
  project?: Project;
}

const SettingsProjectFullDescription: FC<SettingsProjectFullDescriptionProps> = ({ project }) => {
  const [updateProjectInfo, { data, error }] = useMutation(UPDATE_PROJECT_FULL_DESCRIPTION);

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }

  if (data) {
    alert(`${data.updateProject.project[0].name} was successfully updated!`);
  }

  return (
    <Formik
      initialValues={{
        generalDescription: project.info.generalDescription,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.generalDescription) {
          errors.generalDescription = 'Please set a Description';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        updateProjectInfo({
          variables: {
            currentDate: currentDate,
            projectSlug: project.slug,
            projectInfoId: project.info.id,
            description: values.generalDescription,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="md:flex flex-col md:flex-shrink md:h-full">
          <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">Project Description</h2>
          <div className="text-sm mt-1">
            You can add styling to this text using{' '}
            <span className="underline">
              <a
                href="https://rawgit.com/fletcher/human-markdown-reference/master/index.html"
                target="_blank"
                rel="noreferrer"
              >
                Markdown
              </a>
            </span>
            .
          </div>
          <Input
            className="pt-3 bg-opacity-0 h-full"
            fieldHeight="h-96 md:h-full"
            textArea
            name="generalDescription"
            placeholder=""
          />
          <FormButton
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4 w-full"
          >
            {`Update ${project.name} Description`}
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsProjectFullDescription;
