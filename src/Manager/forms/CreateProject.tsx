import Button from '@src/components/Buttons/Button';
import Link from 'next/link';
import React, { FC, useContext, useState } from 'react';
import Select from './components/Select';
import { ADD_PROJECT } from '@utils/dGraphQueries/project';
import { categoryOptions, intentionOptions, progressOptions } from '@utils/enumConverters';
import { checkSlugTaken, currentDate, formatSlug } from '@utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { Input } from './components/Inputs';
import { useMutation, useQuery } from '@apollo/client';
import { UserContext } from '@utils/SetUserContext';
import { useRouter } from 'next/router';
const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const CreateProject: FC = () => {
  const { userId } = useContext(UserContext);
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;
  const [addProject, { data, error }] = useMutation(ADD_PROJECT);
  const [slugTaken, setSlugTaken] = useState(true);

  if (!user) {
    return <></>;
  }

  const organizations = user.organizations;

  const router = useRouter();

  const slugCheck = (slug) => {
    checkSlugTaken(slug).then((res) => {
      setSlugTaken(res);
    });
  };

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }

  if (data) {
    // alert(`${data.addProject.project[0].name} was successfully created!`);
    window.sessionStorage.setItem('CHOSEN_PROJECT', data.addProject.project[0].slug);
    router.push(`/manager/${data.addProject.project[0].slug}`);
  }

  return (
    <Formik
      initialValues={{
        organization: organizations[0].organization?.id,
        name: '',
        slug: '',
        yourTitle: '',
        timeCommitment: '',
        shortDescription: '',
        brandColor: '#d3d3d3',
        category: '',
        intention: '',
        progress: '',
        website: '',
      }}
      validate={(values) => {
        slugCheck(values.slug);
        const errors: any = {}; /** @TODO : Shape */
        if (!values.name) {
          errors.name = 'Please set an name';
        }
        if (!values.yourTitle) {
          errors.yourTitle = 'Please include your title/role';
        }
        if (!values.timeCommitment) {
          errors.timeCommitment = 'Please indicate your time commitment';
        } else if (typeof values.timeCommitment !== 'number') {
          errors.timeCommitment = 'This must be a number';
        }
        if (!values.slug) {
          errors.slug = 'Please choose a domain';
        } else if (slugTaken) {
          errors.slug = 'That domain is already taken';
        }
        if (!values.shortDescription) {
          errors.shortDescription = 'Please set a short description';
        } else if (values.shortDescription.length > 160) {
          errors.shortDescription = 'This description can only be 160 characters long.';
        }
        if (!values.category || values.category === '') {
          errors.category = 'Please set category';
        }
        if (!values.intention || values.intention === '') {
          errors.intention = 'Please set an intention';
        }
        if (!values.progress || values.progress === '') {
          errors.progress = 'Please set a progress';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const slug = formatSlug(values.slug);
        setSubmitting(true);
        addProject({
          variables: {
            currentDate: currentDate,
            userId: user.id,
            name: values.name,
            slug: slug,
            title: values.yourTitle,
            timeCommitment: values.timeCommitment,
            organizationId: values.organization,
            agreementTitle: `${user.fullName} creates project: ${values.name}`,
            category: values.category,
            brandColor: values.brandColor,
            progress: values.progress,
            intention: values.intention,
            shortDescription: values.shortDescription,
            website: values.website,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="">
          <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">Create a Project</h2>
          <div className="md:grid grid-cols-5 gap-4">
            <div className="col-span-3 align-end ">
              <Select
                required
                className={fieldDiv}
                labelText="The official entity that owns this project"
                name="organization"
              >
                {organizations.map((organization) => {
                  return (
                    <option value={organization.organization?.id}>{organization.organization?.fullLegalName}</option>
                  );
                })}
              </Select>
            </div>

            <div className="flex flex-col col-span-2 justify-end">
              <Link href="./create-organization/">
                <Button className="p-1 px-3 border-2 border-gray-400 rounded-lg my-5">Add New Entity</Button>
              </Link>
            </div>
          </div>
          <Input
            className={fieldDiv}
            required
            labelText="Project Name"
            name="name"
            type="name"
            placeholder="Sunshine Labs"
          />
          <div className="hidden">{(values.slug = formatSlug(values.slug))}</div>
          <Input
            className={fieldDiv}
            required
            labelText="Cooperativ url (for the project's Cooperativ domain)"
            name="slug"
            type="text"
            placeholder={formatSlug(values.name)}
          />
          <Input
            className={fieldDiv}
            textArea
            required
            labelText="Short Description (160 Characters)"
            name="shortDescription"
            placeholder=""
          />
          <Input
            className={fieldDiv}
            required
            labelText="Your title/role"
            name="yourTitle"
            type="text"
            placeholder="Founder"
          />
          <Input
            className={fieldDiv}
            required
            labelText="Hours you spend on this per week"
            name="timeCommitment"
            type="number"
            placeholder="12"
          />

          <Select required className={fieldDiv} labelText="Project Category" name="category">
            <option value="">Select category</option>;
            {categoryOptions.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </Select>
          <Select required className={fieldDiv} labelText="Project Intention" name="intention">
            <option value="">Select intention</option>;
            {intentionOptions.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </Select>
          <Select required className={fieldDiv} labelText="Progress" name="progress">
            <option value="">Select progress</option>;
            {progressOptions.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </Select>
          <Input
            className={fieldDiv}
            labelText="Project Website (optional)"
            name="website"
            placeholder="https://www.awesome.com"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4 w-full"
          >
            {`Create ${values.name}`}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProject;
