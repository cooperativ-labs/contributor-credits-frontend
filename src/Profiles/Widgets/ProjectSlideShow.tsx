import classNames from 'classnames';
import React from 'react';

export interface ProjectSlideShowProps {
  pitchUrl?: string;
  className?: string;
}

const ProjectSlideShow: React.FunctionComponent<ProjectSlideShowProps> = ({ pitchUrl, ...rest }) => {
  const { className, ...props } = rest;
  const classes = `${className} `;
  return pitchUrl ? (
    <section>
      <div data-test="project-pitch" className={classNames(classes)} {...props}>
        <h1 className="text-xl font-bold mb-4 ">Pitch Deck</h1>
        <div className="flex">
          <iframe src={pitchUrl} width="2000" height="450" scrolling="no" allowFullScreen />
        </div>
      </div>
    </section>
  ) : null;
};

export default ProjectSlideShow;
