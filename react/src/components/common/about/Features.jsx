import React from "react";
import { IoVideocamOutline } from "react-icons/io5";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { BsDisplay } from "react-icons/bs";
import { CiChat2 } from "react-icons/ci";
import { MdOutlineSupportAgent } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import FeatureItem from "./FeatureItem";

const Features = () => {
  return (
    <>
      <section className="px-4 py-8  min-h-[80vh] mt-0 md:mt-2 sm:mt-1">
        <div>
          <div className="w-full text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
              Key Features
            </h3>
            <p className="mt-4 text-gray-700">
              Discover the powerful features our job portal offers to make your
              job search more efficient and successful.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <FeatureItem
              icon={<SiSimpleanalytics className="text-4xl text-blue-500" />}
              title="Real-time Analytics"
              description="Get insights and analytics on job market trends and your job applications in real-time."
            />
            <FeatureItem
              icon={<MdOutlinePrivacyTip className="text-4xl text-green-500" />}
              title="Privacy"
              description="Your data and privacy are our top priorities. We ensure your information is secure and confidential."
            />
            <FeatureItem
              icon={<IoVideocamOutline className="text-4xl text-purple-500" />}
              title="Video Call"
              description="Easily schedule and conduct video interviews with potential employers through our platform."
            />
            <FeatureItem
              icon={<CiChat2 className="text-4xl text-yellow-500" />}
              title="Direct Chat to Recruiter"
              description="Chat directly with recruiters to get your questions answered and stay updated on your application status."
            />
            <FeatureItem
              icon={<MdOutlineSupportAgent className="text-4xl text-red-500" />}
              title="24/7 Support"
              description="Our support team is available 24/7 to help you with any issues or questions you may have."
            />
            <FeatureItem
              icon={<BsDisplay className="text-4xl text-indigo-500" />}
              title="User-friendly Interface"
              description="Our platform is designed to be intuitive and easy to navigate, ensuring a smooth job search experience."
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
