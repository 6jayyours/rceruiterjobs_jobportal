import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { getMyApps } from "../../redux/slice/jobSlice";
import { Link } from "react-router-dom";

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const [apps, setApps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const appsPerPage = 6;

  const id = useSelector((state) => state.auth.id);

  useEffect(() => {
    dispatch(getMyApps(id))
      .then((response) => {
        console.log(response.payload);
        setApps(response.payload);
      })
      .catch((error) => {
        console.error('Failed to fetch applications:', error);
      });
  }, [dispatch, id]);

  // const filteredApps = apps.filter(app => {
  //   return (
  //     app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     (statusFilter ? app.status === statusFilter : true)
  //   );
  // });

  // // Calculate pagination
  // const indexOfLastApp = currentPage * appsPerPage;
  // const indexOfFirstApp = indexOfLastApp - appsPerPage;
  // const currentApps = filteredApps.slice(indexOfFirstApp, indexOfLastApp);
  // const totalPages = Math.ceil(filteredApps.length / appsPerPage);

  // const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  


  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard / Applied Jobs
        </h2>
      </div>
      {apps.map((app) => (
        <div key={app.applicationId} className="rounded-md border border-gray-300 mb-4">
          <div className="border-b border-gray-400 p-4">
            <div className="flex justify-between items-center">
              <div className="w-1/3 flex flex-col items-center text-center">
                <h1 className="text-xl font-semibold">{app.jobTitle}</h1>
                <h2 className="text-gray-600">Recruiter: {app.postedBy}</h2>
              </div>
             
              <div className="w-1/3 mx-4 flex flex-col items-center text-center px-2 py-1">
                <h3 className="text-gray-600 mb-1">Application Status</h3>
                <ProgressBar status={[app.action]} />
              </div>
              <div className="w-1/3 flex flex-col items-center text-center">
                <Link to={`/jobdetail/${app.jobId}`}>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                    View Job
                  </button>
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppliedJobs;
