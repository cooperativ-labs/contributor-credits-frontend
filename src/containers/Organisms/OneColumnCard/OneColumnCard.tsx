import Card from '@src/containers/Card';
import cn from 'classnames';
import React from 'react';

export type OneColumnCardProps = {
  className?: string;
  style?: any;
  slot1?: React.ReactNode;
  slot1Header?: string;
  slot1HeaderClass?: string;
  slot2?: React.ReactNode;
  slot2Header?: string;
  slot2HeaderClass?: string;
  slot3?: React.ReactNode;
  slot3Header?: string;
  slot3HeaderClass?: string;
  slot4?: React.ReactNode;
  slot4Header?: string;
  slot4HeaderClass?: string;
  slot5?: React.ReactNode;
  slot5Header?: string;
  slot5HeaderClass?: string;
};

const OneColumnCard: React.FunctionComponent<OneColumnCardProps> = ({
  slot1Header,
  slot1HeaderClass,
  slot1,
  slot2Header,
  slot2HeaderClass,
  slot2,
  slot3Header,
  slot3HeaderClass,
  slot3,
  slot4Header,
  slot4HeaderClass,
  slot4,
  slot5Header,
  slot5HeaderClass,
  slot5,
  ...props
}) => {
  const { className, style, ...rest } = props;

  const slotMap = {
    1: { header: slot1Header, headerClass: slot1HeaderClass, slot: slot1 },
    2: { header: slot2Header, headerClass: slot2HeaderClass, slot: slot2 },
    3: { header: slot3Header, headerClass: slot3HeaderClass, slot: slot3 },
    4: { header: slot4Header, headerClass: slot4HeaderClass, slot: slot4 },
    5: { header: slot5Header, headerClass: slot5HeaderClass, slot: slot5 },
  };
  return (
    <Card data-test="organism-one-column-card" className={cn(className, 'rounded-xl')} style={style} {...rest}>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <section key={index}>
            <h1 className={cn(slotMap[index].headerClass, 'md:text-xl font-bold mb-4')}>{slotMap[index].header}</h1>
            <div>{slotMap[index].slot}</div>
          </section>
        );
      })}
    </Card>
  );
};

export default OneColumnCard;
