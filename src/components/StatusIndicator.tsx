import React from 'react';
export interface StatusIndicatorProps {
  className?: string;
}

const StatusIndicator: React.FunctionComponent<StatusIndicatorProps> = ({ ...rest }) => {
  const { className } = rest;
  const classes = `${className} rounded-full w-6 h-6 p-0.5 border-2 border-gray-300`;
  return (
    <div data-test="component-status-indicator" className={classes}>
      <div className="rounded-full bg-gradient-to-b from-green-400 to-green-600 w-full h-full" />
    </div>
  );
};

export default StatusIndicator;
