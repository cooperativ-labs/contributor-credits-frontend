import '../styles/hamburgers.css';
import '@styles/main.css';
import '@styles/tailwind.css';
import 'tailwindcss/tailwind.css';
import AnalyticsContext from '@context/analytics';
import React, { ReactElement } from 'react';

import {
  faArrowRight,
  faBrain,
  faChartBar,
  faChartLine,
  faCheck,
  faChevronDown,
  faChevronUp,
  faClock,
  faCog,
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
import { library } from '@fortawesome/fontawesome-svg-core';
import { StateProvider } from '@context/store';
import { useAnalytics } from 'hooks/analytics';
import { Web3Provider } from '@ethersproject/providers';
import SetAppContext from '@src/SetAppContext';
import { ApolloProvider } from '@apollo/client';
import useApollo from '@src/utils/apolloClient';

library.add(fas, faCog);
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

export default function MyApp({ Component, pageProps }): ReactElement {
  const [dynamicDimensions, setDynamicDimensions] = useAnalytics();
  const analyticsContext = { dynamicDimensions, setDynamicDimensions };

  return (
    <SetAppContext pageProps={pageProps}>
      <StateProvider>
        <AnalyticsContext.Provider value={analyticsContext}>
          <div id="outer-container" className="bg-gray-200 flex flex-col">
            <main id="page-wrap flex-grow h-full">
              <Component {...pageProps} />
            </main>
          </div>
        </AnalyticsContext.Provider>
      </StateProvider>
    </SetAppContext>
  );
}
