import '@fortawesome/fontawesome-svg-core/styles.css';
import '@styles/main.css';
import '@styles/tailwind.css';
import 'tailwindcss/tailwind.css';
import React, { ReactElement, useEffect, useState } from 'react';

import SetAppContext from '@src/SetAppContext';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowRight,
  faBrain,
  faChartBar,
  faChartLine,
  faCheck,
  faChevronDown,
  faChevronUp,
  faClock,
  faCoins,
  faCommentDots,
  faDatabase,
  faDownload,
  faFileImage,
  faFilePdf,
  faFilePowerpoint,
  faFileWord,
  faHome,
  faPaintBrush,
  faPiggyBank,
  faPlay,
  fas,
  faSearchDollar,
  faStar,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { fab, faGithub, faLinkedin, faPython, faReact, faSlackHash } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;
import { StateProvider } from '@context/store';
import { useAnalytics } from 'hooks/analytics';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import SetCookieContext from '@src/SetCookieContext';
import CookieBanner from '@src/CookieBanner';

library.add(fas, faCommentDots);
library.add(fas, faHome);
library.add(fas, faChartBar);
library.add(fas, faArrowRight);
library.add(fas, faCoins);
library.add(fas, faPlay);
library.add(fas, faStar);
library.add(fas, faChevronUp);
library.add(fas, faChevronDown);
library.add(fas, faPiggyBank);
library.add(fas, faUser);
library.add(fas, faChartLine);
library.add(fas, faDownload);
library.add(fas, faFileWord);
library.add(fas, faFilePdf);
library.add(fas, faFilePowerpoint);
library.add(fas, faFileImage);
library.add(fas, faClock);
library.add(fas, faCheck);
library.add(fas, faTimes);
library.add(fas, faPaintBrush);
library.add(fab, faPython);
library.add(fab, faReact);
library.add(fas, faBrain);
library.add(fas, faSearchDollar);
library.add(fas, faDatabase);
library.add(fab, faLinkedin);
library.add(fab, faSlackHash);
library.add(fab, faGithub);

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function MyApp({ Component, pageProps }): ReactElement {
  const [cookiesApproved, setCookiesApproved] = useState(undefined);

  const withCookies = (
    <SetCookieContext>
      <div id="outer-container" className="bg-gradient-to-b from-gray-100 to-blue-50 flex flex-col">
        <main id="page-wrap flex-grow h-full">
          <Component {...pageProps} />
        </main>
      </div>
    </SetCookieContext>
  );

  const withoutCookies = (
    <div id="outer-container" className="bg-gradient-to-b from-gray-100 to-blue-50 flex flex-col">
      <main id="page-wrap flex-grow h-full">
        <Component {...pageProps} />
        <CookieBanner />
      </main>{' '}
    </div>
  );

  useEffect(() => {
    const result = window.localStorage?.getItem('COOKIE_APPROVED');
    setCookiesApproved(result);
  }, [setCookiesApproved]);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <SetAppContext>
        <StateProvider>{cookiesApproved === 'approved' ? withCookies : withoutCookies}</StateProvider>
      </SetAppContext>
    </Web3ReactProvider>
  );
}
