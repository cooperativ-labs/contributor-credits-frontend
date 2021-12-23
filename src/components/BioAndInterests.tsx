import classNames from 'classnames';
import React from 'react';
export interface BioAndInterestsProps {
  className?: string;
  bio: string;
  interests: string[];
}

const BioAndInterests: React.FunctionComponent<BioAndInterestsProps> = ({ bio, interests, ...props }) => {
  const { className } = props;
  return (
    bio && (
      <section className={classNames(className)}>
        <h1 className="text-xl font-bold mb-2 md:mb-4">Bio & Interests</h1>
        {bio}
        <div className="mt-2">
          {interests &&
            interests.map((interest, index) => {
              return (
                <div key={index} className="inline-block mr-1 font-bold text-sm">
                  {interest}
                  {index === interests.length - 1 ? '.' : ','}
                </div>
              );
            })}
        </div>
      </section>
    )
  );
};

export default BioAndInterests;
