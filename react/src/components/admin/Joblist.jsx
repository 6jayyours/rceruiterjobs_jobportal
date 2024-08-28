import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllJobs } from '../../redux/slice/adminSlice';

const JobList = () => {
  const dispatch = useDispatch();
  const [jobs, setAllJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    dispatch(getAllJobs())
      .then((response) => {
        console.log(response.payload)
        setAllJobs(response.payload);
      })
      .catch((error) => {
        console.error("Failed to fetch jobs:", error);
      });
  }, [dispatch]);

  // Filter jobs based on search term and status filter
  const filteredJobs = jobs.filter(job => {
    return (
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? job.status === statusFilter : true)
    );
  });

  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);


  // Reset currentPage to 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Dashboard / Jobs</h2>
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
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Posted By</th>
              <th className="py-2 px-4 text-left">Job Title</th>
              <th className="py-2 px-4 text-left">Posted On</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentJobs.map((job) => (
              <tr key={job.id}>
                <td className="py-3 px-4">{job.posted}</td>
                <td className="py-3 px-4">{job.jobTitle}</td>
                <td className="py-3 px-4">{new Date(job.postedTime).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-2 py-1 rounded ${job.status === 'open' ? 'bg-green-500' : 'bg-gray-400'} text-white`}>
                    {job.status}
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
        <span>Page {currentPage} of {totalPages}</span>
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

export default JobList;
