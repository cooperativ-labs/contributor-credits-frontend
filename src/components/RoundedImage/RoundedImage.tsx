import classNames from 'classnames';
import React from 'react';

export interface RoundedImageProps {
  src: string;
  className?: string;
}

const RoundedImage: React.FunctionComponent<RoundedImageProps> = ({ src, ...rest }) => {
  const { className, ...props } = rest;
  const classes = `${className} rounded-full`;
  return (
    <div
      data-test="component-rounded-image"
      className={classNames(classes, 'flex overflow-hidden items-center')}
      {...props}
    >
      <img src={src} className="min-w-full" />
    </div>
  );
};

export default RoundedImage;
