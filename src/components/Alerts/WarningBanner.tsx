import cn from 'classnames';
import React, { FC } from 'react';

type WarningBannerProps = {
  color: string;
  textClass: string;
  text: string;
};

const WarningBanner: FC<WarningBannerProps> = ({ color, text, textClass }) => {
  return (
    <div className={cn(`bg-${color}`, 'mx-auto p-2 ')}>
      <div className={textClass}>{text}</div>
    </div>
  );
};

export default WarningBanner;
