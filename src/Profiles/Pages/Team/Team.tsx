import cn from 'classnames';
import Container from '@src/containers/Container';
import JoinButton from '@src/components/JoinButton';
import ListContributor from '@src/containers/ListContributor';
import ListCreator from '@src/containers/ListCreator';
import OneColumnCard from '@src/containers/Organisms/OneColumnCard';
import ProjectLayout from '@src/Layouts/ProjectLayout';
import React, { FC } from 'react';
import TwoColumnLayout from '@src/Layouts/TwoColumnLayout';
import { GetCcPayments, GetPaymentsFromProjectUsers } from '@src/utils/helpersMoney';
import { getUsersByRole } from '@hooks/useProjectUsers';
import { Project, ProjectUserRole } from 'types';

export interface TeamProps {
  project: Project;
  fromInfiniteScroll?: boolean;
}

const Team: React.FunctionComponent<TeamProps> = ({ project, fromInfiniteScroll }) => {
  const creators = getUsersByRole(project.projectUsers, ProjectUserRole.Creator);
  const contributors = getUsersByRole(project.projectUsers, ProjectUserRole.Contributor);
  const advisors = getUsersByRole(project.projectUsers, ProjectUserRole.Advisor);
  // const windowSize = useWindowSize();

  const withoutArchived = (memberList) => {
    return memberList.filter((member) => !member.archived);
  };

  const InviteFirstContributor: FC = () => {
    return (
      <div className="px-8 py-4 ">
        {`${project.name} is just getting started. You could be the first contributor!`}{' '}
        <div className="mt-3">
          <JoinButton name={project.name} generalUse={true} />
        </div>
      </div>
    );
  };

  return (
    <ProjectLayout project={project} primaryHeader={false} page="Team" fromInfiniteScroll={fromInfiniteScroll}>
      <Container className="px-4">
        <div className="md:mx-4">
          <TwoColumnLayout twoThirdsLayout>
            {/** Slot 1 */}
            {creators &&
              creators.map((creator, i) => {
                return <ListCreator key={i} creator={creator} />;
              })}
            {/** Slot 2 */}

            <OneColumnCard
              slot1Header="Our Team"
              slot1HeaderClass="px-8 hidden md:inline-block"
              className={'pt-4 pb-1 md:pt-8 md:pb-1 '}
              // style={windowSize.width > 768 ? { minWidth: '25rem' } : null}
              slot1={
                <section>
                  {withoutArchived(contributors)?.length ? (
                    withoutArchived(contributors).map((contributor, i) => {
                      return (
                        <ListContributor
                          className={cn(
                            i < withoutArchived(contributors).length - 1 && 'border-b-2',
                            'px-8 py-4 border-gray-200'
                          )}
                          key={contributor.id}
                          id={contributor.user.id}
                          displayName={contributor.user.displayName ?? contributor.user.fullName}
                          title={contributor.title}
                          thumbnail={contributor.user.profileImage}
                          coins={GetCcPayments(GetPaymentsFromProjectUsers([contributor]))}
                        />
                      );
                    })
                  ) : (
                    <InviteFirstContributor />
                  )}
                </section>
              }
            />
            {/** Slot 3 */}
            {null}
            {/** Slot 4 */}
            {withoutArchived(advisors)?.length && (
              <OneColumnCard
                slot1Header="Our Advisors"
                slot1HeaderClass="px-8 hidden md:inline-block"
                className={'pt-4 pb-1 md:pt-8 md:pb-1 '}
                // style={windowSize.width > 768 ? { minWidth: '25rem' } : null}
                slot1={
                  <section>
                    {withoutArchived(advisors).map((contributor, i) => {
                      return (
                        <ListContributor
                          className={cn(
                            i < withoutArchived(advisors).length - 1 && 'border-b-2',
                            'px-8 py-4 border-gray-200'
                          )}
                          key={contributor.id}
                          id={contributor.user.id}
                          displayName={contributor.user.displayName ?? contributor.user.fullName}
                          title={contributor.title}
                          thumbnail={contributor.user.profileImage}
                          coins={GetCcPayments(GetPaymentsFromProjectUsers([contributor]))}
                        />
                      );
                    })}
                  </section>
                }
              />
            )}
          </TwoColumnLayout>
        </div>
      </Container>
    </ProjectLayout>
  );
};

export default Team;
