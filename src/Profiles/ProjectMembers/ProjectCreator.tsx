import BioAndInterests from '@src/components/BioAndInterests';
import Card from '@src/containers/Card';
import Expertise from '@src/components/Expertise';
import ProjectCreatorInvestment from '@src/Profiles/Widgets/ProjectCreatorInvestment';
import ProjectLove from '@src/Profiles/Widgets/ProjectLove';
import ProjectMemberHeader from '@src/containers/ProjectMemberHeader';
import React from 'react';
import TwoColumnCard from '@src/containers/Organisms/TwoColumnCard';
import { ProjectUser } from 'types';

export interface ProjectCreatorProps {
  creator: ProjectUser;
  projectName: string;
}

const ProjectCreator: React.FunctionComponent<ProjectCreatorProps> = ({ creator, projectName }) => {
  const user = creator.user;
  const name = user.displayName ? user.displayName : user.fullName;

  return (
    <div data-test="component-project-creator" className="mx-8 md:mx-0 lg:mx-auto" style={{ maxWidth: '1280px' }}>
      {creator && (
        <div>
          <div className="md:hidden">
            <div className="flex flex-col items-center">
              <ProjectMemberHeader
                name={name}
                title={creator.title}
                thumbnail={user.profileImage}
                social={user.social}
              />
              <Expertise showHeader expertise={user.expertise} className="mt-8" />
              <BioAndInterests bio={user.biography} interests={user.interests} className="mt-8" />
              <ProjectCreatorInvestment
                timeCommitment={creator.timeCommitment}
                financialInvestments={creator.financialInvestments}
                className="mt-8"
              />
              {/* <ProjectHopes hopes={creator.hopes} projectName={projectName} className="mt-8" /> */}
              <ProjectLove projectName={projectName} projectLove={creator.projectLove} className="my-4" />
            </div>
          </div>
          <div className="hidden md:flex md:mx-8 lg:mx-16 mt-8">
            <div className="w-2/3 flex flex-col lg:mr-2">
              <TwoColumnCard
                slot1={
                  <section className="flex-grow" style={{ minWidth: '250px' }}>
                    <ProjectMemberHeader
                      name={name}
                      title={creator.title}
                      thumbnail={user.profileImage}
                      social={user.social}
                    />
                    <Expertise showHeader={false} expertise={user.expertise} className="mt-8" />
                  </section>
                }
                slot2={<BioAndInterests bio={user.biography} interests={user.interests} />}
              />

              <ProjectCreatorInvestment
                timeCommitment={creator.timeCommitment}
                financialInvestments={creator.financialInvestments}
                className="mt-8 mr-4 p-8 rounded-xl flex"
              />
            </div>
            <div className="w-1/3 flex flex-col lg:ml-2">
              {creator.projectLove ? (
                <Card className="mr-4 p-4 rounded-xl flex flex-col">
                  <ProjectLove projectName={projectName} projectLove={creator.projectLove} className="mb-4" />
                </Card>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCreator;
