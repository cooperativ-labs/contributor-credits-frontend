import classNames from 'classnames';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
export interface StatBlockProps {
  className?: string;
  type: string;
  value: string | boolean;
  compact?: boolean;
}

const StatBlock: React.FunctionComponent<StatBlockProps> = ({ type, value, compact, ...props }) => {
  const { className, ...rest } = props;
  const getStyling = (type, value) => {
    let styling;
    if (type === 'hours') {
      styling = 'bg-blue-300 text-blue-600';
    } else if (type === 'coins') {
      styling = 'bg-green-300 text-green-600';
    } else if (type === 'open') {
      styling = value ? 'bg-purple-300 text-purple-600' : 'bg-red-300 text-red-600';
    }
    return styling;
  };
  const getTextStyling = (type, value) => {
    let styling;
    if (type === 'hours') {
      styling = 'text-blue-600';
    } else if (type === 'coins') {
      styling = 'text-green-600';
    } else if (type === 'open') {
      styling = value ? 'text-purple-600' : 'text-red-600';
    }
    return styling;
  };
  const getIcon = (type, value) => {
    let icon;
    if (type === 'hours') {
      icon = 'clock';
    } else if (type === 'coins') {
      icon = 'piggy-bank';
    } else if (type === 'open') {
      icon = value ? 'check' : 'times';
    }
    return icon;
  };
  const getContent = (type, value) => {
    let content;
    if (type === 'hours') {
      content = `${value} Hours`;
    } else if (type === 'coins') {
      content = value;
    } else if (type === 'open') {
      content = value ? 'Open' : 'Closed';
    }
    return content;
  };
  const getExtendedContent = (type, value) => {
    let content;
    if (type === 'hours') {
      content = `${value}+ Hour${value > 1 ? 's' : ''} Per Week`;
    } else if (type === 'coins') {
      content = `${value}+ of Personal Investment`;
    }
    return content;
  };

  return (
    <div data-test="component-stat-block" className={classNames(className, 'flex items-center')}>
      <div
        className={classNames(
          getStyling(type, value),
          'w-16 h-16 rounded-lg mx-2 flex flex-col justify-center items-center'
        )}
        {...rest}
      >
        <FontAwesomeIcon className={classNames('text-xl')} icon={getIcon(type, value) as IconName} />
        {compact && <div className="text-xs text-center mt-2">{getContent(type, value)}</div>}
      </div>
      {!compact && <div className={classNames(getTextStyling(type, value))}>{getExtendedContent(type, value)}</div>}
    </div>
  );
};

export default StatBlock;
