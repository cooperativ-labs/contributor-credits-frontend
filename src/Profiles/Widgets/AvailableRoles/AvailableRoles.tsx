import 'react-multi-carousel/lib/styles.css';
import AvailableRole from './AvailableRole';
import Carousel from 'react-multi-carousel';
import cn from 'classnames';
import React from 'react';
import { ProjectOpportunitiesJob } from 'types';

export interface AvailableRolesProps {
  className?: string;
  availableRoles: ProjectOpportunitiesJob[];
}

const AvailableRoles: React.FunctionComponent<AvailableRolesProps> = ({ availableRoles, ...props }) => {
  const { className, ...rest } = props;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  return (
    <>
      {availableRoles.length > 0 ? (
        <section data-test="component-available-roles" className={cn(className)} {...rest}>
          <h1 className="text-xl md:text-2xl font-bold mx-8 mt-8 md:mt-0 md:mx-0">Help We Are Looking For 👀</h1>
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr // means to render carousel on server-side.
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={['tablet', 'mobile']}
            centerMode={true}
            dotListClass="custom-dot-list-style"
            itemClass="inline-block text-center my-8 min-w-max mx-2 md:mx-4"
            className=""
            deviceType="mobile"
          >
            {availableRoles.map((role, index) => {
              return !role.archived && <AvailableRole role={role} key={index} />;
            })}
          </Carousel>
        </section>
      ) : null}
    </>
  );
};

export default AvailableRoles;
