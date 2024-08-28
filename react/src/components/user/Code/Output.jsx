import React from 'react'

const Output = ({runCode, output,isLoading,error}) => {
  return (
    <div className='w-1/2 '>
        <h2 className='mb-2 text-lg'>Output</h2>
        <button
        className={`bg-green-700 rounded-md p-2 w-30 h-9 mb-2 flex justify-center items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={!isLoading ? runCode : null}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
        ) : (
          'Run code'
        )}
      </button>
      <div className={`h-[75vh] bg-black p-2 mt-4 ${error ? 'text-red-500' : 'text-white'}`}>
        {output ? 
          output.map(
            (line,i) => <p key={i}>{line}</p>
          )
         :
          'Click run code to see the output'}
      </div>
    </div>
  )
}

export default Output