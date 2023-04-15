import BaseCard from './cards/BaseCard';
import React, { useEffect } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type ActionDialogProps = {
  visible: boolean;
  children: React.ReactNode;
  preventClose?: boolean;
  onClose: (e) => void;
};

const ActionDialog: React.FunctionComponent<ActionDialogProps> = ({
  visible = true,
  preventClose,
  onClose = () => {},
  ...props
}) => {
  const { children, ...rest } = props;
  const windowSize = useWindowSize();

  /** @TODO : Fix scrolling */
  useEffect(() => {
    if (visible && windowSize.width > 768) {
      // setScrollY(window.scrollY);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      // window.scrollTo(0, parseInt(scrollY));
    }
  }, [visible, windowSize.width]);

  return (
    <div data-test="component-payment-send" {...rest}>
      {visible && (
        <div
          id="dialog-curtain"
          className="w-screen md:h-screen absolute top-0 bottom-0 right-0 left-0 md:flex justify-center items-center z-50 bg-gray-500 bg-opacity-0 md:bg-opacity-80"
          onClick={(e: any) => {
            /** @TODO : fix typescript */
            if (e.target.id === 'dialog-curtain' && !preventClose) {
              onClose(e);
            }
          }}
        >
          <BaseCard
            className="mx-4 absolute right-0 left-0 top-32 md:top-0 md:relative flex-col px-6 pt-6 pb-6 md:w-96 rounded-xl md:rounded-lg shadow-modal"
            style={{ overflow: 'smooth' }}
          >
            {!preventClose && (
              <button
                id="close-button"
                onClick={(e) => {
                  e.preventDefault();
                  onClose(e);
                }}
                className="absolute hover:shadow-lg text-gray-800 -top-1 -right-1 w-10 h-10 m-2 rounded-full"
              >
                <FontAwesomeIcon icon="times" />
              </button>
            )}
            <div>{children}</div>
          </BaseCard>
        </div>
      )}
    </div>
  );
};

export default ActionDialog;
