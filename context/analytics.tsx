import React from 'react';

const AnalyticsContext = React.createContext({
  dynamicDimensions: {},
  setDynamicDimensions: () => {},
});

export default AnalyticsContext;
