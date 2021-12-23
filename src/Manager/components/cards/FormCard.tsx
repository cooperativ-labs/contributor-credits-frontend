import BaseCard, { BaseCardProps } from './BaseCard';
import cn from 'classnames';
import React from 'react';

type FormCardProps = BaseCardProps & { small?: boolean; maxWidth?: boolean };

const FormCard: React.FC<FormCardProps> = ({ children, center, maxWidth, small }) => {
  return (
    <BaseCard
      className={cn(
        center && 'mx-auto',
        !maxWidth && 'max-w-2xl',
        small ? 'pt-6 md:p-6' : 'pt-8 md:p-8',
        'min-h-max md:mb-10 md:rounded-lg bg-opacity-0 md:bg-opacity-100 shadow-none md:shadow-xl'
      )}
    >
      {children}
    </BaseCard>
  );
};
export default FormCard;
