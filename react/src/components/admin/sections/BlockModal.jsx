import React from 'react'

const BlockModal = ({ isOpen, onRequestClose, setReason,reason,id, handleUserStatus}) => {

    const handleBlockUser = () => {
    onRequestClose(); // Close the modal after handling
    // Call handleUserStatus function from parent component
    handleUserStatus(id, reason);
    };
    

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-auto overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-lg mx-auto my-6">
        {/* Modal content */}
        <div className="bg-white rounded-lg shadow-xl relative flex flex-col w-full p-6">
          {/* Modal header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Block User</h2>
            <button
              onClick={onRequestClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* Modal body */}
          <div className="mb-4">
            <label className="block mb-2">Select Block Reason:</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Reason</option>
          <option value="violation">Violation of Terms</option>
          <option value="misconduct">Misconduct</option>
          <option value="temporary">Temporary Block</option>
            </select>
          </div>
          {/* Modal footer */}
          <div className="flex justify-end space-x-4">
            <button onClick={onRequestClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button  
            onClick={() => handleBlockUser()}
            className="px-4 py-2 bg-red-500 text-white rounded">
              Block User
            </button>
          </div>
        </div>
      </div>
      {/* Overlay */}

    </div>
  )
}

export default BlockModal