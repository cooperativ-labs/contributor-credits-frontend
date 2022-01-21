import React, { FC, useState } from 'react';

import cn from 'classnames';
import { Form, Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { REMOVE_USER_EMAIL, UPDATE_EMAIL } from '@src/utils/dGraphQueries/user';
import { EmailAddress } from 'types';
import { EditButton, MarkPublic } from '../forms/components/ListItemButtons';
import Checkbox from '../forms/components/Checkbox';
import Input from '../forms/components/Inputs';

type EmailAddressListItemProps = {
  email: EmailAddress;
  withEdit?: boolean;
};

const EmailAddressListItem: FC<EmailAddressListItemProps> = ({ email, withEdit }) => {
  const { user, name, address, description, public: isPublic } = email;
  const [editOn, setEditOn] = useState<boolean>(false);
  const [alerted, setAlerted] = useState<boolean>(false);
  const [updateEmailAddress, { error: updateError }] = useMutation(UPDATE_EMAIL);
  const [deleteEmail, { error: deleteError }] = useMutation(REMOVE_USER_EMAIL);

  if (updateError || (deleteError && !alerted)) {
    alert('Oops, looks like something went wrong.');
    setAlerted(true);
  }

  return (
    <div className={cn(withEdit && 'grid grid-cols-9 gap-3 items-center')}>
      <div className="p-3 border-2 rounded-lg col-span-8">
        <div className="md:w-auto ">
          <div className="text-large font-bold flex justify-between">
            {address}
            {withEdit && (
              <div className="flex justify-between">
                {/* <div className="hidden md:flex">
                  <MarkPublic isPublic={isPublic} />
                </div> */}
                <div className="ml-6 w-5">
                  <EditButton toggle={editOn} setToggle={setEditOn} />
                </div>
              </div>
            )}
          </div>
          {name && <div className="flex justify-between">{name}</div>}
          {/* {withEdit && (
            <div className="md:hidden">
              <MarkPublic isPublic={isPublic} />{' '}
            </div>
          )} */}
        </div>
        {description && <div className="mt-1 text-sm text-gray-700">{description}</div>}

        {editOn && (
          <div className="bg-cLightBlue bg-opacity-10 rounded-lg p-4 mt-6">
            <Formik
              initialValues={{
                public: false,
                name: name,
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                setSubmitting(true);
                updateEmailAddress({
                  variables: {
                    address: address,
                    name: values.name,
                    public: values.public,
                  },
                });
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, values }) => (
                <Form className="flex flex-col">
                  <div className="grid grid-cols-4 gap-3 md:gap-8 items-center">
                    <Input
                      className={`bg-opacity-0 w-full col-span-3`}
                      labelText="Label"
                      name="name"
                      placeholder="e.g. Personal"
                    />

                    {/* <Checkbox
                      className="col-span-1"
                      fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 mt-3 focus:outline-non"
                      name="public"
                      checked={values.public}
                      labelText="Public"
                    /> */}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase mt-4 rounded p-2"
                  >
                    Save
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
      {withEdit && (
        <div className="flex col-span-1 justify-center">
          <button
            aria-label="edit address info"
            onClick={() => deleteEmail({ variables: { userId: user.id, emailAddress: address } })}
          >
            <FontAwesomeIcon icon="trash" className="text-lg text-gray-600 mr-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailAddressListItem;
