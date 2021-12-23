import React, { FC } from 'react';

export interface ButtonProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type LoadingButtonTextProps = {
  state: 'idle' | 'submitting' | 'confirmed' | 'failed';
  idleText: string;
  submittingText: string;
  confirmedText: string;
  failedText?: string;
};

export const LoadingButtonText = ({
  state,
  idleText,
  submittingText,
  confirmedText,
  failedText,
}: LoadingButtonTextProps) => {
  switch (state) {
    case 'idle':
      return <>{idleText}</>;
    case 'submitting':
      return <>{submittingText}</>;
    case 'confirmed':
      return <>{confirmedText}</>;
    case 'failed':
      return <>{failedText}</>;
    default:
      return <>{idleText}</>;
  }
};

const Button: FC<ButtonProps> = ({ children, textColor, backgroundColor, borderColor, disabled, onClick, ...rest }) => {
  return (
    <button
      onClick={onClick}
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
