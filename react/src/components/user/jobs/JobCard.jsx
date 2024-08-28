import React from "react";
import { FaRegClock } from "react-icons/fa";
import { PiMapPin } from "react-icons/pi";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", options); // Adjust locale as per your requirement
};

const JobCard = ({ id,company, title, type, date, location, salary }) => {
  const formattedDate = formatDate(date);

  return (
    <div className="min-w-[1300px] md:flex justify-between items-center rounded shadow hover:shadow-md transition-all duration-500 p-5 bg-white mb-4">
      {/* 1st div */}
      <div className="flex flex-col items-center w-full md:w-[400px]">
        <h1 className="text-lg hover:text-indigo-600 font-bold transition-all duration-500 ms-3">
          {title}
        </h1>
        <h2 className="text-md hover:text-indigo-500 font-bold transition-all duration-500 ms-3">
          {company}
        </h2>
      </div>
      {/* 2nd div */}
      <div className="md:block flex items-center md:w-1/4 md:mt-0 mt-4 md:ml-6">
        <span className="block ml-9 items-center">
          <span className="bg-indigo-600/10 inline-block text-indigo-600 text-xs px-2.5 py-0.5 font-semibold rounded-full">
            {type}
          </span>
        </span>
        <span className="flex items-center text-slate-400 text-sm md:mt-1 mt-0 ml-4">
          <FaRegClock className="mr-1" /> {formattedDate}
        </span>
      </div>
      {/* 3rd div */}
      <div className="flex flex-col justify-center items-center md:mt-0 mt-2 md:ml-6">
        <span className="text-slate-400 flex items-center">
          <PiMapPin className="mr-1" /> {location}
        </span>
        <span className="block font-semibold md:mt-1 mt-0">₹{salary}</span>
      </div>
      {/* 4th div */}
      <div className="md:ml-6 mt-4 md:mt-0 ">
        <Link to={`/jobdetail/${id}`}>
          <button className="rounded-md bg-indigo-600 hover:bg-indigo-500 border-indigo-600 hover:border-indigo-500 text-white px-4 py-2 transition-all duration-300">
            Apply
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
