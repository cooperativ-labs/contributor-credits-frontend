import classNames from 'classnames';
import NeedsGraph from './NeedsGraph';
import React from 'react';
import SkillPitch from './SkillPitch';
import styles from './Skills.module.css';
import useWindowSize from '@hooks/useWindowSize';
import { ProjectOpportunitiesNeed } from 'types';

export interface NeedsProps {
  className?: string;
  needs: ProjectOpportunitiesNeed[];
}

const Needs: React.FunctionComponent<NeedsProps> = ({ needs, ...props }) => {
  const { className, ...rest } = props;
  const windowSize = useWindowSize();

  return (
    <div data-test="component-needs" className={classNames(className, 'w-full z-10')} {...rest}>
      <div className="md:flex md:flex-row">
        <NeedsGraph needs={needs} className="md:flex-grow" />
        <div
          className={classNames(
            windowSize.width < 768 ? styles.backgroundLine : styles.backgroundLineDesktop,
            'w-full text-center md:w-min md:mx-4'
          )}
        >
          <span className="inline-block" />
        </div>
        <SkillPitch className="md:flex-grow" />
      </div>
    </div>
  );
};

export default Needs;
