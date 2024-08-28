import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import toast from "react-hot-toast";
import { addSkill } from "../../../redux/slice/authSlice";

const SkillModal = ({ onClose }) => {
  const id = useSelector(state => state.auth.id);
  const dispatch = useDispatch();
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillsChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
  };

  const skillsOptions = [
    { label: 'HTML', value: 'HTML' },
    { label: 'CSS', value: 'CSS' },
    { label: 'REACT', value: 'REACT' },
    { label: 'JAVA', value: 'JAVA' },
    { label: 'SPRING', value: 'SPRING' },
    { label: 'SPRING BOOT', value: 'SPRING BOOT' },
    { label: 'DSA', value: 'DSA' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedSkillsString = selectedSkills.map(skill => skill.value).join(', ');
    const formData = { userId: id, skills: selectedSkillsString };
    dispatch(addSkill(formData))
      .then(() => {
        toast.success("Skills added successfully");
        onClose();
      })
      .catch(error => {
        toast.error('Error adding skills:', error);
      });
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-md text-center w-1/4">
          <h2 className="text-lg font-semibold mb-4">Add Skills</h2>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center">
            <Select
              id="skills"
              name="skills"
              options={skillsOptions}
              isMulti
              className="mb-4"
              onChange={handleSkillsChange}
            />
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillModal;
