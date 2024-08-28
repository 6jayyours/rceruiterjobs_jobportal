import React from "react";
import heroImage from "../../../assets/landing.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <main className="bg-white ">
        <div className="container mx-auto min-h-screen flex flex-col md:flex-row justify-center items-center mt-4 md:mt-2 sm:mt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 place-items-center">
            {/* Image section */}
            <div className="order-1 md:order-2 relative  p-4 md:p-0">
              <img
                src={heroImage}
                alt="Landing page"
                className="w-full h-auto md:max-w-lg rounded-xl"
              />
              <div className="bg-white px-4 py-2 rounded-xl shadow-xl absolute -bottom-4 right-6 ">
                <p className="text-indigo-500">⭐ Candidates</p>
                <h1 className="font-bold text-indigo-500">
                  1000+ <span className="font-normal">Placed</span>
                </h1>
              </div>
            </div>
            {/* Text section */}
            <div className="space-y-6 md:space-y-10 order-2 md:order-1 xl:pr-10 p-4 md:p-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-7xl font-bold text-gray-800 leading-tight">
                Find the
                <span className="text-indigo-500">
                  {" "}
                  <br /> Best Job
                </span>
                <br /> offer for you.
              </h1>

              <p className="text-gray-600 max-w-lg">
                Find Jobs, Employment, and Career Opportunities. Some of the
                companies we've helped recruit excellent applicants over the
                years.
              </p>
              <div className="flex flex-col sm:flex-row justify-center sm:justify-start space-y-3 sm:space-y-0 sm:space-x-3">
                <Link to={"/userRegistration"}>
                <button className="bg-indigo-700 text-white hover:bg-indigo-900 duration-300 rounded-md py-2 px-6 text-base sm:text-lg">
                  Find job
                </button>
                </Link>
                <Link to={"/hirerRegistration"}>
                <button className="bg-indigo-700 text-white hover:bg-indigo-900 duration-300 rounded-md py-2 px-6 text-base sm:text-lg">
                  Hire talent
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Hero