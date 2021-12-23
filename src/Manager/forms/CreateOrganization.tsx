import MajorActionButton from '../components/buttons/MajorActionButton';
import React, { FC, useContext } from 'react';
import Select from './components/Select';
import { ADD_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { Form, Formik } from 'formik';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { Input } from './components/Inputs';
import { useMutation, useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';
import { useRouter } from 'next/router';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const CreateOrganization: FC = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;
  const [addOrganization, { data, error }] = useMutation(ADD_ORGANIZATION);

  if (!user) {
    return <></>;
  }

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }

  if (data) {
    alert(`${data.addOrganization.organization[0].fullLegalName} was successfully created!`);
    router.back();
  }

  return (
    <Formik
      initialValues={{
        hasEntity: 'N',
        displayName: '',
        logo: '',
        website: '',
        fullLegalName: user.fullName,
        address: '',
        country: '',
        jurisdiction: '',
        type: 'INDIVIDUAL',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.fullLegalName) {
          errors.fullLegalName = 'Please include a full legal name';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        addOrganization({
          variables: {
            userId: user.id,
            displayName: values.displayName,
            logo: values.logo,
            website: values.website,
            fullLegalName: values.fullLegalName,
            address: values.address,
            country: values.country,
            jurisdiction: values.jurisdiction,
            type: values.type,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <Select className={fieldDiv} required labelText="Do you have a registered organization?" name="hasEntity">
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </Select>
          {values.hasEntity !== 'N' && (
            <div>
              <Select className={fieldDiv} required labelText="Type of entity" name="type">
                <option value="LLC">LLC</option>
                <option value="CORPORATION">Corporation</option>
                <option value="LTD">Ltd</option>
                <option value="NON_PROFIT">Non-Profit</option>
                <option value="UG">UG</option>
                <option value="GMBH">GmbH</option>
              </Select>
              <Input
                className={fieldDiv}
                required
                labelText="Display Name"
                name="displayName"
                type="text"
                placeholder="Google"
              />
            </div>
          )}
          <Input
            className={fieldDiv}
            required
            labelText="Organization's Legal Name"
            name="fullLegalName"
            type="text"
            placeholder="Alphabet Inc."
          />
          <Input className={fieldDiv} labelText="Logo" name="logo" type="text" />
          <Input
            className={fieldDiv}
            required
            labelText="Country"
            name="country"
            type="text"
            placeholder="United States"
          />
          <Input
            className={fieldDiv}
            required
            labelText="Jurisdiction"
            name="jurisdiction"
            type="text"
            placeholder="Delaware"
          />
          <Input
            className={fieldDiv}
            required
            labelText="Address & City (main operating location)"
            name="address"
            type="text"
            placeholder="155 Easy Ave., Providence, RI 02903"
          />
          <MajorActionButton type="submit" disabled={isSubmitting}>
            {`Create ${values.fullLegalName}`}
          </MajorActionButton>
        </Form>
      )}
    </Formik>
  );
};

export default CreateOrganization;
