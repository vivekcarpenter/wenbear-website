import React from "react";

const Modal = ({ title, children, onClose ,open=true}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content with text wrap fix */}
        <div className="overflow-y-auto p-5 max-h-[70vh] break-words">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
