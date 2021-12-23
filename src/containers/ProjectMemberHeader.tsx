import classNames from 'classnames';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

interface MemberSocial {
  linkedin?: string;
  slack?: string;
  github?: string;
}

export interface ProjectMemberHeaderProps {
  className?: string;
  name: string;
  title: string;
  thumbnail: string;
  social?: MemberSocial;
}

const ProjectMemberHeader: React.FunctionComponent<ProjectMemberHeaderProps> = ({
  name,
  title,
  thumbnail,
  social,
  ...props
}) => {
  const { className, ...rest } = props;

  const socialLinks = () => {
    const render = [];
    for (const site in social) {
      render.push(
        <a
          className="bg-blue-500 hover:bg-blue-400 text-white text-xs rounded-full w-5 h-5 p-1 mr-2 mb-2 inline-flex justify-center items-center"
          aria-label={`Find ${name} on ${site}`}
          title={`Find ${name} on ${site}`}
          href={social[site]}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={['fab', site.toLowerCase() as IconName]} />
        </a>
      );
    }
    return render;
  };

  return (
    <section
      data-test="component-project-member-header"
      className={classNames(className, 'flex', 'items-center')}
      {...rest}
    >
      <div className="w-28 h-28 lg:w-40 lg:h-40 rounded-xl flex-shrink-0 bg-gray-300 overflow-hidden min-w-min">
        <img src={thumbnail} className="w-full  flex min-w-2" aria-label={`${name} profile picture`} />
      </div>

      <div className="flex flex-col ml-4">
        <h1 className="text-lg md:text-xl font-bold min-w-max">{name}</h1>
        <h2 className="text-sm md:text-l text-gray-500 mb-4">{title}</h2>
        <div>{socialLinks()}</div>
        {/* <Button
          className="bg-blue-500 hover:bg-blue-400 text-white rounded-full mt-2"
          aria-label={`Get in contact with ${name}`}
        >
          Message
        </Button> */}
      </div>
    </section>
  );
};

export default ProjectMemberHeader;
