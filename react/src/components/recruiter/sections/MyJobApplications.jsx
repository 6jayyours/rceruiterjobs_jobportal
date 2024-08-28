import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {getSingleJobApps,} from "../../../redux/slice/jobSlice"


const MyJobApplications = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [apps, setApps] = useState([]);
  const appsPerPage = 6;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleJobApps(id))
      .then((response) => {
        console.log(response.payload);
        setApps(response.payload);
      })
      .catch((error) => {
        console.error("Failed to fetch applications:", error);
      });
  }, [dispatch]);

  const totalPages = Math.ceil(apps.length / appsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleStatusChange = (appId, newStatus) => {
    const formData = {
      applicationId: appId,
      status: newStatus,
    };
    dispatch(updateApplicationStatus(formData))
      .then((response) => {
        // Update the local state with the updated application status
        const updatedApps = apps.map((app) =>
          app.applicationId === appId ? { ...app, status: newStatus } : app
        );
        setApps(updatedApps);
      })
      .catch((error) => {
        console.error("Failed to update application status:", error);
      });
  };

  const handleDownloadResume = (downloadUrl) => {
    // Use window.open to initiate the download
    window.open(downloadUrl, "_blank");
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Job / Applications
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Job Title</th>
              <th className="py-2 px-4 text-left">Posted By</th>
              <th className="py-2 px-4 text-left">Applicant</th>
              <th className="py-2 px-4 text-left">Application Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {apps.map((app) => (
              <tr key={app.applicationId}>
                <td className="py-3 px-4">{app.jobTitle}</td>
                <td className="py-3 px-4">{app.postedBy}</td>
                <td className="py-3 px-4">{app.applicant}</td>
                <td className="py-3 px-4">
                  <select
                    value={app.status}
                    onChange={(e) =>
                      handleStatusChange(app.applicationId, e.target.value)
                    }
                    disabled={app.status !== "open"} // Disable the dropdown if status is not "Open"
                    className={`px-2 py-1 rounded ${
                      app.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <option value="Open">Open</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <Link to={`/userdetail/${app.appliedBy}`}>
                    <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      View Profile
                    </button>
                  </Link>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleDownloadResume(app.downloadUrl)}
                  >
                    Download Resume
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-gray-300 rounded bg-gray-200 hover:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border border-gray-300 rounded bg-gray-200 hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyJobApplications;
