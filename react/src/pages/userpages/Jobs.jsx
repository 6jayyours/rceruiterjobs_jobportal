import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllJobs } from "../../redux/slice/jobSlice";
import Banner from "../../components/user/Banner";
import JobList from "../../components/user/JobList";

const Jobs = () => {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllJobs())
      .then(response => {
        setJobs(response.payload);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const filteredJobs = jobs.filter(job => {
    return (
      (query === '' || job.jobTitle.toLowerCase().includes(query.toLowerCase())) &&
      (selectedCategory === '' || job.jobCategory.toLowerCase() === selectedCategory.toLowerCase()) &&
      (selectedType === '' || job.jobType.toLowerCase() === selectedType.toLowerCase()) &&
      (selectedLevel === '' || job.jobLevel.toLowerCase() === selectedLevel.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Banner 
        handleCategoryChange={handleCategoryChange}
        handleTypeChange={handleTypeChange}
        handleLevelChange={handleLevelChange}
        handleSearchChange={handleSearchChange}
        query={query}
        selectedCategory={selectedCategory}
        selectedType={selectedType}
        selectedLevel={selectedLevel}
      />
      <div className="bg-white px-4 py-12">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <JobList jobs={currentJobs} />
            <div className="flex justify-center mt-8">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'} border border-indigo-600 rounded-md`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;
