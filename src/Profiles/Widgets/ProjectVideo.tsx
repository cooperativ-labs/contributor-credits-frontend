import classNames from 'classnames';
import React from 'react';
import ReactPlayer from 'react-player';

export interface ProjectVideoProps {
  videoUrl?: string;
  className?: string;
}

const ProjectVideo: React.FunctionComponent<ProjectVideoProps> = ({ videoUrl, ...rest }) => {
  const { className, ...props } = rest;
  const classes = `${className} `;
  return videoUrl ? (
    <section>
      <div data-test="project-video" className={classNames(classes)} {...props}>
        <h1 className="text-xl font-bold mb-4 ">Project Video</h1>
        <div className="flex">
          <ReactPlayer url={videoUrl} width="100%" />
        </div>
      </div>
    </section>
  ) : null;
};

export default ProjectVideo;
