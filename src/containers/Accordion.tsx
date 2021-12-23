import Button from '@src/components/Buttons/Button';
import React, { useState } from 'react';
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  Accordion as ReactAccordion,
  resetNextUuid,
} from 'react-accessible-accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNodeLike } from 'prop-types';

export interface AccordionProps {
  className?: string;
  accordionHeaders?: string | string[];
  children: ReactNodeLike[];
}

const Accordion: React.FunctionComponent<AccordionProps> = ({ children, accordionHeaders }) => {
  const [accordionIndex, setAccordionIndex] = useState(undefined);
  resetNextUuid();
  const accordionSelection = (value) => {
    const index = value[0] ? parseInt(value[0].slice(-1), 10) : undefined;
    setAccordionIndex(index);
  };
  const setAccordionHeaders = (index) => {
    return typeof accordionHeaders === 'string' ? accordionHeaders : accordionHeaders[index];
  };

  return (
    <ReactAccordion
      className="mt-4"
      onChange={accordionSelection}
      allowZeroExpanded={true}
      data-test="mobile-accordion"
    >
      {children.map((child, index) => {
        if (child) {
          return (
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div key={index} className="px-4 border-t-2 border-gray-200 py-4 flex justify-center w-full">
                    <h1 className="flex-grow md:text-2xl font-bold">{setAccordionHeaders(index)}</h1>
                    <Button aria-label={accordionIndex !== index ? 'expand section' : 'collapse section'}>
                      {accordionIndex !== index ? (
                        <FontAwesomeIcon icon="chevron-down" />
                      ) : (
                        <FontAwesomeIcon icon="chevron-up" />
                      )}
                    </Button>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="px-4 pt-4 pb-8">{child}</AccordionItemPanel>
            </AccordionItem>
          );
        }
        return null;
      })}
    </ReactAccordion>
  );
};

export default Accordion;
