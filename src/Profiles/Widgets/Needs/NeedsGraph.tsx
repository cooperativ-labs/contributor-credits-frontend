import classNames from 'classnames';
import React from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { Cell, Pie, PieChart } from 'recharts';
import { ProjectOpportunitiesNeed } from 'types';

export interface NeedsGraphProps {
  className?: string;
  needs: ProjectOpportunitiesNeed[];
}

const NeedsGraph: React.FunctionComponent<NeedsGraphProps> = ({ needs, ...props }) => {
  const isMobile = useWindowSize().width < 768;
  const { className, ...rest } = props;
  return (
    <div data-test="component-skill-graph" className={classNames(className, 'w-full p-4 md:p-0')} {...rest}>
      <h1 className="flex-grow mb-4 mt-3 md:mt-0  md:text-xl md:mb-0 font-bold">Do You Have These Skills?</h1>
      {needs && (
        <div className="flex flex-col items-center ">
          {!isMobile && (
            <PieChart width={200} height={200}>
              <Pie
                data={needs}
                cx={100}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {needs?.map((need) => (
                  <Cell key={need.id} fill={need.fill} />
                ))}
              </Pie>
            </PieChart>
          )}

          <div className="grid grid-cols-2 gap-4 w-full mt-4">
            {needs.map((need, i) => (
              <div key={i} className="flex">
                <div className="w-4 h-4 rounded-full mx-2 flex-shrink-0" style={{ backgroundColor: need.fill }} />
                <h2 className="text-sm text-gray-500">{need.name}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NeedsGraph;
