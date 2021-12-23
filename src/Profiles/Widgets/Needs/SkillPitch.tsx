import axios from 'axios';
import cn from 'classnames';
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';

export interface SkillPitchProps {
  className?: string;
}

const SkillPitch: React.FunctionComponent<SkillPitchProps> = ({ ...props }) => {
  const { className, ...rest } = props;
  const router = useRouter();
  const project = router.query.id;
  return (
    <div data-test="component-skill-pitch" className={cn(className, 'w-full p-4 md:p-0')} {...rest}>
      <Formik
        initialValues={{ fullname: '', email: '', contribution: '' }}
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
          if (!values.contribution) {
            errors.contribution = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const data = {
            _subject: `Pitching Contribution to ${project}`,
            contributor_name: values.fullname,
            contributor_email: values.email,
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
          <Form className="flex flex-col relative ">
            <h1 className="flex-grow md:text-xl font-bold mb-4">Pitch Your Contribution</h1>
            <div className="p-2 md:p-0">
              <div className="flex flex-col mb-4">
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
                <label htmlFor="contribution" className="text-sm text-gray-400">
                  Describe Your Potential Contribution
                </label>
                <Field
                  as="textarea"
                  name="contribution"
                  className="border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none h-32"
                />
                <ErrorMessage name="contribution" component="div" className="text-sm text-red-500" />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="p-2 px-4 bg-green-500 text-white my-4 hover:bg-green-400 rounded"
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SkillPitch;
