import React, { useEffect, useState } from "react";
import HBanner from "../../components/recruiter/sections/HBanner";
import Candidatelist from "../../components/recruiter/Candidatelist";
import { useDispatch } from "react-redux";
import { listCandidates } from "../../redux/slice/authSlice";

const Candidates = () => {
  const dispatch = useDispatch();

  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleLocChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    return (
      candidate.position.toLowerCase().includes(query.toLowerCase()) &&
      (!selectedLocation || (candidate.location && candidate.location.toLowerCase() === selectedLocation.toLowerCase()))
    );
  });

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const { startIndex, endIndex } = calculatePageRange();
  const currentCandidates = filteredCandidates.slice(startIndex, endIndex);

  useEffect(() => {
    setIsLoading(true);
    const formData = { role: "USER" };
    dispatch(listCandidates(formData))
      .then((response) => {
        setCandidates(response.payload);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("error fetching candidates", error);
      });
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search logic here if needed
    // You can dispatch an action to filter candidates based on position or other criteria
  };

  return (
    <div>
      <HBanner
        query={query}
        handleInputChange={handleInputChange}
        selectedLocation={selectedLocation}
        handleLocChange={handleLocChange}
        handleSearch={handleSearch}
      />
      <div className="bg-[#F1F5F8] px-4 py-12">
        <div className="min-h-96">
          <Candidatelist candidates={currentCandidates} />
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 mx-1 border ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Candidates;
