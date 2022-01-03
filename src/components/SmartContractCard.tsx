import Button from '@src/components/Buttons/Button';
import Card from '@src/containers/Card';
import cn from 'classnames';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ContractCard: React.FC<any> = ({
  header,
  mainText,
  icon,
  subHeader,
  content,
  expandedDescription,
  link,
  isLive,
  className,
}) => {
  const [detailsShown, setDetailsShown] = useState(false);
  const handleDetailsReveal = () => {
    setDetailsShown(!detailsShown);
  };
  return (
    <Card className={cn(className, 'rounded-xl p-8 mt-4 md:mx-2')}>
      <div className="flex justify-between items-center">
        <h1 className="md:text-xl font-bold">{header}</h1>
        <div
          className={`p-2 px-4 rounded-md text-xs	font-semibold inline-block px-2 my-1  ${
            isLive ? 'bg-green-500 font-bold text-white px-8' : 'bg-opacity-100 border-2 border-gray-400 text-gray-400'
          }`}
        >
          {isLive ? 'Live' : 'Coming Soon'}
        </div>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold mt-4">
        {mainText}
        <FontAwesomeIcon className="h-8 text-yellow-500 ml-2 md:ml-0 md:pb-2" icon={icon} />
      </h2>
      <h3 className="text-blue-800 font-bold mt-4">{subHeader}</h3>
      {content}
      <Button className="w-28 h-8 mt-4 flex items-center float-right text-gray-400" onClick={handleDetailsReveal}>
        <div className="mr-2"> more details </div>
        {detailsShown && <FontAwesomeIcon icon="chevron-up" />}
        {!detailsShown && <FontAwesomeIcon icon="chevron-down" />}
      </Button>
      <div className="clear-both" />
      {detailsShown && (
        <div className="border-t-2 border-gray-400 mt-4 py-4 text-gray-400">
          {expandedDescription}
          {link && (
            <a href={link} target="_blank" rel="noreferrer">
              {' '}
              <span className="font-bold underline">click here</span>
            </a>
          )}
        </div>
      )}
    </Card>
  );
};

export default ContractCard;
