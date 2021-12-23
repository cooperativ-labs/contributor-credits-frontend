import classNames from 'classnames';
import Company from '@src/components/Company';
import React from 'react';
import SimpleSection from '@src/containers/SimpleSection';
import TwoColumnCard from '@src/containers/Organisms/TwoColumnCard';

const data = {
  competition: [
    { title: 'Company A', subTitle: 'Company Category 1', thumbnail: 'https://i.imgur.com/hBMONzW.jpg' },
    { title: 'Company B', subTitle: 'Company Category 2', thumbnail: 'https://i.imgur.com/ZSw6fr4.png' },
    { title: 'Company C', subTitle: 'Company Category 3', thumbnail: 'https://i.imgur.com/zx7CPqD.png' },
  ],
  difference:
    'Unlike our competition who has saturated the market and advertising space with content, we will create a space to enhance brand capital in a gorilla like marketing effort. This includes various advertising content like traditions public relations and radio media to help brands reach their audience where they already exist and currently operate.',
};
export interface CompetitionProps {
  className?: string;
}

const Competition: React.FunctionComponent<CompetitionProps> = ({ ...props }) => {
  const { className } = props;
  /**
   * @Todo | @Data
   */

  return (
    <div data-test="component-competition" className={classNames(className)}>
      <TwoColumnCard
        slot1={
          <section>
            {data.competition.map((company, index) => {
              return (
                <Company key={index} title={company.title} subTitle={company.subTitle} thumbnail={company.thumbnail} />
              );
            })}
          </section>
        }
        slot1Class="flex-shrink-0"
        slot2={
          <section>
            <SimpleSection header="Why We Are Different">
              *For demo purposes only* Unlike our competition who has saturated the market and advertising space with
              content, we will create a space to enhance brand capital in a gorilla like marketing effort. This includes
              various advertising content like traditions public relations and radio media to help brands reach their
              audience where they already exist and currently operate.
            </SimpleSection>
          </section>
        }
      />
    </div>
  );
};

export default Competition;
