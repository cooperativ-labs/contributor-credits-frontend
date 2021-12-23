import CreateOrganization from '@src/Manager/forms/CreateOrganization';
import FormCard from '@src/Manager/components/cards/FormCard';
import ManagerWrapper from '@src/Manager/ManagerWrapper';
import React, { FC } from 'react';

const CreateProject: FC<any> = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <ManagerWrapper>
        <FormCard center>
          <CreateOrganization />
        </FormCard>
      </ManagerWrapper>
    </div>
  );
};

export default CreateProject;
