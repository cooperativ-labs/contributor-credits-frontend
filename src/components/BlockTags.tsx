import classNames from 'classnames';
import React from 'react';
import { ProjectOpportunitiesNeed } from 'types';
export interface BlockTagsProps {
  className?: string;
  tags: ProjectOpportunitiesNeed[];
}

const BlockTags: React.FunctionComponent<BlockTagsProps> = ({ tags, ...props }) => {
  const { className, ...rest } = props;
  return (
    <div>
      {tags ? (
        <div data-test="component-block-tags" className={classNames(className)} {...rest}>
          {tags.map((tag, index) => {
            return (
              <div
                key={index}
                className="p-2 px-4 mr-2 shadow-md rounded-md text-xs	font-semibold text-white inline-block px-2 my-1 bg-opacity-60"
                style={{ background: tag.fill, opacity: 0.7 }}
              >
                {tag.name}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default BlockTags;
