import BlockTags from '@src/components/BlockTags';
import cn from 'classnames';
import Container from '@src/containers/Container';
import Header from '@src/containers/Header';
import Link from 'next/link';
import Progress from '@src/components/Progress';
import React from 'react';
import Tabs from '@src/components/Tabs';
import { getIntentionOption, getSeekingOption } from '@src/utils/enumConverters';
import { ReactNodeLike } from 'prop-types';
import { useRouter } from 'next/router';
import DemoWarning from '@src/components/DemoWarning/DemoWarning';

export interface ProjectLayoutProps {
  project: any /** @TODO : Project Shape */;
  children?: ReactNodeLike;
  primaryHeader?: boolean;
  page?: string;
  fromInfiniteScroll?: boolean;
}

const ProjectLayout: React.FunctionComponent<ProjectLayoutProps> = ({
  project,
  primaryHeader = false,
  page,
  fromInfiniteScroll,
  children,
}) => {
  const router = useRouter();
  const projectID = router.query.id;
  const { info, needs, jobs } = project;
  const { shortDescription, logo, lightBrand, brandColor, category, intention, progress } = info;
  const seeking = project?.seeking;
  const members = project.projectUsers.filter((user) => user.archived !== true);
  const activeTabs = {
    project: true,
    team: true,
    opportunities: !!needs || !!jobs,
    contracts: false,
  };

  return (
    <div data-test="layout-project" className="w-full h-full">
      {DemoWarning}
      <Header
        projectSlug={project.slug}
        projectName={project.name}
        projectCategory={category}
        projectIntention={intention}
        brandColor={brandColor}
        lightBrand={lightBrand}
        projectThumbnail={logo}
        primaryHeader={primaryHeader}
        page={page}
        fromInfiniteScroll={fromInfiniteScroll}
      />
      <div className="hidden md:inline-block w-full">
        <Tabs brandColor={brandColor} activeTabs={activeTabs} />
      </div>
      <div className={cn(!primaryHeader && 'hidden', 'w-full bg-white border-gray-100 border-b-2')}>
        <Container>
          <section className="w-full flex py-4 mx-8">
            <div className="flex items-center border-gray-200 border-r-2 mr-4 pr-4 flex-grow md:flex-grow-0">
              <Link href={`/project/${projectID}/team`}>
                <span className="whitespace-nowrap text-sm md:text-base font-bold text-black">
                  {members.length} {`${members.length > 1 ? 'Members' : 'Member'}`}
                </span>
              </Link>
            </div>
            {seeking && (
              <div className="flex whitespace-nowrap items-center  border-gray-200 border-r-0 mr-4 pr-4 flex-grow md:flex-grow-0 md:border-r-2">
                <img src="/assets/images/icons/arrow-circle.svg" className="w-4 h-4 mr-2" />
                <span className="text-sm md:text-base font-bold mr-2">Seeking {getSeekingOption(seeking)}</span>
              </div>
            )}
            {intention && (
              <div className="hidden lg:flex items-center flex-shrink border-gray-200 border-r-2 pr-8 mr-4">
                <span className="font-bold mr-2">Intention:</span>
                {getIntentionOption(intention)}
              </div>
            )}
            <Progress brandColor={brandColor} lightBrand={lightBrand} progress={progress} className="hidden md:flex" />
          </section>
        </Container>
      </div>
      <div className={cn(!primaryHeader && 'hidden', 'w-full bg-white border-gray-200 border-b-2 md:hidden')}>
        <Container>
          <section className="w-full flex py-4 mx-8 md:px-8 lg:px-16">
            <Progress progress={progress} brandColor={brandColor} lightBrand={lightBrand} className="flex" />
          </section>
        </Container>
      </div>
      <div className={cn(!primaryHeader && 'hidden', 'w-full bg-white shadow-lg')}>
        <Container>
          <div className="mx-8 py-8 lg:pt-12 flex flex-col md:grid md:grid-cols-2 md:gap-8 lg:gap-16">
            <section>
              <h1 className="text-xl md:text-2xl font-bold">Description</h1>
              <div className="my-4">
                {shortDescription}
                {/* <div>
                  {description.full && (
                    <Button onClick={scrollToAnchor}>
                      <button className="text-green-500 my-4 mx">
                        Read More <FontAwesomeIcon icon="arrow-right" className="mx-2" />
                      </button>
                    </Button>
                  )}
                </div> */}
              </div>
            </section>
            {!!needs.length && (
              <section>
                <h1 className="text-xl md:text-2xl  font-bold">What we need</h1>
                <div className="mt-4">
                  <BlockTags tags={needs} />
                </div>
              </section>
            )}
          </div>
        </Container>
      </div>
      <div className="py-8 pb-12 md:px-0 ">{children}</div>
    </div>
  );
};

export default ProjectLayout;
