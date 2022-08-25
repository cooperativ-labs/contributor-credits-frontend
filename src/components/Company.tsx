import Button from '@src/components/Buttons/Button';
import cn from 'classnames';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type CompanyProps = {
  className?: string;
  thumbnail?: string;
  title: string;
  subTitle: string;
};

const Company: React.FunctionComponent<CompanyProps> = ({ thumbnail, title, subTitle, className }) => {
  return (
    <div className={cn(className, 'flex items-center')}>
      {thumbnail && (
        <img
          src={thumbnail ? thumbnail : '/assets/images/company-logos/company-placeholder.jpeg'}
          className="flex-shrink-0 rounded-lg w-16 h-16 mr-2"
        />
      )}
      <div className="flex-col flex-grow">
        <h1 className="font-bold">{title}</h1>
        <h2>{subTitle}</h2>
      </div>
      <Button className="p-2 text-gray-400" aria-label={`Navigate to ${title}'s website`}>
        <FontAwesomeIcon icon="arrow-right" />
      </Button>
    </div>
  );
};

export default Company;
