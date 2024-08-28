import React from 'react'
import nfImg from '../../assets/404.jpg'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-screen bg-gray-100">
      <div className="max-w-lg bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <img src={nfImg} alt="Not Authorized" className="max-w-full h-auto mb-6" />
        <h1 className="text-2xl font-bold mb-4 text-gray-800">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Go to Home
        </a>
      </div>
    </div>
  )
}

export default NotFound