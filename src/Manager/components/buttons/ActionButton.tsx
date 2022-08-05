import cn from 'classnames';
import Link from 'next/link';
import React, { FC } from 'react';
import { ButtonProps } from './Button';

const buttonGradient =
  'bg-gradient-to-r from-cLightBlue to-cDarkBlue hover:from-cDarkBlue hover:to-cLightBlue shadow-lg hover:shadow-2xl focus:shadow-sm';

type ActionButtonProps = ButtonProps & {
  className?: string;
  link?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const ActionButton: FC<ActionButtonProps> = ({ link, onClick, className, type, disabled, children, ...rest }) => {
  return (
    <Link href={link}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        {...rest}
        className={cn(
          className,
          `${!disabled ? buttonGradient : 'bg-gray-300'} text-white font-bold uppercase my-8 rounded p-4 `
        )}
      >
        {children}
      </button>
    </Link>
  );
};

export default ActionButton;
