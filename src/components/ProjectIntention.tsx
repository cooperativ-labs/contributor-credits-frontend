import classNames from 'classnames';
import React from 'react';
import { getIntentionOption } from '@src/utils/enumConverters';
import { ProjectInfoIntention } from 'types';

export interface ProjectIntentionProps {
  className?: string;
  intention: ProjectInfoIntention;
}

const ProjectIntention: React.FunctionComponent<ProjectIntentionProps> = ({ intention, className }) => {
  const classes = `${className}`;
  return (
    <div
      data-test="component-project-status"
      className={classNames(classes, 'border-grey-500 bg-white rounded-full shadow py-2 px-3 mt-4 md:my-4')}
      style={{ width: 'fit-content' }}
    >
      <h2 className="text-sm font-bold mr-4">{getIntentionOption(intention)}</h2>
    </div>
  );
};

export default ProjectIntention;
