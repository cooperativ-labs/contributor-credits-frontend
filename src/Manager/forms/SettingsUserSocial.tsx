import client from '@src/utils/apolloClient';
import MarketingInput from './components/Inputs';
import React from 'react';
import { Form, Formik } from 'formik';
import { UPDATE_USER_SOCIAL_ACCOUNTS } from '@src/utils/dGraphQueries/user';
import { useMutation } from '@apollo/client';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const SettingsUserSocial = ({ user }) => {
  const [updateSocials, { data, error }] = useMutation(UPDATE_USER_SOCIAL_ACCOUNTS);

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }

  if (data) {
    alert(`${data.updateUser.user[0].displayName} was successfully updated!`);
  }

  return (
    <Formik
      initialValues={{
        linkedin: user.social?.linkedin,
        github: user.social?.github,
        dribbble: user.social?.dribbble,
        discord: user.social?.discord,
        youtube: user.social?.youtube,
        soundcloud: user.social?.soundcloud,
        twitter: user.social?.twitter,
        facebook: user.social?.facebook,
        instagram: user.social?.instagram,
        medium: user.social?.medium,
        substack: user.social?.substack,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        updateSocials({
          variables: {
            userId: user.id,
            linkedin: values.linkedin,
            github: values.github,
            dribbble: values.dribbble,
            discord: values.discord,
            youtube: values.youtube,
            soundcloud: values.soundcloud,
            twitter: values.twitter,
            facebook: values.facebook,
            instagram: values.instagram,
            medium: values.medium,
            substack: values.substack,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col relative">
          <h2 className="text-xl text-blue-900 font-semibold">Social Accounts</h2>
          <MarketingInput
            className={fieldDiv}
            type="url"
            labelText="LinkedIn"
            name="linkedin"
            placeholder="https://linkedin.com/in/username"
          />
          <MarketingInput
            className={fieldDiv}
            type="url"
            labelText="Github"
            name="github"
            placeholder="https://github.com/username"
          />
          <MarketingInput
            className={fieldDiv}
            type="url"
            labelText="Dribbble"
            name="dribbble"
            placeholder="https://dribbble.com/username"
          />
          <MarketingInput
            className={fieldDiv}
            type="url"
            labelText="Discord"
            name="discord"
            placeholder="https://discordapp.com/users/username"
          />
          <MarketingInput
            className={fieldDiv}
            type="url"
            labelText="Youtube"
            name="youtube"
            placeholder="https://youtube.com/channel/2jdkHFKS2838Fwdd923"
          />
          <MarketingInput
            className={fieldDiv}
            type="url"
            labelText="Soundcloud"
            name="soundcloud"
            placeholder="https://soundcloud.com/username"
          />
          <MarketingInput
            className={fieldDiv}
            type="url"
            labelText="Twitter"
            name="twitter"
            placeholder="https://twitter.com/username"
          />
          <MarketingInput
            className={fieldDiv}
            type="url"
            labelText="Facebook"
            name="facebook"
            placeholder="https://facebook.com/username"
          />
          <MarketingInput
            className={fieldDiv}
            type="url"
            labelText="Instagram"
            name="instagram"
            placeholder="https://www.instagram.com/username"
          />
          <MarketingInput
            className={fieldDiv}
            type="url"
            labelText="Medium"
            name="medium"
            placeholder="https://www.medium.com/username"
          />
          <MarketingInput
            className={fieldDiv}
            type="url"
            labelText="Substack"
            name="substack"
            placeholder="https://username.substack.com"
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

export default SettingsUserSocial;
