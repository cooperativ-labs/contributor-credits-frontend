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

export type LoadingButtonStateType = 'idle' | 'submitting' | 'confirmed' | 'failed' | 'submitted' | 'rejected';
export type LoadingButtonTextType = {
  state: LoadingButtonStateType;
  idleText: string;
  submittingText: string;
  confirmedText: string;
  failedText?: string;
  rejectedText?: string;
};

export const LoadingButtonText = ({
  state,
  idleText,
  submittingText,
  confirmedText,
  failedText,
  rejectedText,
}: LoadingButtonTextType) => {
  switch (state) {
    case 'idle':
      return <>{idleText}</>;
    case 'submitting':
      return <>{submittingText}</>;
    case 'submitted':
      return <>{confirmedText}</>;
    case 'confirmed':
      return <>{confirmedText}</>;
    case 'failed':
      return <>{failedText}</>;
    case 'rejected':
      return <>{rejectedText}</>;
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
