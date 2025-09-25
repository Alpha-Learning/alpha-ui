import React, { ReactNode } from 'react';
import { IoClose } from '@react-icons/all-files/io5/IoClose';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h3 className="text-lg pt-2 font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            type="button"
            aria-label="Close modal"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
          >
            <IoClose size={20} />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[calc(80vh-60px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;