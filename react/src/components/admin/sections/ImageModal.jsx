import React from "react";

const ImageModal = ({ showModal, imageUrl, onClose }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-black text-4xl">
            &times;
          </button>
        </div>
        <div className="mt-2">
          <img src={imageUrl} className="w-full h-auto" alt="Large view" />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
