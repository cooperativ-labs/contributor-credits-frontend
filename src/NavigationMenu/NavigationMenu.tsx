import classNames from 'classnames';
export interface NavigationMenuProps {
  className?: string;
  thumbnail: string;
  name: string;
}
import Button from '@src/components/Buttons/Button';
import Link from 'next/link';
import React from 'react';
import RoundedImage from '@src/components/RoundedImage/RoundedImage';
import styles from './NavigationMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const signUpLink =
  'https://www.sunshinelabs.io/sign-up-entrepreneurs?utm_source=cooperativ.io&utm_medium=referral&utm_campaign=cooperative%20demo%20launch';

const LogInButton: React.FC<any> = () => {
  return (
    <>
      <Button
        className=" px-5 m-2 rounded-full whitespace-nowrap bg-white border-2 border-gray-400 border-opacity-100 text-gray-400 hover:text-white hover:bg-green-500 md:w-min "
        aria-label="log in"
      >
        Log In
      </Button>
    </>
  );
};

const NavigationMenu: React.FunctionComponent<NavigationMenuProps> = ({ name, thumbnail, ...props }) => {
  const { className } = props;
  const loggedIn = false;
  return (
    <div data-test="component-navigation-menu" className={classNames(className, styles.navbar, 'text-gray-500')}>
      <Link href={signUpLink}>
        <a>Create a Project</a>
      </Link>
      {/* <div className={styles.dropdown}>
        <button className={classNames(styles.dropbtn, 'font-bold')}>
          Accounts
          <FontAwesomeIcon icon="chevron-down" className="ml-2" />
        </button>
        <div className={styles.dropdownContent}>
          <Link href="/contributer-credits">
            <a>Contributer Credits</a>
          </Link>
          <Link href="/contributer-agreements">
            <a>Contributer Agreements</a>
          </Link>
          <Link href="/equity-management">
            <a>Equity Management</a>
          </Link>
        </div>
      </div> */}
      {/* <a href="#news">Community</a> */}
      <div className="flex-grow" />
      {loggedIn ? (
        <div className={styles.dropdown}>
          <button className={classNames(styles.dropbtn, 'font-bold flex items-center')}>
            <RoundedImage src={thumbnail} className="h-8 w-8 mr-2" aria-label="Profile Thumbnail" />
            {name}
            <FontAwesomeIcon icon="chevron-down" className="ml-2" />
          </button>
          <div className={classNames(styles.dropdownContent, styles.account)}>
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
      ) : (
        <LogInButton />
      )}
    </div>
  );
};

export default NavigationMenu;
