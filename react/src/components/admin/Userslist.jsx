import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { activateUser, listUsers } from "../../redux/slice/adminSlice";
import toast from "react-hot-toast";
import BlockModal from "./sections/BlockModal";

const Userslist = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [subscriptionFilter, setSubscriptionFilter] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Adjust as needed

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

  useEffect(() => {
    const formData = { role: "USER" };
    dispatch(listUsers(formData))
      .then((response) => {
        setCandidates(response.payload);
        setFilteredCandidates(response.payload);
      })
      .catch((error) => {});
  }, [dispatch]);

  useEffect(() => {
    let filtered = candidates;

    if (searchTerm) {
      filtered = filtered.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((user) =>
        statusFilter === "active" ? user.status : !user.status
      );
    }

    if (subscriptionFilter) {
      filtered = filtered.filter((user) =>
        subscriptionFilter === "subscribed"
          ? user.subscription
          : !user.subscription
      );
    }

    setFilteredCandidates(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, statusFilter, subscriptionFilter, candidates]);

  // Pagination logic
  const indexOfLastCandidate = currentPage * itemsPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - itemsPerPage;
  const currentCandidates = filteredCandidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

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
        setFilteredCandidates((prevCandidates) =>
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
        <h2 className="text-xl font-bold">Dashboard / Job Seekers</h2>
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
          value={subscriptionFilter}
          onChange={(e) => setSubscriptionFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Subscriptions</option>
          <option value="subscribed">Subscribed</option>
          <option value="free">Free</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">User Status</th>
              <th className="py-2 px-4 text-left">User Subscription</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentCandidates.map((user) => (
              <tr key={user.id}>
                <td className="py-3 px-4 flex items-center">
                  <img
                  src={user.profileImageUrl}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <p></p>
                </td>
                <td className="py-3 px-4">
                  {user.firstName} {user.lastName} 
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 rounded ${
                      user.status ? "bg-green-500" : "bg-gray-400"
                    } text-white`}
                  >
                    {user.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 rounded ${
                      user.subscription ? "bg-blue-500" : "bg-yellow-500"
                    } text-white`}
                  >
                    {user.subscription ? "Subscribed" : "Free"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                   onClick={() => user.status ?  openModal(user.id) : handleUserStatus(user.id,"")}
                    // onClick={() => handleUserStatus(user.id)}
                    className={`py-1 px-3 rounded ${
                      user.status
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                  >
                    {user.status ? "Block" : "Unblock"}
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

export default Userslist;
