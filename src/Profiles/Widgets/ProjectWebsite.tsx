import Button from '@src/components/Buttons/Button';
import classNames from 'classnames';
import React from 'react';

export interface ProjectWebsiteProps {
  url: string;
  className?: string;
}

const ProjectWebsite: React.FunctionComponent<ProjectWebsiteProps> = ({ url, ...rest }) => {
  const { className, ...props } = rest;
  const classes = `${className} `;
  return url ? (
    <section>
      <div data-test="project-Website" className={classNames(classes)} {...props}>
        <a href={url} target="_blank" rel="noreferrer">
          <Button
            className="p-2  text-blue-500 hover:text-white border-blue-500 border-2 hover:border-white hover:bg-blue-400 rounded w-full md:max-w-xs relative"
            aria-label={'Project Website'}
          >
            <span className="font-bold uppercase">Website</span>
          </Button>
        </a>
      </div>
    </section>
  ) : null;
};

export default ProjectWebsite;
