import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { activateUser, listUsers } from "../../redux/slice/adminSlice";
import ImageModal from "./sections/ImageModal";
import toast from "react-hot-toast";
import BlockModal from "./sections/BlockModal";

const Recruiterslist = () => {
  const dispatch = useDispatch();
  const [recruiters, setRecruiters] = useState([]);
  const [filteredRecruiters, setFilteredRecruiters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [documentFilter, setDocumentFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [reason, setReason] = useState("");

  const openModal = (user) => {
    setIsModalOpen(true);
    setUser(user);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImageUrl("");
  };

  useEffect(() => {
    const formData = { role: "RECRUITER" };
    dispatch(listUsers(formData))
      .then((response) => {
        setRecruiters(response.payload);
        setFilteredRecruiters(response.payload);
      })
      .catch((error) => {});
  }, [dispatch]);

  useEffect(() => {
    let filtered = recruiters;

    if (searchTerm) {
      filtered = filtered.filter((recruiter) =>
        `${recruiter.firstName} ${recruiter.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((recruiter) =>
        statusFilter === "active" ? recruiter.status : !recruiter.status
      );
    }

    if (documentFilter) {
      filtered = filtered.filter((recruiter) =>
        documentFilter === "available"
          ? recruiter.idImageUrl !== null
          : recruiter.idImageUrl === null
      );
    }

    setFilteredRecruiters(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, documentFilter, recruiters]);

  const totalPages = Math.ceil(filteredRecruiters.length / itemsPerPage);
  const indexOfLastCandidate = currentPage * itemsPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - itemsPerPage;
  const currentRecruiters = filteredRecruiters.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  function handleUserStatus(id,reason) {
    dispatch(activateUser({id,reason}))
      .then((response) => {
        toast.success("User status changed.");
        setFilteredRecruiters((prevCandidates) =>
          prevCandidates.map((candidate) =>
            candidate.id === id
              ? { ...candidate, status: !candidate.status }
              : candidate
          )
        );
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
      });
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Dashboard / Recruiter</h2>
      </div>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by name"
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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          value={documentFilter}
          onChange={(e) => setDocumentFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Documents</option>
          <option value="available">Document Available</option>
          <option value="notAvailable">No Document</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">User Status</th>
              <th className="py-2 px-4 text-left">Verification Document</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentRecruiters.map((recruiter) => (
              <tr key={recruiter.id}>
                <td className="py-3 px-4 flex items-center">
                  <img
                    src={recruiter.profileImageUrl} // Adjust field name accordingly
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-3 px-4">
                  {recruiter.firstName} {recruiter.lastName}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 rounded ${
                      recruiter.status ? "bg-green-500" : "bg-gray-400"
                    } text-white`}
                  >
                    {recruiter.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <img
                    className="h-14 w-auto cursor-pointer"
                    src={recruiter.idImageUrl}
                    alt="Image not available"
                    onClick={() => handleImageClick(recruiter.idImageUrl)}
                  />
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => recruiter.status ?  openModal(recruiter.id) : handleUserStatus(recruiter.id,"")}
                    className={`py-1 px-3 rounded ${
                      recruiter.status
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                  >
                    {recruiter.status ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {showModal && (
        <ImageModal
          showModal={showModal}
          imageUrl={selectedImageUrl}
          onClose={handleCloseModal}
        />
      )}
      {isModalOpen && (
        <BlockModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          setReason={setReason}
          reason={reason}
          id={user}
          handleUserStatus={handleUserStatus}
        />
      )}
    </div>
  );
};

export default Recruiterslist;
