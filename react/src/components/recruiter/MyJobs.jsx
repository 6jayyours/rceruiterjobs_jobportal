import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsClock, BsGeoAlt, BsBriefcase, BsCalendar } from "react-icons/bs";
import { getMyJob } from "../../redux/slice/jobSlice";
import { Link } from "react-router-dom";

const MyJobs = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.id);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    dispatch(getMyJob(user))
      .then((response) => {
        setJobs(response.payload);
      })
      .catch((error) => {
        console.error("Failed to fetch jobs:", error);
      });
  }, [dispatch, user]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard / My Jobs
        </h2>
      </div>
      <div className="overflow-x-auto p-2">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-gray-100 rounded-lg shadow-md p-6 mb-4"
          >
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col w-1/3">
                <div className="font-bold text-xl mb-2 text-gray-800">
                  {job.jobTitle}
                </div>
                <p className="text-gray-600 text-sm mb-2">{job.company}</p>
              </div>
              <div className="flex flex-col w-1/3">
                <div className="flex items-center mb-2">
                  <BsBriefcase className="text-blue-600 mr-1" />
                  <span className="text-gray-600">{job.salary}</span>
                </div>
                <div className="flex items-center mb-2">
                  <BsClock className="text-purple-600 mr-1" />
                  <span className="text-gray-600">{job.experience}</span>
                </div>
                <div className="flex items-center mb-2">
                  <BsCalendar className="text-indigo-600 mr-1" />
                  <span className="text-gray-600">
                    {new Date(job.postedTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <BsGeoAlt className="text-green-600 mr-1" />
                  <span className="text-gray-600">
                    {job.city}, {job.state}, {job.country}
                    {job.id}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center w-1/3 justify-end space-y-4">
                <Link to={`/recruiter/jobapplications/${job.id}`}>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md w-56">
                    View Applications
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
