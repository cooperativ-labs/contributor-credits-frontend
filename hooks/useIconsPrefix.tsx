import React from 'react';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

const useIconsPrefix = (icon) => {
  const brands = ['python', 'react', 'ethereum'];
  if (brands.includes(icon)) {
    return 'fab' as IconPrefix;
  }
  return 'fas' as IconPrefix;
};

export default useIconsPrefix;
