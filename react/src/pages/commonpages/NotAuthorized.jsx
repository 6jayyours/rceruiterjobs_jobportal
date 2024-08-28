import React from 'react';
import naImg from '../../assets/401.jpg';

const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-screen bg-gray-100">
      <div className="max-w-lg bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <img src={naImg} alt="Not Authorized" className="max-w-full h-auto mb-6" />
        <h1 className="text-2xl font-bold mb-4 text-gray-800">401 - Not Authorized</h1>
        <p className="text-lg text-gray-600 mb-6">Sorry, you do not have permission to access this page.</p>
        <a href="/" className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default NotAuthorized;
