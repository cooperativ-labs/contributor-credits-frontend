import cn from 'classnames';
import Company from '@src/components/Company';
import Competition from '@src/Profiles/Widgets/Competition';
import Container from '@src/containers/Container';
import Documents from '@src/Profiles/Widgets/Documents/Documents';
import ProjectLayout from '@src/Layouts/ProjectLayout';
import ProjectPitch from '@src/Profiles/Widgets/ProjectPitch';
import ProjectSlideShow from '@src/Profiles/Widgets/ProjectSlideShow';
import ProjectVideo from '@src/Profiles/Widgets/ProjectVideo';
import ProjectWebsite from '@src/Profiles/Widgets/ProjectWebsite';
import React, { useRef } from 'react';
import TimeGoals from '@src/Profiles/Widgets/TimeGoals/TimeGoals';
import TwoColumnCard from '@src/containers/Organisms/TwoColumnCard';
import TwoColumnLayout from '@src/Layouts/TwoColumnLayout';
import { getBackerTypeOption } from '@src/utils/enumConverters';
import { Project } from 'types';
import { ProjectDescription } from '@src/Profiles/Widgets/ProjectDescription';

export interface ProjectPageProps {
  project: Project /** @TODO : Project Shape */;
}

const ProjectPage: React.FunctionComponent<ProjectPageProps> = ({ project }) => {
  const { generalDescription, videoURL, investmentDescription, backers, website, documents, pitchDeck } = project.info;

  const showbuttonBlock = website || pitchDeck;

  return (
    <ProjectLayout project={project} primaryHeader={true} page="Project">
      <Container className="px-4">
        <div className="md:mx-4">
          <TwoColumnLayout data-test="component-project-page">
            {/** Left */}
            {generalDescription && <ProjectDescription generalDescription={generalDescription} />}
            {/** Right */}
            {(videoURL || pitchDeck) && (
              <>
                {videoURL && <ProjectVideo videoUrl={videoURL} className={cn(pitchDeck && 'mb-4', 'mt-8 md:mt-0')} />}
                {pitchDeck && (
                  <ProjectSlideShow pitchUrl={pitchDeck} className="hidden md:flex flex-col mt-8 md:mt-0" />
                )}
              </>
            )}
            {/** Left */}
            {null}
            {/** Right */}
            {(investmentDescription || backers.length > 0) && (
              <>
                <TwoColumnCard
                  orientation="v"
                  slot1={
                    investmentDescription && (
                      <section>
                        <h1 className="md:text-xl font-bold mb-4">Current Investment</h1>
                        <div>{investmentDescription}</div>
                      </section>
                    )
                  }
                  slot2={
                    backers.length > 0 && (
                      <section>
                        <h1 className="md:text-xl font-bold mb-4">Our Backers</h1>
                        {backers.map((backer, index) => {
                          return (
                            <Company
                              key={index}
                              title={getBackerTypeOption(backer.type)}
                              subTitle={backer.name}
                              thumbnail={backer.logo}
                            />
                          );
                        })}
                      </section>
                    )
                  }
                />
              </>
            )}
            {/* Left */}
            {showbuttonBlock && (
              <div className="my-8 md:mt-0">
                <hr className="my-8 md:hidden" />
                {website && <ProjectWebsite url={website} className="my-5" />}
                {pitchDeck && <ProjectPitch url={pitchDeck} className="my-5" />}
                <hr className="my-8 md:hidden" />
              </div>
            )}
            {/* Right */}
            {documents.length > 0 && <Documents documents={documents} />}
            {/* {competition && competition.companies > 0 ? <Competition /> : null} */}
          </TwoColumnLayout>
        </div>
      </Container>
      {/* <Container>{timeGoals ? <TimeGoals goals={timeGoals} /> : null}</Container> */}
    </ProjectLayout>
  );
};

export default ProjectPage;
