import React from 'react';

const Modal = ({ isOpen, onClose, children, hideCloseButton = false }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 shadow-lg flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white w-[27%] rounded-lg relative animate-modalIn">
                    {!hideCloseButton && (
                        <button
                            onClick={onClose}
                            className="absolute z-10 top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                    {children}
                </div>
            </div>
            <style>
                {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
  
            @keyframes modalIn {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
  
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }
  
            .animate-modalIn {
              animation: modalIn 0.3s ease-out;
            }
          `}
            </style>
        </>

    );
};

export default Modal;
