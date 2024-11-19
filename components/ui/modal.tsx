import React, { useEffect } from "react";

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50 cursor-pointer" onClick={onClose}></div>
        <div className="bg-primary-foreground rounded-lg shadow-lg p-10 z-10 w-[90%] max-w-[600px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] h-auto max-h-[90%] sm:max-h-[80%] md:max-h-[85%] lg:max-h-[80%] overflow-y-auto">
          <button className="absolute top-0 right-0 m-4 text-gray-600 text-lg md:text-xl lg:text-2xl" onClick={onClose}>
            &times;
          </button>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl">
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export { Modal };

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
