import React from "react";
import { FaCheck } from "react-icons/fa";
import aboutImg from "../../../assets/aboutus.jpg";

const AboutUs = () => {
  return (
    <>
      <section>
        <div className="container mx-auto min-h-screen flex flex-col justify-center items-center p-4 md:p-8 lg:p-16 mt-12 md:mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 place-items-center w-full">
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h6 className="text-lg font-semibold text-gray-600">
                  About Us
                </h6>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-2">
                  Why <span className="text-indigo-500">35,000+</span> People
                  Trust Our Recruiter?
                </h2>
                <p className="mt-4 text-gray-700">
                  Our platform connects job seekers with top employers,
                  providing a seamless and efficient job search experience. With
                  an extensive database of job listings across various
                  industries, we ensure that you have access to the latest
                  opportunities that match your skills and preferences. Our
                  advanced search and filter options allow you to easily find
                  the positions that are right for you. Additionally, we offer
                  personalized job recommendations based on your profile, making
                  the job search process even more efficient. Our platform is
                  designed to be user-friendly, ensuring a hassle-free
                  application process, and we prioritize the security and
                  confidentiality of your information. Whether you are a recent
                  graduate or an experienced professional, our platform is here
                  to support you every step of the way in finding your dream
                  job.
                </p>
              </div>

              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                <ul className="list-none space-y-2">
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" /> Extensive Job
                    Listings
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" /> Personalized Job
                    Recommendations
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" /> Easy Application
                    Process
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" /> Secure and
                    Confidential
                  </li>
                </ul>

                <ul className="list-none space-y-2">
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" /> Verified
                    Employers
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" /> Expert Career
                    Advice
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" /> 24/7 Support
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" /> And more...
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <button className="bg-indigo-700 text-white hover:bg-indigo-900 duration-300 rounded-md py-2 px-6 text-base sm:text-lg">
                  Learn More
                </button>
              </div>
            </div>

            <div className="mt-8 lg:mt-0 w-full lg:w-3/4">
              <img
                src={aboutImg}
                alt="About Us"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
