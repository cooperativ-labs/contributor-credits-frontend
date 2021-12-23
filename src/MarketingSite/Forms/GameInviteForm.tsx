import axios from 'axios';
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

const fieldDiv = 'flex flex-col px-3 pt-3 md:mx-2 bg-opacity-0   ';
const fieldClass =
  'text-sm my-1 bg-grey-100 p-3 border-2 shadow-lg rounded-md focus:border-pink-500 focus:outline-none';
const fieldLabelClass = 'text-sm text-gray-100 font-semibold text-opacity-80 ';
const buttonGradient =
  'bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:to-pink-500';

const GameInviteForm = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        projectName: '',
        projectDescription: '',
        projectStatus: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.firstName) {
          errors.firstName = 'Please include a first name';
        } else if (!/^[a-z ,.'-]+$/i.test(values.firstName)) {
          errors.firstName = 'Please only use valid characters';
        }
        if (!values.lastName) {
          errors.lastName = 'Please include a last name';
        } else if (!/^[a-z ,.'-]+$/i.test(values.lastName)) {
          errors.lastName = 'Please only use valid characters';
        }
        if (!values.email) {
          errors.email = 'Please include an email address';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.projectName) {
          errors.projectName = 'Please include a project name';
        }
        if (!values.projectDescription) {
          errors.projectDescription = 'Please include a project description ';
        }
        if (!values.projectStatus) {
          errors.projectStatus = 'Please select a project status';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const data = {
          _subject: `Invite Request - GAME`,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          projectName: values.projectName,
          projectDescription: values.projectDescription,
          projectStatus: values.projectStatus,
        };
        axios
          .post('https://mailthis.to/inviterequests', {
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
        <Form className="md:-mt-16 flex flex-col gap relative">
          <div className="grid md:grid-cols-2">
            <div className={fieldDiv}>
              <label htmlFor="firstName" className={fieldLabelClass}>
                First name *
              </label>
              <Field id="firstName" name="firstName" as="input" placeholder="Moritz" className={fieldClass} />
              <ErrorMessage name="firstName" component="div" className="text-sm text-red-500" />
            </div>
            <div className={fieldDiv}>
              <label htmlFor="lastName" className={fieldLabelClass}>
                Last name *
              </label>
              <Field id="lastName" name="lastName" as="input" placeholder="Zimmermann" className={fieldClass} />
              <ErrorMessage name="lastName" component="div" className="text-sm text-red-500" />
            </div>
            <div className={fieldDiv}>
              <label htmlFor="email" className={fieldLabelClass}>
                Email address *
              </label>
              <Field id="email" name="email" type="email" placeholder="email" className={fieldClass} />
              <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
            </div>
            <div className={fieldDiv}>
              <label htmlFor="projectName" className={fieldLabelClass}>
                What do you call your game? *
              </label>
              <Field id="projectName" name="projectName" as="input" placeholder="BonusLife" className={fieldClass} />
              <ErrorMessage name="projectName" component="div" className="text-sm text-red-500" />
            </div>
          </div>

          <div className={fieldDiv}>
            <label htmlFor="projectDescription" className={fieldLabelClass}>
              Briefly describe your game. *
            </label>
            <Field
              id="projectDescription"
              name="projectDescription"
              as="textarea"
              placeholder="A line of sports drinks"
              className={fieldClass}
            />
            <ErrorMessage name="projectDescription" component="div" className="text-sm text-red-500" />
          </div>
          <div className={fieldDiv}>
            <label htmlFor="projectStatus" className={fieldLabelClass}>
              What is your game's current status? *
            </label>
            <Field as="select" id="projectStatus" name="projectStatus" className={fieldClass}>
              <option value="Just an idea">Just an idea</option>
              <option value="Some stuff built">Some stuff built</option>
              <option value="MVP is live">MVP is live</option>
              <option value="On the market">On the market</option>
            </Field>
            <ErrorMessage name="projectStatus" component="div" className="text-sm text-red-500" />
          </div>
          <Field id="ent" name="ent" type="hidden" />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`${buttonGradient} text-white font-bold uppercase my-8 mx-4 rounded p-4`}
          >
            Request Early Access
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default GameInviteForm;
