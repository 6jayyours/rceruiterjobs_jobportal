import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExp } from "../../../redux/slice/authSlice";
import toast from "react-hot-toast";

const ExperienceModal = ({ onClose,setExperiences }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.id);

  const [companyName, setCompanyName] = useState('');
  const [expId, setExpId] = useState('');
  const [role, setRole] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "companyName":
        setCompanyName(value);
        break;
      case "expId":
        setExpId(value);
        break;
      case "role":
        setRole(value);
        break;
      case "startDate":
        setStartDate(value);
        break;
      case "endDate":
        setEndDate(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { companyName, role, startDate, endDate, userId: id, id: expId };
    dispatch(addExp(formData))
      .then((response) => {
        if (response.type === "auth/addExp/fulfilled") {
          toast.success("Experience added successfully");
          setExperiences(prevExperiences => [...prevExperiences, {
            id: response.payload.id,
            companyName,
            role,
            startDate,
            endDate
          }]);
          onClose();
        } else {
          toast.error("Failed to add experience");
        }
      })
      .catch((error) => {
        toast.error("An error occurred: " + error.message);
      });
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-md text-center w-1/4">
          <h2 className="text-lg font-semibold mb-4">Add Experience</h2>
          <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-row">
              <label className="block text-gray-700 text-sm font-bold mt-2">
                Company
              </label>
              <input
                type="text"
                name="companyName"
                value={companyName}
                onChange={handleChange}
                className="ml-5 border rounded-md px-3 py-2 w-1/2"
              />
            </div>
            <div className="mb-4 flex flex-row">
              <label className="block text-gray-700 text-sm font-bold mt-2">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={role}
                onChange={handleChange}
                className="ml-14 border rounded-md px-3 py-2 w-1/2"
              />
            </div>
            <div className="mb-4 flex flex-row">
              <label className="block text-gray-700 text-sm font-bold mt-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={handleChange}
                className="ml-4 border rounded-md px-3 py-2 w-1/2"
              />
            </div>
            <div className="mb-4 flex flex-row">
              <label className="block text-gray-700 text-sm font-bold mt-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={handleChange}
                className="ml-6 border rounded-md px-3 py-2 w-1/2"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Submit
            </button>
          </form>
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 w-full"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceModal;
