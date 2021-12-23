import FormButton from '../components/buttons/FormButton';
import ProjectNeedRow from './ProjectNeedRow';
import React, { FC, useState } from 'react';
import Select from './components/Select';
import { ADD_PROJECT_NEED } from '@src/utils/dGraphQueries/opportunities';
import { Form, Formik } from 'formik';
import { Input } from './components/Inputs';
import { Project, ProjectOpportunitiesNeed } from 'types';
import { severityOptions } from '@src/utils/enumConverters';
import { useMutation } from '@apollo/client';

const fieldDiv = 'pt-3 bg-opacity-0';
interface SettingsProjectNeedsProps {
  project?: Project;
}

const SettingsProjectNeeds: FC<SettingsProjectNeedsProps> = ({ project }) => {
  const [latestNeeds, setLatestNeeds] = useState<ProjectOpportunitiesNeed[]>(project.needs);
  const [addProjectNeed, { data, error }] = useMutation(ADD_PROJECT_NEED);
  const [alerted, setAlerted] = useState<boolean>(false);

  if (error && !alerted) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }

  if (data && !alerted) {
    setLatestNeeds(data.updateProject.project[0].needs);
    setAlerted(true);
  }

  const isHexColor = (string) => {
    if (string) {
      string.length === 7 ? (string[0] === '#' ? true : false) : false;
    }
    return true;
  };

  return (
    <Formik
      initialValues={{
        needFill: '',
        needValue: '',
        needName: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (isHexColor(values.needFill) === false) {
          errors.needFill = 'Please use a hex color code';
        }
        if (!values.needValue || values.needValue === '') {
          errors.needValue = 'Please rank this need';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        addProjectNeed({
          variables: {
            projectSlug: project.slug,
            fill: values.needFill,
            value: parseInt(values.needValue),
            name: values.needName,
          },
        });
        setAlerted(false);
        resetForm({});
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="">
          <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">Project needs</h2>
          {latestNeeds.map((need) => (
            <div>
              <ProjectNeedRow need={need} projectSlug={project.slug} setLatestNeeds={setLatestNeeds} />
            </div>
          ))}
          <hr className="mt-10 mb-4" />
          <div className="md:grid grid-cols-11 gap-4">
            <div className="col-span-3 ">
              <Input
                className={fieldDiv}
                required
                labelText="Need"
                name="needName"
                placeholder="Software engineering"
              />
            </div>
            <div className="col-span-3 ">
              <Input className={fieldDiv} required labelText="Color" name="needFill" placeholder="#d3d3d3" />
            </div>
            <div className="col-span-1 self-center md:mt-8">
              <div className="h-2 md:h-11 md:w-11 rounded-full" style={{ backgroundColor: values.needFill }} />
            </div>
            <div className="col-span-3 ">
              <Select required className={fieldDiv} labelText="Need rank" name="needValue">
                <option value="">Select rank</option>;
                {severityOptions.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  );
                })}
              </Select>
            </div>
          </div>
          <FormButton
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4 w-full"
          >
            {values.needName ? `Add ${values.needName} to ${project.name}` : 'Add need'}
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsProjectNeeds;
