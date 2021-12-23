import axios from 'axios';
import cn from 'classnames';
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Button from '@src/components/Buttons/Button';

export interface JoinFormProps {
  className?: string;
  projectName: string;
}

const JoinForm: React.FunctionComponent<JoinFormProps> = ({ projectName, ...props }) => {
  const { className } = props;

  return (
    <div data-test="form-join" className={cn(className)}>
      <Formik
        initialValues={{ fullname: '', email: '', expertise: '', contribution: '', _honeypot: '' }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
          if (!values.fullname) {
            errors.fullname = 'Required';
          } else if (!/^[a-z ,.'-]+ [a-z ,.'-]+$/i.test(values.fullname)) {
            errors.fullname = 'Please supply first and last name';
          }
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.expertise) {
            errors.expertise = 'Required';
          }
          if (!values.contribution) {
            errors.contribution = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const data = {
            _subject: `Join Request: ${projectName}`,
            contributor_name: values.fullname,
            contributor_email: values.email,
            contributor_expertise: values.expertise,
            contributor_pitch: values.contribution,
          };
          axios
            .post('https://mailthis.to/Cooperativcontributorsignups', {
              ...data,
            })
            .then((res) => {
              location.href = 'https://mailthis.to/confirm';
              setSubmitting(false);
            })
            .catch((err) => {
              setSubmitting(false);
              throw new Error('Error sending form data');
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col relative">
            <h1 className="text-lg md:text-3xl font-bold mb-2 md:mb-4 text-center">Request to Join {projectName}</h1>
            <p className="mb-6 text-sm md:text-xl text-center">
              We are connecting contributors to projects <strong> manually for now</strong>. Please describe yourself an
              your potential contribution to the project. We will share your submission with the project and get back to
              you soon.
            </p>
            <div className="flex flex-col mb-4">
              <Button
                onClick={() => (window.location.href = 'mailto:contributorrequest@sunshinelabs.io')}
                className="bg-green-500 hover:bg-green-400 text-white rounded p-4"
              >
                <div className="text-lg font-bold">Email Project</div>
              </Button>
            </div>
            {/* <div className="flex flex-col mb-4">
             <label htmlFor="fullname" className="text-sm text-gray-400">
                First and Last Name
              </label>
              <Field
                type="text"
                name="fullname"
                className="border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              />
              <ErrorMessage name="fullname" component="div" className="text-sm text-red-500" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="text-sm text-gray-400">
                Email Address
              </label>
              <Field
                type="email"
                name="email"
                className="border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              />
              <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="expertise" className="text-sm text-gray-400">
                Area of Expertise
              </label>
              <Field
                type="text"
                name="expertise"
                className="border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              />
              <ErrorMessage name="expertise" component="div" className="text-sm text-red-500" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="contribution" className="text-sm text-gray-400">
                Describe Your Potential Contribution
              </label>
              <Field
                as="textarea"
                name="contribution"
                className="border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              />
              <ErrorMessage name="contribution" component="div" className="text-sm text-red-500" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-400 text-white rounded p-4"
            >
              Submit
            </button> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JoinForm;
