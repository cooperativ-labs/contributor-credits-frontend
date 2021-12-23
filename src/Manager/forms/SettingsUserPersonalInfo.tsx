import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Input } from './components/Inputs';
import { makeRemovalList, makeSubmissionList } from '@src/utils/dGraphQueries/gqlUtils';
import { UPDATE_USER_INFORMATION } from '@src/utils/dGraphQueries/user';
import { useMutation } from '@apollo/client';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const SettingUserPersonalInfo = ({ user }) => {
  const userId = user.id;
  const [updateUser, { data, error }] = useMutation(UPDATE_USER_INFORMATION);
  const [incomingExpertise, setIncomingExpertise] = useState<string[]>(user?.expertise);
  const [incomingInterests, setIncomingInterests] = useState<string[]>(user?.interests);
  const [alerted, setAlerted] = useState<boolean>(false);

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }
  if (data && !alerted) {
    alert(`${data.updateUser.user[0].displayName} was successfully updated!`);
    setIncomingExpertise(data.updateUser.user[0].expertise);
    setIncomingInterests(data.updateUser.user[0].interests);
    setAlerted(true);
  }

  return (
    <Formik
      initialValues={{
        email: user.email,
        fullName: user.fullName,
        displayName: user.displayName,
        profileImage: user.profileImage,
        biography: user.biography,
        expertise: user.expertise,
        interests: user.interests,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.email) {
          errors.email = 'Please include an email address.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.fullName) {
          errors.fullName = 'Please include your full name.';
        } else if (!/^[a-z ,.'-]+$/i.test(values.fullName)) {
          errors.fullName = 'Please only use valid characters';
        }
        if (!values.displayName) {
          errors.displayName = 'Please include a display name.';
        }
        // @ts-ignore - we turn these into strings, then turn them back into arrays before submission
        if (/[^a-z A-Z 0-9,.'-]/.test(values?.expertise)) {
          errors.expertise = 'Please only use letters, numbers, spaces, and commas.';
        }
        // @ts-ignore - we turn these into strings, then turn them back into arrays before submission
        if (/[^a-z A-Z 0-9,.'-]/.test(values?.interests)) {
          errors.interests = 'Please only use letters, numbers, spaces, and commas.';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const expertiseAdd = makeSubmissionList(values.expertise);
        const interestsAdd = makeSubmissionList(values.interests);
        const expertiseRemove = makeRemovalList(incomingExpertise, expertiseAdd);
        const interestsRemove = makeRemovalList(incomingInterests, interestsAdd);
        setAlerted(false);
        setSubmitting(true);
        updateUser({
          variables: {
            userId: userId,
            //email is used as an @id field, which is not currently mutable in dGraph
            //They will be updating this in July 21, so we should allow change of email after that update
            email: values.email,
            fullName: values.fullName,
            displayName: values.displayName,
            profileImage: values.profileImage,
            biography: values.biography,
            expertiseAdd: expertiseAdd,
            expertiseRemove: expertiseRemove,
            interestsAdd: interestsAdd,
            interestsRemove: interestsRemove,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col relative">
          <h2 className="text-xl mt-8 text-blue-900 font-semibold">Personal Information</h2>
          <Input
            className={fieldDiv}
            required
            labelText="Display name"
            name="displayName"
            type="text"
            placeholder="Moritz"
          />
          <Input
            className={fieldDiv}
            required
            labelText="Full name"
            name="fullName"
            type="text"
            placeholder="Moritz Zimmermann"
          />
          {/* <Input
            className={fieldDiv}
            required
            labelText="Email address"
            name="email"
            type="email"
            placeholder="moritz@bonuslife.com"
          /> */}
          <Input
            className={fieldDiv}
            labelText="Profile image"
            name="profileImage"
            type="text"
            placeholder="https://source.com/your-picture"
          />
          <Input
            className={fieldDiv}
            fieldHeight="h-24"
            textArea
            labelText="Biography"
            name="biography"
            placeholder=""
          />
          <Input
            className={fieldDiv}
            textArea
            labelText="Expertise (comma-separated tags)"
            name="expertise"
            placeholder="UX Design, React, Government Regulation, Early 20th Century Russian History"
          />
          <Input
            className={fieldDiv}
            textArea
            labelText="Interests (comma-separated tags)"
            name="interests"
            placeholder="UX Design, React, Government Regulation, Early 20th Century Russian History"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingUserPersonalInfo;
