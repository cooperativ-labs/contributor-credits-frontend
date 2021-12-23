import cn from 'classnames';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWindowSize } from 'react-use';

export interface ProjectDescriptionProps {
  generalDescription: string;
}

export const ProjectDescription: React.FunctionComponent<ProjectDescriptionProps> = ({ generalDescription }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const windowSize = useWindowSize();
  const shortenText = generalDescription.length > 313 && windowSize.width < 414;
  return (
    <div data-test="component-mission-and-values">
      <section>
        <h1 className="text-xl mt-8 md:mt-0 font-bold mb-4">Project Description</h1>
        <div
          className={cn(
            !expanded && shortenText && 'max-h-52 overflow-hidden bg-blend-soft-light ',
            'prose max-width '
          )}
        >
          <ReactMarkdown source={generalDescription} />
        </div>
        {shortenText && (
          <button onClick={() => setExpanded(!expanded)} className="text-green-500 font-semibold my-2 mx">
            {expanded ? 'Read Less' : 'Read More'}{' '}
            <FontAwesomeIcon icon={expanded ? 'arrow-up' : 'arrow-down'} className="mx-1 text-sm" />
          </button>
        )}
      </section>
    </div>
  );
};

export default ProjectDescription;
