import React from "react";
import { FiSearch } from "react-icons/fi";

const HBanner = ({ query, handleInputChange, selectedLocation, handleLocChange, handleSearch }) => {
  return (
    <div className="bg-white max-w-screen-2xl container mx-auto px-4 md:px-8 xl:px-24 md:py-20 py-14 mt-8 md:mt-0">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3">
        Search A Perfect <span className="text-indigo-500">Candidate</span>
      </h1>

      <p className="text-base md:text-lg text-black/70 mb-8">
        Find Jobs, Employment & Career Opportunities
      </p>

      <form className="w-full" onSubmit={handleSearch}>
        <div className="flex flex-col md:flex-row justify-start gap-4 md:gap-0">
          {/* Search Input */}
          <div className="relative flex items-center md:rounded-l-md rounded-md shadow-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full mb-4 md:mb-0">
            <FiSearch className="absolute ml-3 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Candidate Role"
              className="block w-full border-0 bg-transparent py-2 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            />
          </div>

          {/* Location Dropdown */}
          <div className="relative flex items-center md:rounded-none md:rounded-l-md rounded-md shadow-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full mb-4 md:mb-0">
            <select
              value={selectedLocation}
              onChange={handleLocChange}
              className="block w-full border-0 bg-transparent py-2 pl-3 pr-10 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            >
              <option value="">Select Location</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerela">Kerela</option>
              <option value="TamilNadu">TamilNadu</option>
              <option value="Goa">Goa</option>
              <option value="Maharshtra">Maharshtra</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full md:w-auto bg-indigo-600 py-2 px-8 text-white rounded-md md:rounded-l-none"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default HBanner;
