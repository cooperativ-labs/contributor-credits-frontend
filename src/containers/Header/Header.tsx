import 'reactjs-popup/dist/index.css';
import cn from 'classnames';
import Container from '@src/containers/Container';
import Dialog from '@src/containers/Dialog/Dialog';
import JoinForm from '@src/MarketingSite/Forms/JoinForm';
import Link from 'next/link';
import Popup from 'reactjs-popup';
import ProjectIntention from '@src/components/ProjectIntention';
import React from 'react';
import RoundedImage from '@src/components/RoundedImage/RoundedImage';
import useWindowSize from '@hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCategoryOption } from '@src/utils/enumConverters';
import { ProjectInfoIntention } from 'types';
import { useRouter } from 'next/router';
import DemoWarning from '@src/components/DemoWarning/DemoWarning';

export interface HeaderProps {
  projectSlug: string;
  projectName: string;
  projectCategory: string;
  projectThumbnail;
  projectIntention: ProjectInfoIntention;
  brandColor: string;
  lightBrand: boolean;
  primaryHeader: boolean;
  page: string;
  fromInfiniteScroll?: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  projectSlug,
  projectName,
  projectCategory,
  projectIntention,
  projectThumbnail,
  brandColor,
  lightBrand,
  primaryHeader,
  page,
  fromInfiniteScroll,
}) => {
  const windowSize = useWindowSize();
  const router = useRouter();
  const breadcrumb = router.asPath?.split('/');

  const getBackLink = breadcrumb
    ? breadcrumb.includes('creator') || breadcrumb.includes('member')
      ? `/project/${projectSlug}/team/`
      : `/project/${projectSlug}`
    : null;

  const copyTextToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      alert(err);
    }
  };

  const getBaseUrl = () => {
    const l = window.location;
    const base_url = l.protocol + '//' + l.host + '/' + l.pathname.split('/')[1];
    return base_url;
  };

  const getShareLink = () => {
    const pageMap = {
      project: '/',
      member: `/team/member/${router.query.userid}`,
    };

    const link = `${getBaseUrl()}/${router.query.id}${
      pageMap[page.toLowerCase()] ? pageMap[page.toLowerCase()] : `/${page.toLowerCase()}`
    }`;
    copyTextToClipboard(link);
  };

  return (
    <header
      data-test="molecule-header"
      className={cn(
        'w-full',
        !primaryHeader && windowSize.width < 768 && 'h-32',
        (primaryHeader || windowSize.width > 768) && 'h-64'
      )}
      style={{ background: brandColor }}
    >
      <Container>
        <div className="flex w-full px-8" id={`anchor-${page.toLowerCase()}`}>
          <Link href={getBackLink}>
            <a className="self-center">
              <div
                className={cn(
                  primaryHeader || windowSize.width >= 768 || fromInfiniteScroll
                    ? 'hidden'
                    : 'text-xl ubuntu font-bold text-white flex mr-6'
                )}
              >
                <FontAwesomeIcon icon="arrow-left" className={`mx-2 ${lightBrand && 'text-gray-500'}`} />
              </div>
              <div
                className={cn(
                  windowSize.width >= 768 || primaryHeader || !fromInfiniteScroll
                    ? 'hidden'
                    : 'text-xl ubuntu font-bold text-white flex self-center mr-6'
                )}
              >
                <FontAwesomeIcon icon="arrow-up" className={`mx-2 ${lightBrand && 'text-gray-500'}`} />
              </div>
            </a>
          </Link>
          <div className="flex-grow flex flex-col justify-center z-10">
            <h2 className={cn(lightBrand ? 'text-gray-800' : 'text-white', 'inter')}>
              {primaryHeader || windowSize.width >= 768 ? getCategoryOption(projectCategory) : projectName}
            </h2>
            <h1
              className={cn(
                [primaryHeader || windowSize.width >= 768 ? 'text-5xl' : 'text-3xl', 'ubuntu font-bold'],
                [lightBrand ? 'text-gray-800' : 'text-white']
              )}
            >
              <span className="flex items-center">
                {primaryHeader || windowSize.width >= 768 ? projectName : page}
                <Popup
                  trigger={
                    <button
                      data-test="atom-join-project-button"
                      className={cn([
                        !primaryHeader && fromInfiniteScroll && windowSize.width < 768 ? 'flex' : 'hidden',
                        'ubuntu rounded-full bg-white text-green-500 px-2 py-2 w-10 h-10',
                        'items-center text-base shadow-lg flex-shrink-0 flex justify-center ml-4',
                      ])}
                      onClick={getShareLink}
                    >
                      <img src="/assets/images/icons/share.svg" className="h-4 w-4" />
                    </button>
                  }
                  position={'bottom center'}
                  on={['focus']}
                >
                  <FontAwesomeIcon icon="link" className="text-black mr-2" />
                  Copied to Clipboard
                </Popup>
              </span>
            </h1>

            {primaryHeader ? (
              <div className="md:hidden">
                <ProjectIntention intention={projectIntention} />
              </div>
            ) : null}

            <div className="hidden md:flex md:w-full">
              <Dialog
                trigger={
                  <button
                    data-test="join-project"
                    className={cn([
                      primaryHeader || windowSize.width >= 768 ? 'flex' : 'hidden',
                      'ubuntu rounded-full font-bold bg-white text-green-500 px-4 py-2 max-w-max',
                      'items-center text-base shadow-lg mt-4 flex-shrink-0',
                    ])}
                  >
                    <img src="/assets/images/icons/plus.svg" className="h-4 w-4 mr-2" /> Contact Project
                  </button>
                }
                body={<JoinForm projectName={projectName} className="p-2 md:p-8" />}
              />
              <Popup
                trigger={
                  <button
                    data-test="atom-join-project-button"
                    className={cn([
                      primaryHeader || windowSize.width >= 768 ? 'flex' : 'hidden',
                      'ubuntu rounded-full bg-white text-green-500 px-2 py-2 w-10 h-10',
                      'items-center text-base shadow-lg mt-4 flex-shrink-0 flex justify-center ml-2',
                    ])}
                    onClick={getShareLink}
                  >
                    <img src="/assets/images/icons/share.svg" className="h-4 w-4" />
                  </button>
                }
                position={'right center'}
                on={['focus']}
              >
                <FontAwesomeIcon icon="link" className="text-black mr-2" />
                Copied to Clipboard
              </Popup>
            </div>
          </div>
          {projectThumbnail && (
            <div className="absolute top-4 right-2 md:static opacity-20 md:opacity-60  md:flex flex-grow justify-end flex-shrink-0 z-0">
              <RoundedImage
                src={projectThumbnail ? projectThumbnail : '/assets/images/company-logos/company-placeholder.jpeg'}
                className={cn([!primaryHeader && windowSize.width < 768 ? 'hidden' : 'max-w-xxs'])}
              />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
