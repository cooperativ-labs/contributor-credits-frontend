import Button from '@src/components/Buttons/Button';
import cn from 'classnames';
import React from 'react';

type MarketingButtonProps = {
  external?: boolean;
  outlined?: boolean;
  large?: boolean;
  link?: string;
  text: string;
  symbols?: any;
  className?: string;
};

const MarketingButton: React.FC<MarketingButtonProps> = ({
  external,
  outlined,
  large,
  link,
  text,
  symbols,
  className,
}) => {
  const standardClass =
    'text-white shadow-lg hover:shadow-xl bg-cLightBlue hover:bg-cGold border-2 border-cLightBlue hover:border-cGold';
  const outlinedClass =
    'text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cLightBlue border-2 border-cLightBlue hover:border-white';

  return (
    <div className={className}>
      <a href={link} target={external && '_blank'} rel={external && 'noreferrer'}>
        <Button
          className={cn(
            [outlined ? outlinedClass : standardClass],
            [large ? 'text-lg p-4 px-10 font-bold' : 'p-3 px-6 font-semibold '],
            'rounded-full relative'
          )}
          aria-label={`button-${text}`}
        >
          <div className="flex">
            <span className="uppercase nowrap">{text}</span>{' '}
            {symbols && <span className="ml-4 p-1 px-2 bg-white rounded-full shadow-inner">{symbols}</span>}
          </div>
        </Button>
      </a>
    </div>
  );
};

export default MarketingButton;
