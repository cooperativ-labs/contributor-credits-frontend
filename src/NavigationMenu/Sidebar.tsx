import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import SidebarItem from './SidebarItem';
import { ApplicationStoreProps, store } from '@context/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { stack as Menu } from 'react-burger-menu';

import { useContext, useState } from 'react';

const styles = {
  bmBurgerButton: {
    display: 'none',
  },
  bmBurgerBars: {
    background: '#1f2937',
  },
  bmBurgerBarsHover: {
    background: '#a90000',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: '#FFFFFF',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

const sidebarMenu = [
  {
    title: 'Projects',
    children: [{ id: 1, title: 'Sunshine Labs', link: 'project/sunshinelabs', icon: null }],
    link: null,
    icon: 'home',
  },
  {
    title: 'Accounts',
    children: [
      { id: 1, title: 'Contibuter Credits', link: '/contributer-credits', icon: null },
      { id: 1, title: 'Contibuter Agreements', link: '/contributer-agreements', icon: null },
      { id: 1, title: 'Equity Management', link: '/equity-management', icon: null },
    ],
    link: null,
    icon: 'chart-bar',
  },
  {
    title: 'Community',
    children: [],
    link: '/community',
    icon: 'comment-dots',
  },
  {
    title: 'Settings',
    children: [],
    link: '/settings',
    icon: 'cog',
  },
];

const SideBar: React.FunctionComponent = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch, sidebarOpen } = applicationStore;

  const [active, setActive] = useState(null);

  const handleOnClick = (index) => {
    if (index === active) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <div data-test="component-sidebar">
      <Menu
        className="flex flex-col"
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
        width={280}
        styles={styles}
        animation="reveal"
        isOpen={sidebarOpen}
        onClose={() => {
          dispatch({ type: 'TOGGLE_SIDEBAR' });
        }}
      >
        {sidebarMenu &&
          sidebarMenu.map((menuItem, index) => {
            return menuItem.children.length ? (
              <SidebarItem
                onClick={() => {
                  handleOnClick(index);
                }}
                key={`sideBar-item-${index}`}
              >
                <div className="flex items-center my-2">
                  <FontAwesomeIcon icon={menuItem.icon as IconName} className="text-xl text-gray-500 mr-4" />
                  <h2 className="flex-grow text-gray-500 text-left">{menuItem.title}</h2>
                  {active === index ? (
                    <FontAwesomeIcon icon="chevron-up" className="text-xl text-gray-500" />
                  ) : (
                    <FontAwesomeIcon icon="chevron-down" className="text-xl text-gray-500" />
                  )}
                </div>

                <div className={classNames(active === index ? 'inline-block' : 'hidden')}>
                  {(menuItem.children as any[]).map((menuSubItem, subMenuIndex) => {
                    return (
                      <SidebarItem
                        subItem
                        onClick={() => {
                          setActive(null);
                          // setIsMenuOpen(false);
                        }}
                        key={`sideBar-item-${index}-subItem-${subMenuIndex}`}
                      >
                        <Link href={menuSubItem.link}>
                          <a title={menuSubItem.title}>
                            <h3 className="font-bold text-sm text-gray-500 w-full text-left">{menuSubItem.title}</h3>
                          </a>
                        </Link>
                      </SidebarItem>
                    );
                  })}
                </div>
              </SidebarItem>
            ) : (
              <SidebarItem key={`sideBar-item-${index}`}>
                <Link href={menuItem.link}>
                  <a className="flex items-center my-2" title={menuItem.title}>
                    <FontAwesomeIcon icon={menuItem.icon as IconName} className="text-xl text-gray-500 mr-4" />
                    <h2 className="flex-grow text-gray-500 text-left">{menuItem.title}</h2>
                  </a>
                </Link>
              </SidebarItem>
            );
          })}
      </Menu>
    </div>
  );
};

export default SideBar;
