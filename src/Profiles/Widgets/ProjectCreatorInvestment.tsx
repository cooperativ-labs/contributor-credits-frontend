import Card from '@src/containers/Card';
import classNames from 'classnames';
import React from 'react';
import useCurrencyFormatter from '@hooks/useCurrency';
import useTotalMemberHours from '@hooks/useMemberHours';
import { AddFinancialInvestmentsAmount } from '@src/utils/helpersMoney';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProjectUserFinancialInvestment, ProjectUserTimeCommitment } from 'types';

export interface ProjectCreatorInvestmentProps {
  className?: string;
  timeCommitment: ProjectUserTimeCommitment;
  financialInvestments: ProjectUserFinancialInvestment[];
}

const HoursByDay = ({ timeByDay }) => {
  const days = [
    { label: 'S', time: timeByDay ? timeByDay.sun : 3 },
    { label: 'M', time: timeByDay ? timeByDay.mon : 2 },
    { label: 'T', time: timeByDay ? timeByDay.tue : 3 },
    { label: 'M', time: timeByDay ? timeByDay.wed : 2 },
    { label: 'T', time: timeByDay ? timeByDay.thu : 3 },
    { label: 'F', time: timeByDay ? timeByDay.fri : 2 },
    { label: 'S', time: timeByDay ? timeByDay.sat : 3 },
  ];
  return (
    <div className="flex ml-2 flex-grow">
      {days.map((day, i) => {
        return (
          <div key={i} className="flex flex-col flex-grow mx-1 justify-end">
            <div className={classNames(`bg-blue-300 h-${day.time * 2}`)} />
            <div className="text-xs text-gray-500 text-center">{day.label}</div>
          </div>
        );
      })}
    </div>
  );
};

const ProjectCreatorInvestment: React.FC<ProjectCreatorInvestmentProps> = ({
  timeCommitment,
  financialInvestments,
  ...props
}) => {
  const { className, ...rest } = props;
  const { byDay } = timeCommitment;
  return (
    <Card className={classNames(className, 'p-4 rounded-xl mt-4 w-full')}>
      <div data-test="component-project-creator-investment" className="w-full flex flex-col md:flex-row" {...rest}>
        <section className="md:flex-grow">
          <h1 className="md:text-xl font-bold mb-4">Time Investment</h1>
          <div className="flex flex-col border-gray-200 border-2 rounded-xl p-2">
            <span className="text-sm mb-1 text-gray-500">
              <FontAwesomeIcon icon="chart-line" className="text-green-500" /> Weekly Average
            </span>
            {timeCommitment && (
              <div className="flex">
                <span className="text-3xl font-bold flex items-end">{useTotalMemberHours(timeCommitment)}h</span>
                <HoursByDay timeByDay={byDay} />
              </div>
            )}
          </div>
        </section>
        <section className="md:flex-grow md:ml-4 md:pl-4">
          <h1 className="md:text-xl font-bold my-4 md:mb-4 md:mt-0">Financial Investment</h1>
          <div className="flex flex-col border-gray-200 border-2 rounded-xl p-2">
            <span className="text-sm text-gray-500">
              <FontAwesomeIcon icon="piggy-bank" className="text-green-500" /> Personal Investment
            </span>
            <span className="text-3xl font-bold">
              {
                useCurrencyFormatter(
                  AddFinancialInvestmentsAmount(financialInvestments),
                  financialInvestments[0]?.currency
                ).rounded
              }
            </span>
          </div>
          {/* <Button
          className="hidden md:inline-block py-2 text-green-500 text-left font-bold"
          aria-label="See Full Financials"
        >
          See Full Financials <FontAwesomeIcon icon="arrow-right" className="ml-2" />
        </Button> */}
        </section>
      </div>
    </Card>
  );
};

export default ProjectCreatorInvestment;
