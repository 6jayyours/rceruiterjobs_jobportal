import React from "react";
import { MdMonitor, MdTimer, MdOutlineLinkedCamera } from "react-icons/md";
import { TiArrowRight } from "react-icons/ti";

const HowItWorks = () => {
  return (
    <section className="py-12 px-4 min-h-[84vh] mt-0 md:mt-2 sm:mt-1">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold text-center mb-8">
          How Recruiter Works?
        </h3>
        <p className="text-center text-gray-600 mb-12">
          The Recruiter works by connecting job seekers with employers. Job
          seekers can create profiles, upload resumes, and search for job
          listings based on their skills and preferences. Employers, on the
          other hand, can post job openings, search for candidates, and review
          applicant profiles. The Recruiter platform facilitates communication
          between both parties, allowing for seamless recruitment processes.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-xl py-8 px-6">
            <div className="flex justify-center items-center bg-indigo-300 rounded-lg w-16 h-16 mx-auto mb-6 shadow-lg">
              <MdMonitor className="text-indigo-700 text-3xl" />
            </div>
            <div className="text-center">
              <a className="text-lg font-semibold text-indigo-700 hover:text-indigo-900 block mb-3">
                Create an account
              </a>
              <p className="text-sm text-gray-600 mb-4">
                Create an account on our job portal to unlock a world of
                opportunities.
              </p>
              <a className="flex items-center justify-center text-indigo-700 hover:text-indigo-900 hover:border-b-2 hover:border-sky-900  duration-300">
                Read More
                <TiArrowRight className="ml-2 text-xl" />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl py-8 px-6">
            <div className="flex justify-center items-center bg-indigo-300 rounded-lg w-16 h-16 mx-auto mb-6 shadow-lg">
              <MdTimer className="text-indigo-700 text-3xl" />
            </div>
            <div className="text-center">
              <a className="text-lg font-semibold text-indigo-700 hover:text-indigo-900 block mb-3">
                Complete your profile
              </a>
              <p className="text-sm text-gray-600 mb-4">
                Take a few minutes to fill out your profile with your skills,
                experience, and qualifications.
              </p>
              <a className="flex items-center justify-center text-indigo-700 hover:text-indigo-900 hover:border-b-2 hover:border-sky-900  duration-300">
                Read More
                <TiArrowRight className="ml-2 text-xl" />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl py-8 px-6">
            <div className="flex justify-center items-center bg-indigo-300 rounded-lg w-16 h-16 mx-auto mb-6 shadow-lg">
              <MdOutlineLinkedCamera className="text-indigo-700 text-3xl" />
            </div>
            <div className="text-center">
              <a className="text-lg font-semibold text-indigo-700 hover:text-indigo-900 block mb-3">
                Apply or Hire
              </a>
              <p className="text-sm text-gray-600 mb-4">
                Browse jobs or post job openings to start your hiring process
                today.
              </p>
              <a className="flex items-center justify-center text-indigo-700 hover:text-indigo-900 hover:border-b-2 hover:border-sky-900  duration-300">
                Read More
                <TiArrowRight className="ml-2 text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
