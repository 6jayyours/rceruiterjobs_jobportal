import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllApps } from "../../redux/slice/adminSlice";

const Applicationlist = () => {
  const dispatch = useDispatch();
  const [apps, setApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const appsPerPage = 6;

  useEffect(() => {
    dispatch(getAllApps())
      .then((response) => {
        console.log(response.payload);
        setApps(response.payload);
      })
      .catch((error) => {
        console.error("Failed to fetch applications:", error);
      });
  }, [dispatch]);

  // Filter applications based on search term and status filter
  const filteredApps = apps.filter((app) => {
    return (
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? app.status.toLowerCase() === statusFilter.toLowerCase() : true)
    );
  });

  // Calculate pagination
  const indexOfLastApp = currentPage * appsPerPage;
  const indexOfFirstApp = indexOfLastApp - appsPerPage;
  const currentApps = filteredApps.slice(indexOfFirstApp, indexOfLastApp);
  const totalPages = Math.ceil(filteredApps.length / appsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Reset currentPage to 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Dashboard / Applications</h2>
      </div>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by job title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Statuses</option>
          <option value="Accepted">Accepted</option>
          <option value="open">Open</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Job Title</th>
              <th className="py-2 px-4 text-left">Posted By</th>
              <th className="py-2 px-4 text-left">Applicant</th>
              <th className="py-2 px-4 text-left">Application Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentApps.map((app) => (
              <tr key={app.id}>
                <td className="py-3 px-4">{app.jobTitle}</td>
                <td className="py-3 px-4">{app.postedBy}</td>
                <td className="py-3 px-4">{app.applicant}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 rounded text-white ${
                      app.status === "Accepted"
                        ? "bg-green-500"
                        : app.status === "open"
                        ? "bg-blue-500"
                        : "bg-red-500"
                    }`}
                  >
                    {app.status}
                  </span>
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

export default Applicationlist;
