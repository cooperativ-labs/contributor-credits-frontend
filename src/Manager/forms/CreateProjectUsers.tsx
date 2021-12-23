import { initializeApollo } from '@src/utils/apolloClient';

import React, { FC, useState } from 'react';
import Select from './components/Select';

import ReactiveSelect from './components/ReactiveSelect';
import { ADD_PROJECT_USER } from '@src/utils/dGraphQueries/projectUser';
import { checkUserAdded } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { GET_USERS } from '@src/utils/dGraphQueries/user';
import { Input } from './components/Inputs';
import { Project } from 'types';
import { roleOptions } from '@src/utils/enumConverters';
import { useMutation } from '@apollo/client';
const fieldDiv = 'pt-3 my-2 bg-opacity-0';

interface CreateProjectUsersProps {
  project?: Project;
}

const CreateProjectUsers: FC<CreateProjectUsersProps> = ({ project }) => {
  const apolloClient = initializeApollo();
  const [users, setUsers] = useState(undefined);
  const [alerted, setAlerted] = useState<boolean>(false);
  async function getUserList() {
    await apolloClient
      .query({
        query: GET_USERS(),
      })
      .then((result) => {
        setUsers(result.data.queryUser);
      });
  }

  getUserList();

  const userOptions = users?.map((user) => {
    return { value: { id: user.id, fullName: user.fullName }, label: user.fullName };
  });

  const [addProjectUser, { data, error }] = useMutation(ADD_PROJECT_USER);

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }
  if (data && !alerted) {
    alert(`${data.addProjectUser.projectUser[0].project.name} was successfully updated!`);
    setAlerted(true);
  }

  return (
    <Formik
      initialValues={{
        user: { id: '', fullName: '' },
        role: '',
        title: '',
        description: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (values.user.id === '') {
          errors.user = 'You must select a user';
        } else if (checkUserAdded(project, values.user.id)) {
          errors.user = 'That user is already associated with this project';
        }
        if (!values.title) {
          errors.title = 'Please set a title';
        }
        if (!values.role) {
          errors.role = 'Please choose a role';
        }
        if (!values.description) {
          errors.description = 'Please set a description';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        setAlerted(false);
        addProjectUser({
          variables: {
            projectId: project.id,
            role: values.role,
            title: values.title,
            userId: values.user.id,
            agreementTitle: `${values.user.fullName} joins ${project.name}`,
            agreementText: values.description,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="">
          <h2 className="text-xl md:mt-8 mb-6 text-blue-900 font-semibold">Add a collaborator</h2>
          <ReactiveSelect name="user" required labelText="Select a member" options={userOptions} />
          <Input
            className={fieldDiv}
            required
            labelText="Job title"
            name="title"
            type="text"
            placeholder="Software Engineer"
          />
          <Input
            className={fieldDiv}
            required
            textArea
            labelText="Job Description"
            name="description"
            type="text"
            placeholder="Helping us build the frontend for our platform"
          />

          <Select required className={fieldDiv} labelText="Project role" name="role">
            <option value="">Select role</option>;
            {roleOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </Select>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4 w-full"
          >
            {`Add ${values.user.fullName} to ${project.name}`}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProjectUsers;
