import React from "react";
import smImg from "../../../assets/sendmessage.jpg";

const SendMessage = () => {
  return (
    <main className="bg-white py-12">
      <div className="container mx-auto min-h-screen flex flex-col md:flex-row justify-center items-center mt-4 md:mt-2 sm:mt-1 p-4 md:p-8 lg:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 place-items-center w-full">
          <div className="w-full md:w-auto">
            <img
              src={smImg}
              alt="Send Message"
              className="rounded-lg  w-full md:max-w-md"
            />
          </div>
          <div className="w-full">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
              Get In Touch!
            </h3>
            <form className="space-y-6">
              <div className="grid lg:grid-cols-2 lg:gap-6">
                <div className="lg:col-span-1 mb-5">
                  <label htmlFor="name" className="font-semibold text-gray-700">
                    Your Name:
                  </label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-500"
                    placeholder="Name"
                  />
                </div>
                <div className="lg:col-span-1 mb-5">
                  <label
                    htmlFor="email"
                    className="font-semibold text-gray-700"
                  >
                    Your Email:
                  </label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-500"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="subject"
                  className="font-semibold text-gray-700"
                >
                  Your Question:
                </label>
                <input
                  name="subject"
                  id="subject"
                  className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-500"
                  placeholder="Subject"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="comments"
                  className="font-semibold text-gray-700"
                >
                  Your Comment:
                </label>
                <textarea
                  name="comments"
                  id="comments"
                  className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-500 h-32 resize-none"
                  placeholder="Message"
                ></textarea>
              </div>
              <button
                type="submit"
                id="submit"
                name="send"
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-3 px-6"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SendMessage;
