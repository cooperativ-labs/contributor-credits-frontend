import classNames from 'classnames';
import React from 'react';
export interface SimpleSectionProps {
  className?: string;
  header: string;
  children: React.ReactElement | string;
}

const SimpleSection: React.FC<SimpleSectionProps> = ({ header, children, ...props }) => {
  const { className, ...rest } = props;
  return (
    <section data-test="component-simple-seciton" className={classNames(className)} {...rest}>
      <h1 className="md:text-xl font-bold mb-4">{header}</h1>
      {children}
    </section>
  );
};

export default SimpleSection;
