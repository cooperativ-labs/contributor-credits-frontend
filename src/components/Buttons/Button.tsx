import React from 'react';

export type ButtonProps = {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?(): any;
};

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  textColor,
  backgroundColor,
  borderColor,
  disabled,
  ...rest
}) => {
  return (
    <button
      disabled={disabled}
      data-test="component-button"
      style={{ color: textColor, backgroundColor: backgroundColor, borderColor: borderColor }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
