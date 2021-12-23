import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export interface TabsProps {
  activeTabs: any /** @TODO : shape */;
  brandColor?: string;
}

const Tabs: React.FunctionComponent<TabsProps> = ({ brandColor, activeTabs }) => {
  const carouselRef = useRef(null);
  const router = useRouter();
  const slug = router.query.id;
  const baseTabs = [
    { title: 'Project', link: `/project/${slug}` },
    { title: 'Team', link: `/project/${slug}/team` },
    { title: 'Opportunities', link: `/project/${slug}/opportunities` },
    { title: 'Contracts', link: `/project/${slug}/contracts` },
  ];
  const tabs = activeTabs ? baseTabs.filter((tab) => activeTabs[tab.title.toLowerCase()]) : baseTabs;
  const tabKeys = {
    project: 5,
    team: 6,
    opportunities: 7,
    contracts: 8,
  };
  const currentTab = () => {
    let activeTab;
    const tabs = ['project', 'team', 'opportunities', 'contracts'];
    tabs.forEach((tab) => {
      if (router.pathname.split('/').includes(tab)) {
        activeTab = tab;
      }
    });
    if (!activeTab) {
      activeTab = 'project';
    }
    return activeTab;
  };
  const tabClasses = (testTab) => {
    const activeTab = currentTab();
    return testTab === activeTab ? 'font-bold border-b-2' : '';
  };
  const tabStyles = useCallback(
    (testTab) => {
      const activeTab = currentTab();
      return testTab === activeTab ? { borderColor: brandColor } : {};
    },
    [currentTab, brandColor]
  );
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

  useEffect(() => {
    /** @TODO : this feels dirty... */
    setTimeout(() => {
      const shiftTabs = tabKeys[currentTab()];
      carouselRef.current.goToSlide(shiftTabs, true);
    }, 0);
  }, [currentTab, tabKeys]);

  /** @Todo : Carousel needs device type set for SSR, need to setup function to determine... */
  return (
    <div className="bg-white md:border-b-2 md:border-gray-200 flex">
      <div className="md:hidden w-full">
        <Carousel
          ref={carouselRef}
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
          itemClass="inline-block w-full text-center my-8 min-w-max"
          deviceType="desktop"
        >
          {tabs.map((tab, index) => {
            return (
              <Link href={tab.link} key={index}>
                <a
                  className={classNames(tabClasses(tab.title.toLowerCase()), 'px-4 py-2')}
                  style={tabStyles(tab.title.toLowerCase())}
                >
                  {tab.title}
                </a>
              </Link>
            );
          })}
        </Carousel>
      </div>
      <div
        className="hidden md:flex md:bg-white md:pt-4 md:pb-4 md:pl-8 lg:pl-8 mx-auto w-full"
        style={{ maxWidth: '1280px' }}
      >
        {tabs.map((tab, index) => {
          return (
            <Link href={tab.link} key={index}>
              <a
                className={classNames(tabClasses(tab.title.toLowerCase()), 'px-10 py-2')}
                style={tabStyles(tab.title.toLowerCase())}
              >
                {tab.title}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
