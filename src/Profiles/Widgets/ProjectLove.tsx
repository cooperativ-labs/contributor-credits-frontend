import cn from 'classnames';
import React from 'react';
export interface ProjectLoveProps {
  className?: string;
  projectLove: string;
  projectName: string;
}

const ProjectLove: React.FunctionComponent<ProjectLoveProps> = ({ projectLove, projectName, ...props }) => {
  const { className, ...rest } = props;
  return projectLove ? (
    <div data-test="component-project-love" className={cn(className)} {...rest}>
      <h1 className="md-text-xl font-bold mr-4 mb-4 flex-grow">Why I Love {projectName}</h1>
      {projectLove}
    </div>
  ) : null;
};

export default ProjectLove;
