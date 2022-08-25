import AnalyticsContext from '@context/analytics';
import React from 'react';
import { useAnalytics } from '@hooks/analytics';

type SetCookieContextProps = {
  children: React.ReactNode;
};

const SetCookieContext: React.FC<SetCookieContextProps> = ({ children }) => {
  const [dynamicDimensions, setDynamicDimensions] = useAnalytics();
  const analyticsContext = { dynamicDimensions, setDynamicDimensions };
  return <AnalyticsContext.Provider value={analyticsContext}>{children} </AnalyticsContext.Provider>;
};

export default SetCookieContext;
