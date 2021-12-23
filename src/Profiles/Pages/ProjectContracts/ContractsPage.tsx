import Button from '@src/components/Buttons/Button';
import ContributorCreditClasses from '@src/Profiles/Widgets/ContributorCreditClasses/ContributorCreditClasses';
import ProjectLayout from '@src/Layouts/ProjectLayout';
import React from 'react';

export interface ContractsPageProps {
  project: any /** @TODO : Project Shape */;
  users: any[] /** @TODO : Users Shape */;
  contributorCreditClasses: any[] /** @TODO : contributorCreditClasses */;
  fromInfiniteScroll?: boolean;
}

const contractsPitch = (
  <div data-test="component-contracts-pitch" className="m-2 md:m-4 lg:m-10">
    <div className="flex flex-col justify-center items-center text-center">
      <h2 className="text-2xl mb-4 text-gray-700">This project has not yet established any Cooperativ Contracts</h2>
      <p className="text-gray-700">
        Cooperativ Contracts make it easy for project creators to share the project's future success.
      </p>
      <a href={'/contracts'} target="_blank" rel="noreferrer">
        <Button
          className="p-4 px-6 mt-8 rounded-lg text-white hover:text-white bg-green-500 hover:bg-green-600 border-2 hover:border-green-600 rounded w-full md:max-w-xs relative"
          aria-label={'Project Website'}
        >
          <span className="font-bold">Learn About Cooperativ Contracts</span>
        </Button>
      </a>
    </div>
  </div>
);

const ContractsPage: React.FunctionComponent<ContractsPageProps> = ({
  project,
  contributorCreditClasses,
  fromInfiniteScroll,
}) => {
  return (
    <ProjectLayout project={project} primaryHeader={false} page="Contracts" fromInfiniteScroll={fromInfiniteScroll}>
      {project.credits ? (
        <ContributorCreditClasses contributorCreditClasses={contributorCreditClasses} projectName={project.name} />
      ) : (
        contractsPitch
      )}
    </ProjectLayout>
  );
};

export default ContractsPage;
