import Card from '@src/containers/Card';
import cn from 'classnames';
import React from 'react';
import { ReactNodeLike } from 'prop-types';
import { useCallback } from 'react';

export interface TwoColumnCardProps {
  className?: string;
  slot1Class?: string;
  slot2Class?: string;
  slot1?: ReactNodeLike;
  slot2: ReactNodeLike;
  orientation?: string;
}

const TwoColumnCard: React.FunctionComponent<TwoColumnCardProps> = ({
  slot1,
  slot2,
  orientation = 'horizontal',
  ...props
}) => {
  const { className, slot1Class, slot2Class, ...rest } = props;
  const cardDynamicClasses = useCallback(() => {
    let classes = '';
    if (['vertical', 'vert', 'v'].includes(orientation.toLowerCase())) {
      classes = 'flex-col';
    }
    if (['horizontal', 'hrz', 'h'].includes(orientation.toLowerCase())) {
      classes = 'flex-col lg:flex-row';
    }
    return classes;
  }, [orientation]);

  const dynamicBorder = useCallback(() => {
    let classes = '';
    if (['vertical', 'vrt', 'v'].includes(orientation.toLowerCase())) {
      classes = 'md:my-8';
    }
    if (['horizontal', 'hrz', 'h'].includes(orientation.toLowerCase())) {
      classes = 'lg:border-l-2 lg:mx-4 lg:mx-8';
    }
    return classes;
  }, [orientation]);
  return (
    <Card
      data-test="organism-two-column-card"
      className={cn(className, cardDynamicClasses(), 'flex p-4 md:p-8 rounded-xl')}
      {...rest}
    >
      {slot1 && <div className={cn(slot1Class)}>{slot1}</div>}
      {slot1 && slot2 && <div className={cn(dynamicBorder(), 'border-b-2 my-4 border-gray-100')} />}
      {slot2 && <div className={cn(slot2Class)}>{slot2}</div>}
    </Card>
  );
};

export default TwoColumnCard;
