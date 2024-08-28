import React from "react";
import bdaImg from "../../../assets/businessdevelopment.png";
import csImg from "../../../assets/customerservice.png";
import promanImg from "../../../assets/projectmanagement.png";
import seImg from "../../../assets/softwareengineer.png";
import desImg from "../../../assets/uiuxdesigner.png";

const Popular = () => {
  return (
    <>
      <section className="px-4 py-8  min-h-[80vh] mt-0 md:mt-2 sm:mt-1">
      <div className="text-center pb-8">
          <h3 className="text-2xl font-semibold mb-4">Trending Job Categories</h3>
          <p className="text-slate-400 max-w-xl mx-auto">
            We offer a wide range of job categories to suit your skills and
            interests. Whether you're looking for a career in technology,
            healthcare, finance, or any other field, we have something for
            everyone.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div className="group text-center hover:bg-indigo-200 p-4 border border-gray-300 rounded-md">
            <div className="bg-white group-hover:bg-indigo-600 p-4 rounded-full inline-block">
              <img src={csImg} alt="Job Category Image" className="w-12  mx-auto" />
            </div>
            <div className="mt-2">
              <a className="block font-semibold text-lg">Customer Service</a>
              <p className="text-slate-400">30 Jobs</p>
            </div>
          </div>
          <div className="group text-center hover:bg-indigo-200 p-4 border border-gray-400 rounded-md">
            <div className="bg-white group-hover:bg-indigo-600 p-4 rounded-full inline-block">
              <img src={seImg} alt="Job Category Image" className="w-12  mx-auto" />
            </div>
            <div className="mt-2">
              <a className="block font-semibold text-lg">Software Engineering</a>
              <p className="text-slate-400">99 Jobs</p>
            </div>
          </div>
          <div className="group text-center hover:bg-indigo-200 p-4 border border-gray-300 rounded-md">
            <div className="bg-white group-hover:bg-indigo-600 p-4 rounded-full inline-block">
              <img src={desImg} alt="Job Category Image" className="w-12  mx-auto" />
            </div>
            <div className="mt-2">
              <a className="block font-semibold text-lg">UI/UX Designer</a>
              <p className="text-slate-400">66 Jobs</p>
            </div>
          </div>
          <div className="group text-center hover:bg-indigo-200 p-4 border border-gray-300 rounded-md">
            <div className="bg-white group-hover:bg-indigo-600 p-4 rounded-full inline-block">
              <img src={promanImg} alt="Job Category Image" className="w-12  mx-auto" />
            </div>
            <div className="mt-2">
              <a className="block font-semibold text-lg">Project Management</a>
              <p className="text-slate-400">74 Jobs</p>
            </div>
          </div>
          <div className="group text-center hover:bg-indigo-200 p-4 border border-gray-300 rounded-md">
            <div className="bg-white group-hover:bg-indigo-600 p-4 rounded-full inline-block">
              <img src={bdaImg} alt="Job Category Image" className="w-12  mx-auto" />
            </div>
            <div className="mt-2">
              <a className="block font-semibold text-lg">Business Development</a>
              <p className="text-slate-400">20 Jobs</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Popular;
