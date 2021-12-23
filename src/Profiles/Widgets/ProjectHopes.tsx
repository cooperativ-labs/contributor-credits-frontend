import classNames from 'classnames';
import React from 'react';

export interface ProjectHopesProps {
  className?: string;
  projectName: string;
  hopes: string;
}

const ProjectHopes: React.FunctionComponent<ProjectHopesProps> = ({ projectName, hopes, ...props }) => {
  const { className, ...rest } = props;
  return hopes ? (
    <div data-test="component-bio-and-interests" className={classNames(className)} {...rest}>
      <h1 className="md-text-xl font-bold mr-4">{`My Hopes for ${projectName}`}</h1>
      <div className="my-4">{hopes}</div>
    </div>
  ) : null;
};

export default ProjectHopes;
