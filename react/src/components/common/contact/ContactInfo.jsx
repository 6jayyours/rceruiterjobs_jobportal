import React from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const ContactInfo = () => {
  return (
    <>
      <section className="bg-white px-4 py-8 min-h-[80vh] mt-0 md:mt-2 sm:mt-1">
        <div className="container mx-auto flex flex-col items-center">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
              Contact Information
            </h3>
            <p className="text-gray-600 mt-2">
              We'd love to hear from you! Get in touch with us through any of
              the methods below.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <div className="flex flex-col items-center bg-white  p-6">
              <div className="bg-indigo-200 text-indigo-500 mb-4 rounded-md p-3">
                <FiPhone className="text-3xl" />
              </div>
              <div className="text-center">
                <h5 className="text-lg font-semibold text-gray-800">Phone</h5>
                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    Reach out to us directly
                    <br />
                    through your mobile phone
                    <br />
                    for quick assistance.
                  </p>
                  <h6 className="text-indigo-500 font-medium mt-4 cursor-pointer hover:underline">
                    +916282205698
                  </h6>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center bg-white  p-6">
              <div className="bg-indigo-200 text-indigo-500 mb-4 rounded-md p-3">
                <FiMail className="text-3xl" />
              </div>
              <div className="text-center">
                <h5 className="text-lg font-semibold text-gray-800">Email</h5>
                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    Feel free to send us
                    <br />
                    an email for any inquiries,
                    <br />
                    support, or feedback.
                  </p>
                  <h6 className="text-indigo-500 font-medium mt-4 cursor-pointer hover:underline">
                    codesic@mail.com
                  </h6>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center bg-white   p-6">
              <div className="bg-indigo-200 text-indigo-500 mb-4 rounded-md p-3">
                <FiMapPin className="text-3xl" />
              </div>
              <div className="text-center">
                <h5 className="text-lg font-semibold text-gray-800">Address</h5>
                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    36/5, Hustle Hub Tech Park <br />
                    Hsr Layout, Sector 2 <br />
                    Bengaluru, Karnataka 560102
                  </p>
                  <h6 className="text-indigo-500 font-medium mt-4 cursor-pointer hover:underline">
                    View on Google Map
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactInfo;
