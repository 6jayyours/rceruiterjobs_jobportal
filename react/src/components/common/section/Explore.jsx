import React from "react";
import background from "../../../assets/explorebg.jpg";

const Explore = () => {
  return (
    <>
      <section className="flex justify-center py-12 px-4">
        <div
          className="container mb-14 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${background})`, opacity: 0.8 }}
        >
          <div className="absolute inset-0  opacity-50"></div>
          <div className="relative grid grid-cols-1 lg:px-8 px-6 py-10 rounded-xl shadow-lg bg-white/70">
            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-8">
              <div className="lg:col-span-8 md:col-span-7">
                <div className="text-left relative z-1">
                  <h3 className="text-2xl font-semibold text-black mb-4">
                    Explore a job now!
                  </h3>
                  <p className="text-slate-600 max-w-xl">
                    Search all the open positions on the web. Get your own
                    personalized salary estimate. Read reviews on over 30,000+
                    companies worldwide.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-4 md:col-span-5">
                <div className="text-left md:text-right relative z-1">
                  <a
                    className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white rounded-md py-2 px-4 mr-2 inline-block"
                    href="/jobs"
                  >
                    Apply Now
                  </a>
                  <a
                    className="btn bg-indigo-100 hover:bg-indigo-600 border-gray-300 hover:border-indigo-600 text-indigo-600 hover:text-white rounded-md py-2 px-4 inline-block"
                    href="/about"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Explore;
