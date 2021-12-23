import Button from '@src/components/Buttons/Button';
import cn from 'classnames';
import Popup from 'reactjs-popup';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export interface PopUpProps {
  className?: string;
  title: string;
  close?: boolean;
  buttonText: string;
  action: () => void;
}

export const GeneralUseJoinButton: React.FunctionComponent<PopUpProps> = ({ action, buttonText, title }) => {
  return (
    <Button
      className="p-2 text-white bg-green-500 hover:bg-green-400 rounded shadow-shareButton w-full md:w-min relative"
      aria-label={'Join this project'}
      onClick={action}
    >
      <span className="font-bold md:hidden">{title}</span>
      <span className="hidden md:inline-block mx-3 my-1 whitespace-nowrap font-bold">{buttonText}</span>
    </Button>
  );
};

export const PopUp: React.FunctionComponent<PopUpProps> = ({
  title,
  close = false,
  buttonText,
  action = () => {},
  ...props
}) => {
  const { className } = props;
  const router = useRouter();

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
    const link = `${getBaseUrl()}/${router.query.id}`;
    copyTextToClipboard(link);
  };

  return (
    <div
      data-test="component-pop-up"
      className={cn(
        className,
        'md:hidden flex align-center fixed bottom-0 bg-white py-4 pb-6 px-8  shadow-lgreverse w-full z-20'
      )}
    >
      <GeneralUseJoinButton action={action} buttonText={buttonText} title={title} />
      <Popup
        trigger={
          <button
            data-test="share"
            className="md:hidden shadow-shareButton ml-6 rounded-full bg-white pl-2 py-2 w-10 h-10 items-center text-base flex-shrink-0 flex justify-center ml-2"
            onClick={getShareLink}
          >
            <img src="/assets/images/icons/share.svg" className="h-4 w-4 mr-2" />
          </button>
        }
        position={'left center'}
        on={['focus']}
      >
        <FontAwesomeIcon icon="link" className="text-black mr-2" />
        Copied to Clipboard
      </Popup>
    </div>
  );
};
