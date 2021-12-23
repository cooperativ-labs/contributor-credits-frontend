import Checkbox from './components/Checkbox';
import FormButton from '../components/buttons/FormButton';
import React, { FC, useState } from 'react';
import useIconsPrefix from '@hooks/useIconsPrefix';
import { ADD_JOB, UPDATE_JOB } from '@src/utils/dGraphQueries/opportunities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Input } from './components/Inputs';
import { makeRemovalList, makeSubmissionList } from '@src/utils/dGraphQueries/gqlUtils';
import { ProjectOpportunitiesJob } from 'types';
import { useMutation } from '@apollo/client';

const fieldDiv = 'pt-3 bg-opacity-0';
interface SettingsOpportunityJobProps {
  projectId?: string;
  job?: ProjectOpportunitiesJob;
}

const SettingsOpportunityJob: FC<SettingsOpportunityJobProps> = ({ job, projectId }) => {
  const [iconSelection, setIconSelection] = useState<string>();
  const [updateProjectOpportunitiesJob, { data: updateData, error: updateError }] = useMutation(UPDATE_JOB);
  const [addJob, { data: addData, error: addError }] = useMutation(ADD_JOB);
  const [incomingExpertise, setIncomingExpertise] = useState<string[]>(job?.expertise);
  const [alerted, setAlerted] = useState<boolean>(false);
  const jobId = job?.id;

  const error = updateError ?? addError;

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }
  if (updateData && !alerted) {
    alert(`Your opportunity was successfully updated!`);
    setIncomingExpertise(updateData.updateProjectOpportunitiesJob.projectOpportunitiesJob[0].expertise);
    setAlerted(true);
  }
  if (addData && !alerted) {
    alert(`Your opportunity was successfully added!`);
    setAlerted(true);
  }

  return (
    <Formik
      initialValues={{
        title: job ? job.title : '',
        icon: job ? job.icon : 'users',
        expertise: job ? job.expertise : '',
        description: job ? job.description : '',
        archived: job ? job.archived : false,
      }}
      validate={(values) => {
        setIconSelection(values.icon);
        const errors: any = {}; /** @TODO : Shape */
        if (!values.title) {
          errors.title = 'Please set a title';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const expertiseAdd = makeSubmissionList(values.expertise);
        setAlerted(false);
        setSubmitting(true);
        if (jobId) {
          const expertiseRemove = makeRemovalList(incomingExpertise, expertiseAdd);
          updateProjectOpportunitiesJob({
            variables: {
              jobId: jobId,
              title: values.title,
              icon: values.icon,
              description: values.description,
              archived: values.archived,
              expertiseRemove: expertiseRemove,
              expertiseAdd: expertiseAdd,
            },
          });
        } else {
          addJob({
            variables: {
              projectId: projectId,
              title: values.title,
              icon: values.icon,
              description: values.description,
              expertiseAdd: expertiseAdd,
            },
          });
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="">
          <div className="lg:grid grid-cols-9">
            <div className="col-span-7">
              <h2 className="text-xl md:mt-4 text-blue-900 font-semibold">
                {job ? `Update ${job.title}` : `Create a job`}
              </h2>
            </div>
            <div className="col-span-2 ">
              {job && (
                <div className="flex items-end">
                  <Checkbox className={fieldDiv} name="archived" checked={values.archived} />
                  <p className="mb-2 ml-2 text-sm text-blue-900 font-semibold text-opacity-80 ">Hide job</p>
                </div>
              )}
            </div>
          </div>
          <Input className={fieldDiv} required labelText="Title" name="title" type="text" placeholder="Data Analyst" />
          <div className="grid grid-cols-9">
            <div className="col-span-8">
              <Input className={fieldDiv} required labelText="Icon" name="icon" type="text" placeholder="users" />
              <div>
                You can see icon options{' '}
                <span className="underline">
                  <a href="https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free" target="_blank" rel="noreferrer">
                    here
                  </a>
                </span>
                .
              </div>
            </div>
            <div className="flex col-span-1 pt-2 items-center justify-center">
              <FontAwesomeIcon
                icon={[useIconsPrefix(iconSelection), iconSelection as IconName]}
                className="text-3xl text-gray-700"
              />
            </div>
          </div>
          <Input
            className={fieldDiv}
            textArea
            labelText="Expertise (comma-separated tags)"
            name="expertise"
            placeholder="UX Design, React, Government Regulation, Early 20th Century Russian History"
          />
          <div className="text-sm mt-6">
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
            className={fieldDiv}
            fieldHeight="h-96"
            labelText="Description"
            textArea
            name="description"
            placeholder=""
          />
          <FormButton
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4 w-full"
          >
            {job ? `Update ${job.title} Description` : `Add ${values.title}`}
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsOpportunityJob;
