import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyForJob } from '../../../redux/slice/jobSlice';

const ApplyModal = ({ isOpen, onClose, jobId,setApply }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.id);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    if (file) {
      formData.append('resume', file);
    }
    formData.append('userId', userId);
    formData.append('jobId', jobId);
  
    // Log the formData to check its contents
    console.log('Submitting formData:', formData);
  
    dispatch(applyForJob(formData))
      .then((response) => {
        console.log('Application submitted successfully:', response.payload);
        onClose(); // Close modal after successful submission
        setApply(true);
      })
      .catch((error) => {
        console.error('Error applying for job:', error);
        // Handle error scenarios such as displaying an error message to the user
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md text-center w-1/2">
        <h2 className="text-lg font-semibold mb-4">Apply for Job</h2>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mt-2">Message</label>
            <textarea
              className="border rounded-md px-3 py-2 w-full resize-none"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mt-2">Upload Resume</label>
            <input
              type="file"
              className="border rounded-md px-3 py-2 w-full"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4">
            Submit
          </button>
          <button onClick={onClose} className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 w-full">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
