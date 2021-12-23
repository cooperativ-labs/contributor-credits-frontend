import Checkbox from './components/Checkbox';
import React, { FC } from 'react';
import Select from './components/Select';
import { categoryOptions, intentionOptions, progressOptions } from '@src/utils/enumConverters';
import { Form, Formik } from 'formik';
import { Input } from './components/Inputs';
import { UPDATE_PROJECT_MAIN_INFO } from '@src/utils/dGraphQueries/project';
import { useMutation } from '@apollo/client';

import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Project } from 'types';
import { setHttp } from '@src/utils/helpersGeneral';
const fieldDiv = 'pt-3 my-2 bg-opacity-0';

interface SettingsProjectMainProfileProps {
  project?: Project;
}

const SettingsProjectMainProfile: FC<SettingsProjectMainProfileProps> = ({ project }) => {
  const [updateProjectInfo, { data, error }] = useMutation(UPDATE_PROJECT_MAIN_INFO);

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }
  if (data) {
    alert(`${data.updateProject.project[0].name} was successfully updated!`);
  }

  return (
    <Formik
      initialValues={{
        organization: project.organization.id,
        name: project.name,
        shortDescription: project.info.shortDescription,
        brandColor: project.info.brandColor,
        lightBrand: project.info.lightBrand,
        category: project.info.category,
        intention: project.info.intention,
        progress: project.info.progress,
        logo: project.info.logo,
        website: project.info.website,
        videoURL: project.info.videoURL,
        pitchDeck: project.info.pitchDeck,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.name) {
          errors.name = 'Please set an name';
        }
        if (!values.shortDescription) {
          errors.shortDescription = 'Please set a short description';
        } else if (values.shortDescription.length > 160) {
          errors.shortDescription = 'This description can only be 160 characters long.';
        }
        if (!values.category) {
          errors.category = 'Please set category';
        }
        if (!values.intention) {
          errors.intention = 'Please set an intention';
        }
        if (!values.progress) {
          errors.progress = 'Please set a progress';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        values.lightBrand = values.lightBrand ? true : false;
        setSubmitting(true);
        updateProjectInfo({
          variables: {
            currentDate: currentDate,
            projectSlug: project.slug,
            projectName: values.name,
            projectInfoId: project.info.id,
            category: values.category,
            logo: values.logo,
            shortDescription: values.shortDescription,
            brandColor: values.brandColor,
            lightBrand: values.lightBrand,
            progress: values.progress,
            intention: values.intention,
            website: values.website,
            videoURL: values.videoURL && setHttp(values.videoURL),
            pitchDeck: values.pitchDeck && setHttp(values.pitchDeck),
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="">
          <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">Project Profile</h2>
          <Input
            className={fieldDiv}
            required
            labelText="Project Name"
            name="name"
            type="name"
            placeholder="Sunshine Labs"
          />
          <Input
            className={fieldDiv}
            textArea
            required
            labelText="Short Description (160 Characters)"
            name="shortDescription"
            placeholder=""
          />
          <Select required className={fieldDiv} labelText="Project Category" name="category">
            {categoryOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </Select>
          <Select required className={fieldDiv} labelText="Project Intention" name="intention">
            {intentionOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </Select>
          <Select required className={fieldDiv} labelText="Progress" name="progress">
            {progressOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </Select>

          <Input className={fieldDiv} labelText="Logo" name="logo" placeholder="https://source.com/your-logo" />

          <div className="md:grid grid-cols-7 gap-4">
            <div className="col-span-3 ">
              <Input className={fieldDiv} labelText="Brand color" name="brandColor" placeholder="#d3d3d3" />
            </div>
            <div className="col-span-1 self-center md:mt-8">
              <div className="h-2 md:h-11 md:w-11 rounded-full" style={{ backgroundColor: values.brandColor }} />
            </div>
            <div className="col-span-3">
              <Checkbox
                className={fieldDiv}
                labelText="Adjust for light brand color"
                name="lightBrand"
                checked={values.lightBrand}
              />
            </div>
          </div>
          <Input
            className={fieldDiv}
            labelText="Project website"
            name="website"
            placeholder="https://www.awesome.com"
          />
          <Input className={fieldDiv} labelText="Video" name="videoURL" placeholder="https://source.com/your-video" />
          <Input
            className={fieldDiv}
            labelText="Pitch deck (use embed URL)"
            name="pitchDeck"
            placeholder="https://source.com/embed/your-pitchDeck"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4 w-full"
          >
            {`Update ${values.name}`}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsProjectMainProfile;
