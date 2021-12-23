import React from 'react';

export interface VisionProps {
  projectVision?: string;
  projectMission?: string;
}

const ProjectVision: React.FunctionComponent<VisionProps> = ({ projectVision, projectMission }) => {
  return (
    <>
      {projectMission || projectVision ? (
        <div data-test="component-mission">
          <section>
            <h1 className="text-xl font-bold mb-4">Vision</h1>
            <div>{projectVision ? projectVision : projectMission ? projectMission : null}</div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default ProjectVision;
