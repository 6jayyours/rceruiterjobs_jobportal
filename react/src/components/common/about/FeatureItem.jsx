import React from 'react'

const FeatureItem = ({ icon, title, description }) => {
  return (
    
    <>
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
    <div className="mb-4">{icon}</div>
    <h6 className="text-lg font-semibold text-gray-800 mb-2">{title}</h6>
    <p className="text-gray-600">{description}</p>
  </div>
    </>
  )
}

export default FeatureItem