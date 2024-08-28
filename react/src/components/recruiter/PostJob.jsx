import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../../redux/slice/jobSlice";
import { useNavigate } from "react-router";

const PostJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.id);

  const [jobTitle, setJobTitle] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobLevel, setJobLevel] = useState('');
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [salary, setSalary] = useState('');
  const [skills, setSkills] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [responsibilities, setResponsibilities] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!jobTitle) errors.jobTitle = "Job title is required";
    if (!jobCategory) errors.jobCategory = "Job category is required";
    if (!jobType) errors.jobType = "Job type is required";
    if (!jobLevel) errors.jobLevel = "Job level is required";
    if (!experience) errors.experience = "Experience is required";
    if (!qualification) errors.qualification = "Qualification is required";
    if (!salary) errors.salary = "Salary is required";
    if (!skills) errors.skills = "Skills are required";
    if (!country) errors.country = "Country is required";
    if (!state) errors.state = "State is required";
    if (!city) errors.city = "City is required";
    if (!pincode) errors.pincode = "Pincode is required";
    if (!company) errors.company = "Company is required";
    if (!description) errors.description = "Description is required";
    if (!requirements) errors.requirements = "Requirements are required";
    if (!responsibilities) errors.responsibilities = "Responsibilities are required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const jobData = {
      jobTitle,
      jobCategory,
      jobType,
      jobLevel,
      experience,
      qualification,
      salary,
      skills,
      country,
      state,
      city,
      pincode,
      company,
      description,
      requirements,
      responsibilities,
      user:userId
    };

    dispatch(createJob(jobData))
      .then((response) => {
        if (response.payload === "Job created successfully!") {
          navigate("/recruiter/myjobs");
        }
      })
      .catch((error) => {
        console.error('Error posting job:', error);
        // Handle error response if needed
      });
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard / Submit Job</h2>
      </div>
      <div className="overflow-x-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="p-6 rounded-md shadow bg-white border border-gray-300">
              <h5 className="text-lg font-semibold mb-4">Job Details:</h5>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium" htmlFor="jobTitle">
                    Job Title:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Job Title"
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                  {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle}</p>}
                </div>
                <div>
                  <label className="font-medium" htmlFor="jobCategory">
                    Job Category:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Job Category"
                    id="jobCategory"
                    value={jobCategory}
                    onChange={(e) => setJobCategory(e.target.value)}
                    required
                  />
                  {errors.jobCategory && <p className="text-red-500 text-sm">{errors.jobCategory}</p>}
                </div>
                <div>
                  <label className="font-medium" htmlFor="jobType">
                    Job Type:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Job Type"
                    id="jobType"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    required
                  />
                  {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType}</p>}
                </div>
                <div>
                  <label className="font-medium" htmlFor="jobLevel">
                    Job Level:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Job Level"
                    id="jobLevel"
                    value={jobLevel}
                    onChange={(e) => setJobLevel(e.target.value)}
                    required
                  />
                  {errors.jobLevel && <p className="text-red-500 text-sm">{errors.jobLevel}</p>}
                </div>
                <div>
                  <label className="font-medium" htmlFor="experience">
                    Experience:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Experience"
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                  />
                  {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
                </div>
                <div>
                  <label className="font-medium" htmlFor="qualification">
                    Qualification:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Qualification"
                    id="qualification"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    required
                  />
                  {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
                </div>
                <div>
                  <label className="font-medium" htmlFor="salary">
                    Salary:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Salary"
                    id="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                  />
                  {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
                </div>
                <div>
                  <label className="font-medium" htmlFor="skills">
                    Skills:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Skills"
                    id="skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    required
                  />
                  {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
                </div>
                <div>
                  <label className="font-medium" htmlFor="country">
                    Country:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Country"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                  {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                </div>
                <div>
                  <label className="font-medium" htmlFor="state">
                    State:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="State"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                  {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                </div>
                <div>
                  <label className="font-medium" htmlFor="city">
                    City:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="City"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>
                <div>
                  <label className="font-medium" htmlFor="pincode">
                    Pincode:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Pincode"
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                  />
                  {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                </div>
                <div>
                  <label className="font-medium" htmlFor="company">
                    Company:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Company"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                  {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
                </div>
                <div className="col-span-2">
                  <label className="font-medium" htmlFor="description">
                    Description:<span className="text-red-600">*</span>
                  </label>
                  <textarea
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>
                <div className="col-span-2">
                  <label className="font-medium" htmlFor="requirements">
                    Requirements:<span className="text-red-600">*</span>
                  </label>
                  <textarea
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Requirements"
                    id="requirements"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    required
                  />
                  {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements}</p>}
                </div>
                <div className="col-span-2">
                  <label className="font-medium" htmlFor="responsibilities">
                    Responsibilities:<span className="text-red-600">*</span>
                  </label>
                  <textarea
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Responsibilities"
                    id="responsibilities"
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                    required
                  />
                  {errors.responsibilities && <p className="text-red-500 text-sm">{errors.responsibilities}</p>}
                </div>
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Submit Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
