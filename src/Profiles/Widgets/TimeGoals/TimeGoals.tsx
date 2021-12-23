import * as Lang from './lang.en.json';
import Card from '@src/containers/Card';
import React from 'react';
export interface TimeGoalsProps {
  goals: {
    now: string;
    oneYear: string;
    threeYears: string;
  };
}

const TimeGoals: React.FunctionComponent<TimeGoalsProps> = ({ goals }) => {
  return (
    <div data-test="component=project-vision">
      <Card className="p-4 rounded-xl flex flex-col md:grid md:grid-cols-3">
        <section className="md:p-2 lg:p-8">
          <h1 className="md:text-xl font-bold mb-4 md:mt-0 md:mb-4">{Lang.headers.now} 🛠</h1>
          {goals.now}
        </section>
        <section className="md:p-2 lg:p-8">
          <h1 className="md:text-xl font-bold my-4 md:mt-0 md:mb-4">{Lang.headers.one} 🚀</h1>
          {goals.oneYear}
        </section>
        <section className="md:p-2 lg:p-8">
          <h1 className="md:text-xl font-bold my-4 md:mt-0 md:mb-4">{Lang.headers.three} 🌕</h1>
          {goals.threeYears}
        </section>
      </Card>
    </div>
  );
};

export default TimeGoals;
