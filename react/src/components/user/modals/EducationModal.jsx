import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEdu } from "../../../redux/slice/authSlice";
import toast from "react-hot-toast";

const EducationModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.id);

  const [collegeName, setCollegeName] = useState('');
  const [degree, setDegree] = useState('');
  const [year, setYear] = useState('');
  const [place, setPlace] = useState('');
  const [eduId, setEduId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "collegeName":
        setCollegeName(value);
        break;
      case "degree":
        setDegree(value);
        break;
      case "year":
        setYear(value);
        break;
      case "place":
        setPlace(value);
        break;
      case "eduId":
        setEduId(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { collegeName, degree, year, place, userId: id, educationId: eduId };
    dispatch(addEdu(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.type === "auth/addEdu/fulfilled") {
          toast.success("Education added successfully");
          onClose();
        } else {
          toast.error("Failed to add education");
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
          <h2 className="text-lg font-semibold mb-4">Add Education</h2>
          <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-row">
              <label className="block text-gray-700 text-sm font-bold mt-2">
                College Name
              </label>
              <input
                type="text"
                name="collegeName"
                value={collegeName}
                onChange={handleChange}
                className="ml-5 border rounded-md px-3 py-2 w-1/2"
              />
            </div>
            <div className="mb-4 flex flex-row">
              <label className="block text-gray-700 text-sm font-bold mt-2">
                Degree
              </label>
              <input
                type="text"
                name="degree"
                value={degree}
                onChange={handleChange}
                className="ml-16 border rounded-md px-3 py-2 w-1/2"
              />
            </div>
            <div className="mb-4 flex flex-row">
              <label className="block text-gray-700 text-sm font-bold mt-2">
                Year
              </label>
              <input
                type="text"
                name="year"
                value={year}
                onChange={handleChange}
                className="ml-20 border rounded-md px-3 py-2 w-1/2"
              />
            </div>
            <div className="mb-4 flex flex-row">
              <label className="block text-gray-700 text-sm font-bold mt-2">
                Place
              </label>
              <input
                type="text"
                name="place"
                value={place}
                onChange={handleChange}
                className="ml-20 border rounded-md px-3 py-2 w-1/2"
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

export default EducationModal;
