import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProjectOpportunitiesNeed } from 'types';
import { REMOVE_PROJECT_NEED } from '@src/utils/dGraphQueries/opportunities';
import { useMutation } from '@apollo/client';

const fieldDiv = 'p-2 align-center text-sm text-gray-700 whitespace-nowrap truncate rounded-sm';

interface ProjectNeedRowProps {
  projectSlug: string;
  need: ProjectOpportunitiesNeed;
  setLatestNeeds: any;
}

const ProjectNeedRow: FC<ProjectNeedRowProps> = ({ projectSlug, need, setLatestNeeds }) => {
  const needId = need.id;
  const [removeProjectNeed, { data, error }] = useMutation(REMOVE_PROJECT_NEED);

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }

  if (data) {
    data.updateProject.project[0].needs && setLatestNeeds(data.updateProject.project[0].needs);
  }

  async function removeNeed(needId, projectSlug) {
    removeProjectNeed({
      variables: {
        projectSlug: projectSlug,
        needId: needId,
      },
    });
  }
  return (
    <div className="grid grid-cols-11 gap-4 flex items-center my-3">
      <div className="col-span-6 md:col-span-4">
        <div className={`${fieldDiv}`}>{need.name}</div>
      </div>
      <div className="col-span-3">
        <div className={fieldDiv} style={{ backgroundColor: need.fill }}>
          {need.fill}
        </div>
      </div>
      <div className="col-span-1 md:col-span-3">
        <div className={`${fieldDiv} text-center`}>{need.value / 10}</div>
      </div>
      <div className="col-span-1">
        <button
          onClick={(e) => {
            e.preventDefault();
            removeNeed(needId, projectSlug);
          }}
        >
          <FontAwesomeIcon icon="times" className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default ProjectNeedRow;
