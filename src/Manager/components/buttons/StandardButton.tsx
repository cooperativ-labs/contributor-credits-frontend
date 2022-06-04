import Button, { ButtonProps } from './Button';
import cn from 'classnames';
import React, { FC } from 'react';

type StandardButtonProps = ButtonProps & {
  external?: boolean;
  outlined?: boolean;
  large?: boolean;
  link?: string;
  fullWidth?: boolean;
  text: string;
  color?: string;
  className?: string;
  onClick?: () => void;
};

const StandardButton: FC<StandardButtonProps> = ({
  external,
  outlined,
  large,
  fullWidth,
  link,
  text,
  onClick,
  color = 'blue',
  className,
  disabled,
}) => {
  const standardClass = `text-white shadow-lg hover:shadow-xl bg-${color}-600 hover:bg-${color}-700`;
  const outlinedClass = `text-${color}-700 hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-${color}-800 border-2 border-${color}-700 hover:border-white`;
  const disabledClass = 'text-gray-500 bg-opacity-100 border-2 border-gray-500';
  const ButtonWithoutLink = (
    <Button
      className={cn(
        [disabled ? disabledClass : outlined ? outlinedClass : standardClass],
        [large ? 'p-4 px-10 font-bold' : 'text-sm p-3 px-6 font-semibold '],
        [fullWidth ? 'w-full' : null],
        'rounded-md relative'
      )}
      aria-label={`button-${text}`}
      disabled={disabled}
      onClick={() => onClick()}
    >
      <span className="uppercase">{text}</span>
    </Button>
  );

  return (
    <div className={className}>
      {link ? (
        <a href={link} target={external && '_blank'} rel={external && 'noreferrer'}>
          {ButtonWithoutLink}
        </a>
      ) : (
        ButtonWithoutLink
      )}
    </div>
  );
};

export default StandardButton;
