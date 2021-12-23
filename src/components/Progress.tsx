import cn from 'classnames';
import React from 'react';
import useBrandColor from 'hooks/useBrandColor';
import { getProgressOption } from '@src/utils/enumConverters';
import { ProjectInfoProgress } from 'types';

export interface ProgressProps {
  progress: ProjectInfoProgress;
  brandColor: string;
  lightBrand: boolean;
  className?: string;
}

const Progress: React.FunctionComponent<ProgressProps> = ({ progress, className, brandColor, lightBrand }) => {
  return (
    <div data-test="atom-progress" className={cn(className, 'items-center flex-grow')}>
      <div className="flex text-sm md:text-base flex-col mr-2 flex-grow" style={{ minWidth: '100px' }}>
        <span className="font-bold">{getProgressOption(progress).name}</span>
        <div className="w-full h-2 bg-gray-200 mt-2 rounded">
          <div
            style={{ background: useBrandColor(brandColor, lightBrand), width: getProgressOption(progress).width }}
            className={'h-2 rounded'}
          />
        </div>
      </div>
      🎉
    </div>
  );
};

export default Progress;
