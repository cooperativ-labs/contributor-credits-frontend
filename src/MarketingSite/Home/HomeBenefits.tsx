import Card from '@src/containers/Card';
import Link from 'next/link';
import MarketingButton from '../Components/Buttons';
import Progress from '@src/components/Progress';
import React, { FC } from 'react';
import StandardSection from '../Containers/StandardSection';
import ContractCard from '../Components/SmartContractCard';

const bigTitleClass = 'ubuntu text-3xl md:text-4xl font-bold text-cLightBlue';
const pointsSectionClass = 'mb-10 md:mb-16 text-gray-800';
const pointsHeaderClass = 'text-lg mb-2 mt-6 font-semibold';

const explainerSection = (
  <>
    <div>
      <h1 className={bigTitleClass} style={{ textShadow: '3px 3px 5px #e2e2e2' }}>
        Promise future payment.
      </h1>
      <div className={pointsSectionClass}>
        <div style={{ maxWidth: '500px' }}>
          <h2 className={pointsHeaderClass}>
            The people who help you out should share in your success. Contributor Credits let you promise a fixed amount
            of money to these contributors.
          </h2>
        </div>
      </div>
      <h1 className={bigTitleClass} style={{ textShadow: '3px 3px 5px #e2e2e2' }}>
        Share revenue.
      </h1>
      <div className={pointsSectionClass}>
        <div style={{ maxWidth: '500px' }}>
          <h2 className={pointsHeaderClass}>
            Create tokens that give each member rights to a share of your revenue. Need to include a new partner? Just
            issue more tokens.
          </h2>
        </div>
      </div>
      <h1 className={bigTitleClass} style={{ textShadow: '3px 3px 5px #e2e2e2' }}>
        Keep relationships clear.
      </h1>
      <div className={pointsSectionClass}>
        <div style={{ maxWidth: '500px' }}>
          <h2 className={pointsHeaderClass}>
            Onboard a contributor by sending an invite pre-designed with simple legal terms. Just select one or two of
            the compensation methods and click send.
          </h2>
        </div>
        <div className="flex mt-4 justify-center md:justify-start">
          <MarketingButton className="mt-4 md:mt-8" large outlined link="/compensation" text="Learn More" />
        </div>
      </div>
    </div>
  </>
);

const ProjectPreviewCard: FC<any> = ({ project }) => {
  return (
    <Link href={`/project/${project.link}`}>
      <a title={project.title} className="w-full max-w-2xl">
        <Card
          className="mb-6 hover:shadow-md shadow-2xl rounded-lg h-42 flex-col"
          style={{ backgroundColor: project.brandColor }}
        >
          <section className="p-4 w-full text-white grid grid-cols-6">
            <div className="col-span-5">
              <h2 className="flex font-semibold text-xl flex items-center" style={{ minHeight: '40px' }}>
                {project.title}
              </h2>
              <div className="text-xs">{project.summary}</div>
            </div>

            <div className="w-15 col-span-1 flex justify-end">
              <div>
                <img src={project.logo} className="h-10 max-w-xs rounded-full" />
              </div>
            </div>
          </section>
          <section className=" w-full bg-white  px-4 py-3 rounded-b-lg">
            <section className="flex">
              <div className="flex items-center border-gray-200 border-r-2 mr-4 pr-4 flex-grow md:flex-grow-0">
                <span className="whitespace-nowrap text-sm md:text-base font-bold text-black">
                  {project.members} {`${project.members > 1 ? 'Members' : 'Member'}`}
                </span>
              </div>
              <div className="flex whitespace-nowrap items-center  border-gray-200 border-r-0 mr-4 pr-4 flex-grow md:flex-grow-0 md:border-r-2">
                <img src="/assets/images/icons/arrow-circle.svg" className="w-4 h-4 mr-2" />
                <span className="text-sm md:text-base font-bold mr-2">Seeking {project.seeking}</span>
              </div>
              <Progress
                brandColor={project.brandColor}
                lightBrand={false}
                progress={project.progress}
                className="hidden lg:flex "
              />
            </section>
            <section>
              <Progress
                brandColor={project.brandColor}
                lightBrand={false}
                progress={project.progress}
                className="flex lg:hidden border-t-2 mt-3 pt-2"
              />
            </section>
          </section>
        </Card>
      </a>
    </Link>
  );
};

const HomeBenefits: React.FC<any> = ({ projects }) => {
  return (
    <StandardSection divider backgroundColor="#F4F1EC">
      <h1 className="mb-8 md:text-xl text-cDarkBlue font-semibold">Tools</h1>
      <div className="flex min-h-full min-w-full mx-auto">
        <div className="grid md:grid-cols-2">
          <div className="col-span-1">{explainerSection}</div>
          <div className="md:col-span-1">
            {/* {projects.map((project, i) => {
              return (
                <div key={i}>
                  <ProjectPreviewCard project={project} />
                </div>
              );
            })} */}
            <div className="">
              <Card className="rounded-lg p-3 shadow-xl">
                <img src="assets/images/credit-example.png" />
              </Card>
              {/* <ContractCard
                className="shadow-2xl"
                header="Collaborator Compensation"
                mainText="Contributor Credits"
                icon="coins"
                subHeader="Contributors get in dollars or euros"
                expandedDescription="This contract automatically allocates revenue to the holders of Credits in proportion to how many Credits they have."
                content={
                  <div className="font-semibold text-gray-400 mt-4">
                    Contributors can easily "charge" for their work on an early-stage passion-project and{' '}
                    <span className="text-green-500 font-bold">claim their share</span> of dollars or euros{' '}
                    <span className="text-green-500 font-bold">once the project becomes successful</span>.
                  </div>
                }
              /> */}
            </div>
          </div>
        </div>
      </div>
    </StandardSection>
  );
};

export default HomeBenefits;
