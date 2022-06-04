import Card from '@src/containers/Card';
import cn from 'classnames';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

export interface DialogProps {
  className?: string;
  children: React.ReactNode;
  visible: boolean;
  onClose: (e) => void;
}

const Dialog: React.FunctionComponent<DialogProps> = ({ children, visible = true, onClose = () => {}, ...props }) => {
  const { className, ...rest } = props;
  // const [scrollY, setScrollY] = useState(undefined);

  /** @TODO : Fix scrolling */
  useEffect(() => {
    if (visible) {
      // setScrollY(window.scrollY);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      // window.scrollTo(0, parseInt(scrollY));
    }
  }, [visible]);

  return (
    <div data-test="component-dialog" {...rest}>
      {visible && (
        <div
          id="dialog-curtain"
          className={cn(
            'w-screen h-screen absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center z-40 bg-white bg-opacity-80'
          )}
          onClick={(e: any) => {
            /** @TODO : fix typescript */
            if (e.target.id === 'dialog-curtain') {
              onClose(e);
            }
          }}
        >
          <Card className={cn(className, 'relative')}>
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
            {children}
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dialog;
