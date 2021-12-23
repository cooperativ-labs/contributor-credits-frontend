import cn from 'classnames';
import ContributorCreditClass, { ContributorCreditClassDataProps } from './ContributorCreditClass';
import React from 'react';

export interface ContributorCreditClassesProps {
  className?: string;
  contributorCreditClasses: ContributorCreditClassDataProps[];
  projectName: string;
}

const ContributorCreditClasses: React.FunctionComponent<ContributorCreditClassesProps> = ({
  contributorCreditClasses,
  projectName,
  ...props
}) => {
  const { className, ...rest } = props;
  return (
    <div
      data-test="component-contributor-credit-classes"
      className={cn(className, 'p-8 mx-auto')}
      {...rest}
      style={{ maxWidth: '1280px' }}
    >
      <h1 className="text-2xl font-bold">Contributor Credit Classes</h1>
      {contributorCreditClasses &&
        contributorCreditClasses.map((contributorCreditClass) => {
          return (
            <ContributorCreditClass
              key={contributorCreditClass.id}
              data={contributorCreditClass}
              projectName={projectName}
            />
          );
        })}
    </div>
  );
};

export default ContributorCreditClasses;
