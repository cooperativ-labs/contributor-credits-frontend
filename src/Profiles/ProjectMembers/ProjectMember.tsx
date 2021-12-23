import BioAndInterests from '@src/components/BioAndInterests';
import Button from '@src/components/Buttons/Button';
import Card from '@src/containers/Card';
import CompensationPackage from '@src/components/CompensationPackage';
import Expertise from '@src/components/Expertise';
import ProjectLove from '@src/Profiles/Widgets/ProjectLove';
import ProjectMemberHeader from '@src/containers/ProjectMemberHeader';
import React from 'react';
import TwoColumnCard from '@src/containers/Organisms/TwoColumnCard';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  resetNextUuid,
} from 'react-accessible-accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProjectUser } from 'types';
import { useState } from 'react';

export interface ProjectMemberProps {
  contributor: ProjectUser;
  projectName: string;
}

const ProjectMember: React.FunctionComponent<ProjectMemberProps> = ({ contributor, projectName }) => {
  const [accordianIndex, setAccordianIndex] = useState(undefined);
  resetNextUuid();
  const accordianSelection = (value) => {
    const index = value[0] ? parseInt(value[0].slice(-1), 10) : undefined;
    setAccordianIndex(index);
  };

  const user = contributor.user;
  const name = user.displayName ? user.displayName : user.fullName;

  return (
    <div data-test="component-project-member" className="mx-8 md:mx-0 lg:mx-auto" style={{ maxWidth: '1280px' }}>
      {contributor && (
        <div>
          <div className="md:hidden">
            <div className="flex flex-col items-start">
              <ProjectMemberHeader
                name={name}
                title={contributor.title}
                thumbnail={user.profileImage}
                social={user.social}
              />
              <Expertise showHeader={true} expertise={user.expertise} className="mt-8" />
              <BioAndInterests bio={user.biography} interests={user.interests} className="mt-8" />
              <ProjectLove projectName={projectName} projectLove={contributor.projectLove} className="my-8" />
              {/* {user.profile && (
                <Button className="text-blue-900 border-2 border-blue-900 m-auto p-2">
                  <a href={user.profile}>View My Profile</a>
                </Button>
              )} */}
            </div>
            <Accordion className="mt-8 w-full" onChange={accordianSelection} allowZeroExpanded={true}>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className="px-8 border-t-2 border-gray-200 py-4 flex justify-center w-full">
                      <h1 className="flex-grow md:text-2xl font-bold">Compensation Package</h1>
                      <Button
                        aria-label={
                          accordianIndex !== 0
                            ? `Expand ${name}'s compensation package section`
                            : `Collapse ${name}'s compensation package section`
                        }
                      >
                        {accordianIndex !== 0 && <FontAwesomeIcon icon="chevron-down" />}
                        {accordianIndex === 0 && <FontAwesomeIcon icon="chevron-up" />}
                      </Button>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                {/* <AccordionItemPanel className="px-8 pt-4 pb-8">
                  <Card className="p-8 rounded-xl">
                    <CompensationPackage
                      credits={contributor.compensationPackage.credits}
                      shares={contributor.compensationPackage.shares}
                    />
                  </Card>
                </AccordionItemPanel> */}
              </AccordionItem>
            </Accordion>
          </div>
          <div className="hidden md:flex md:mx-8 lg:mx-16 mt-8">
            <div className="w-2/3 flex flex-col lg:mr-2">
              <TwoColumnCard
                slot1={
                  <section className="flex-grow" style={{ minWidth: '225px' }}>
                    <ProjectMemberHeader
                      name={name}
                      title={contributor.title}
                      thumbnail={user.profileImage}
                      social={user.social}
                    />

                    <Expertise showHeader={false} expertise={user.expertise} className="mt-8 block" />
                  </section>
                }
                slot2={
                  <section className="flex-grow">
                    <BioAndInterests bio={user.biography} interests={user.interests} />
                    {/* {user.profile && (
                      <Button className="text-blue-900 border-2 border-blue-900 m-auto p-2 mt-4">
                        <a href={user.profile}>View My Profile</a>
                      </Button>
                    )} */}
                  </section>
                }
              />

              {/* <Card className="mt-8 mr-4 p-4 rounded-xl flex">
                <CompensationPackage
                  credits={contributor.compensationPackage.credits}
                  shares={contributor.compensationPackage.shares}
                />
              </Card> */}
            </div>
            <div className="w-1/3 flex flex-col lg:ml-2">
              {contributor.projectLove && (
                <Card className="p-4 rounded-xl flex flex-col">
                  <ProjectLove projectName={projectName} projectLove={contributor.projectLove} />
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectMember;
