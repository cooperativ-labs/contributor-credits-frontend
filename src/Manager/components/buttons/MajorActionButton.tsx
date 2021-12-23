import Button, { ButtonProps } from './Button';
import cn from 'classnames';
import Link from 'next/link';
import React, { FC } from 'react';

const buttonGradient =
  'bg-gradient-to-r from-cLightBlue to-cDarkBlue hover:from-cDarkBlue hover:to-cLightBlue shadow-lg hover:shadow-2xl focus:shadow-sm';

interface MajorActionButtonProps extends ButtonProps {
  link?: string;
}

export const MajorActionButton: FC<MajorActionButtonProps> = ({
  children,
  className,
  textColor,
  backgroundColor,
  borderColor,
  disabled,
  link,
  ...rest
}) => {
  const ButtonWithoutLink = (
    <Button
      disabled={disabled}
      className={cn(
        !disabled ? buttonGradient : 'bg-gray-300',
        className,
        'text-white font-bold uppercase my-8 rounded p-4'
      )}
      {...rest}
    >
      {children}
    </Button>
  );

  return link ? <Link href={link}>{ButtonWithoutLink}</Link> : ButtonWithoutLink;
};

export default MajorActionButton;
