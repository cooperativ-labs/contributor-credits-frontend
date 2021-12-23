import CreateProject from '@src/Manager/forms/CreateProject';
import FormCard from '@src/Manager/components/cards/FormCard';
import ManagerWrapper from '@src/Manager/ManagerWrapper';
import React, { FC } from 'react';

const CreateProjectPage: FC = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <ManagerWrapper>
        <FormCard center>
          <CreateProject />
        </FormCard>
      </ManagerWrapper>
    </div>
  );
};

export default CreateProjectPage;
