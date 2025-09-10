import React, { useState, useEffect } from 'react';
import Dialog from '@src/containers/Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShutdownWarningModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed this warning
    const hasDismissed = localStorage.getItem('shutdown-warning-dismissed');
    if (!hasDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('shutdown-warning-dismissed', 'true');
  };

  return (
    <Dialog visible={isVisible} onClose={handleDismiss}>
      <div className="p-6 max-w-md">
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon="times" className="text-red-500 text-2xl mr-3" />
          <h2 className="text-xl font-bold text-gray-800">Service Notice</h2>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            The database service we use for Contributor Credits is shutting down. We look forward to moving to another
            provider, but in the meantime the user interface for paying and cashing in credits will be unavailable.
          </p>

          <p className="text-gray-700 leading-relaxed mt-3">
            If you need to transact, please email{' '}
            <a href="mailto:support@cooperativ.io" className="text-blue-600 hover:text-blue-800 underline">
              support@cooperativ.io
            </a>{' '}
            and include your name and wallet address with your request.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleDismiss}
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            I Understand
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ShutdownWarningModal;
