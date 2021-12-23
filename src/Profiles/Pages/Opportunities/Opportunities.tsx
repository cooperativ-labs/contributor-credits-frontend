import AvailableRoles from '@src/Profiles/Widgets/AvailableRoles/AvailableRoles';
import Card from '@src/containers/Card';
import cn from 'classnames';
import CompensationOfferings from '@src/Profiles/Widgets/CompensationOfferings/CompensationOfferings';
import Container from '@src/containers/Container';
import Needs from '../../Widgets/Needs/Needs';
import ProjectLayout from '@src/Layouts/ProjectLayout';
import React from 'react';
import { Project } from 'types';

export interface OpportunitiesProps {
  project: Project;
  fromInfiniteScroll?: boolean;
}

const Opportunities: React.FunctionComponent<OpportunitiesProps> = ({ project, fromInfiniteScroll }) => {
  const { needs, jobs } = project;

  return needs || jobs ? (
    <ProjectLayout project={project} primaryHeader={false} page="Opportunities" fromInfiniteScroll={fromInfiniteScroll}>
      <Container className="px-4">
        <div className="md:hidden overflow-x-hidden">
          {jobs && <AvailableRoles availableRoles={jobs} />}
          <hr />
          <Card className="rounded-xl flex flex-col items-center justify-center mx-6 mt-8">
            <Needs needs={needs} />
          </Card>
          <div className="mt-8">
            {/* <Card className="py-6 px-4 mx-6 rounded-xl">
            <h1 className="font-bold">Compensation Offerings</h1>
            <CompensationOfferings data={compensationOfferings} className="mx-4" />
          </Card> */}
          </div>
        </div>
        <div className="hidden md:flex md:mx-8 lg:mx-16 mt-8">
          <div className="lg:mr-2">
            {jobs && <AvailableRoles availableRoles={jobs} />}
            <Card className="mb-12 mr-4 p-8 rounded-xl flex min-w-max">
              <Needs needs={needs} />
            </Card>
          </div>
          {/* {compensationOfferings.length > 0 ? (
          <div className="w-1/3 flex flex-col lg:ml-2">
            <Card className="p-4 rounded-xl flex flex-col">
              <HeaderPrimary>Compensation Offerings</HeaderPrimary>
              <CompensationOfferings data={compensationOfferings} className="mx-4" />
            </Card>
          </div>
        ) : null} */}
        </div>
      </Container>
    </ProjectLayout>
  ) : null;
};

export default Opportunities;
