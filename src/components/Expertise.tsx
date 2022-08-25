import classNames from 'classnames';
import React from 'react';

export type ExpertiseProps = {
  className?: string;
  expertise: string[];
  showHeader: boolean;
};

const Expertise: React.FunctionComponent<ExpertiseProps> = ({ showHeader, expertise, ...props }) => {
  const { className, ...rest } = props;

  return expertise ? (
    <div data-test="component-expertise" className={classNames(className)} {...rest}>
      {showHeader && <h1 className="md-text-xl font-bold mr-4 mb-4">Expertise</h1>}

      {expertise.map((expertise, index) => {
        return (
          <div
            key={index}
            className="mr-2 text-xs text-blue-500 border-blue-500 border-2 rounded-full inline-block px-2 my-1"
          >
            {expertise}
          </div>
        );
      })}
    </div>
  ) : null;
};

export default Expertise;
