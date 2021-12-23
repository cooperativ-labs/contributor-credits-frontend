import Button, { ButtonProps } from './Button';
import cn from 'classnames';
import React, { FC } from 'react';

interface FormButtonProps extends ButtonProps {
  outlined?: boolean;
  color?: string;
}

const FormButton: FC<FormButtonProps> = ({
  children,
  textColor,
  backgroundColor,
  outlined,
  color = 'blue',
  borderColor,
  disabled,
  ...rest
}) => {
  const standardClass = `text-white hover:shadow-md bg-cLightBlue hover:bg-cDarkBlue`;
  const outlinedClass = `text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white`;

  return (
    <Button
      className={cn(
        [outlined ? outlinedClass : standardClass],
        'text-sm p-3 px-6 font-semibold rounded-md relative mt-3'
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default FormButton;
