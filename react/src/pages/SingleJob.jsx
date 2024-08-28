import React, { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { FaRegClock,FaUser, FaBuilding } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { CgOrganisation } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { checkJobExists, getJob } from "../redux/slice/jobSlice";
import { useParams } from "react-router";
import ApplyModal from "../components/user/modals/ApplyModal";

const SingleJob = () => {
  const userId = useSelector((state) => state.auth.id);

  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleApply = () => {
    setIsModalOpen(true); // Open the modal when applying
};
const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal when it's closed
};

const handleSendMessage = (user) => {
  console.log(user);
  const queryString = `userId=${encodeURIComponent(user)}`;
  window.location.href = `/message/user?${queryString}`;
};

  const [job, setJob] = useState("");
  const [requirement, setRequirement] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const requirementsArray = requirement.split(/(?:\d+\.\s)/).filter(req => req.trim() !== '');
  const responsibilityArray = responsibility.split(/(?:\d+\.\s)/).filter(req => req.trim() !== '');

  useEffect(() => {
    dispatch(getJob(id))
      .then(response => {
        setJob(response.payload);
        setRequirement(response.payload.requirements);
        setResponsibility(response.payload.responsibilities); // Ensure this line is added
      })
      .catch(error => {
        console.error('error fetching jobs', error);
      });
  }, [dispatch, id]); // Ensure `id` is added to the dependency array


  const [apply, setApply] = useState(false);

  useEffect(() => {
    dispatch(checkJobExists({ jobId:id, appliedBy: userId }))
    .then((response) => {
      if(response.payload){
        setApply(response.payload)
      }
    })
    .catch((error) => {
    });
  }, [dispatch, id, userId]);

  return (
    <div className="mx-auto min-h-screen flex flex-col justify-center items-center p-4 md:p-8 lg:p-16 mt-12 md:mt-4 bg-gray-50">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-200 p-12 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-indigo-700">{job.jobTitle}</h1>
            <div className="flex flex-wrap mt-2">
              <div className="flex items-center gap-1 mr-4 text-gray-700">
                <CgOrganisation />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-1 mr-4 text-gray-700">
                <FiMapPin />
                <span>{job.state}, {job.country}</span>
              </div>
              <div className="flex items-center gap-1 mr-4 text-gray-700">
                <FaRegClock />
                <span>Posted on: January 1, 2024</span>
              </div>
              <div className="flex items-center gap-1 text-gray-700">
                <GiMoneyStack />
                <span>{job.salary}</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="bg-indigo-400 text-white px-3 py-1 rounded-full">{job.jobType}</span>
            </div>
          </div>
          <div>
          {apply ? (
        <div className="bg-green-200 text-green-800 px-4 py-2 rounded-lg">
          Already Applied
        </div>
      ) : (
        <div>
          <button
            onClick={handleApply}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition duration-300"
          >
            Apply For Job
          </button>
        </div>
      )}
          </div>
        </div>

        <div className="p-6">
          <div className="mt-4">
            <h2 className="text-xl font-bold text-indigo-700">Job Description:</h2>
            <p className="text-gray-700 mt-2">
              {job.description}
            </p>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold text-indigo-700">Requirements:</h2>
            <ul className="list-disc list-inside ml-4">
              {requirementsArray.map((requirement, index) => (
                <li key={index} className="text-slate-600">{requirement}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <div className="flex gap-6">
              <div className="flex flex-col">
                <div className="bg-indigo-400 px-3 py-1 rounded-md mb-2 text-white">{job.skills}</div>
                <div className="bg-indigo-400 px-3 py-1 rounded-md mb-2 text-white">{job.jobLevel}</div>
                <div className="bg-indigo-400 px-3 py-1 rounded-md text-white">{job.jobType}</div>
              </div>
              <div className="flex flex-col">
                <div className="bg-indigo-400 px-3 py-1 rounded-md mb-2 text-white">{job.qualification}</div>
                <div className="bg-indigo-400 px-3 py-1 rounded-md text-white">{job.experience}</div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold text-indigo-700">Responsibilities:</h2>
            <ul className="list-disc list-inside ml-4">
              {responsibilityArray.map((responsibility, index) => (
                <li key={index} className="text-slate-600">{responsibility}</li>
              ))}
            </ul>
          </div>
          <ApplyModal isOpen={isModalOpen} onClose={handleModalClose} jobId={id} userId={userId} setApply={setApply}/>
        </div>
        <div className="p-6 flex items-center justify-between border-t border-gray-200">
          <div className="w-3/4">
          <h1 className="text-lg font-semibold text-gray-700 flex items-center">
              <FaUser className="mr-2" /> Job Posted By: {job.posted}
            </h1>
            <h2 className="text-lg font-semibold text-gray-700 flex items-center mt-2">
              <FaBuilding className="mr-2" /> Company: {job.company}
            </h2>
          </div>
          <div className="w-1/4 text-right">
            <button 
            onClick={() => handleSendMessage(job.user)}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition duration-300">
              Send recruiter a Message
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SingleJob;
