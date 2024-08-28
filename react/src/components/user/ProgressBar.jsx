import React from "react";
import { FaCheck } from "react-icons/fa";

const ProgressBar = ({ status }) => {
  // Determine the width of the progress bar based on the status
  const getProgressBarWidth = () => {
    if (status[0] === "applied") {
      return "50%";
    }  else if (status[0] === "responded") {
      return "100%";
    }
    return "0%"; // Default to 0% if status is not defined
  };

  return (
    <div className="w-full flex justify-center my-4">
      <div className="w-full max-w-lg relative">
        {/* Progress line */}
        <div
          className={`absolute top-0 left-0 h-2 w-full  rounded-full ${status[0] === "responded" ? 'bg-emerald-600' : 'bg-emerald-600'}`}
          style={{ width: getProgressBarWidth() }}
        ></div>

        {/* Circle markers */}
        <div className="flex justify-between mt-4">
          {/* Circle 1 - Applied */}
          <div className="flex flex-col items-center" style={{ left: `0%` }}>
            <div className="relative flex items-center justify-center w-10 h-10">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center  mt-[-62px] ml-[-18px] ${status[0] === "applied" || status[0] === "responded" ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-emerald-600'}`}>
                {(status[0] === "applied" || status[0] === "responded") && <FaCheck className="text-white" />}
              </div>
            </div>
            <div className="mt-[-30px] text-gray-600 text-sm">Applied</div>
          </div>

          {/* Circle 2 - Application Sent */}
          <div className="flex flex-col items-center" style={{ left: `50%` }}>
            <div className="relative flex items-center justify-center w-10 h-10">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center  mt-[-62px] mr-[-64px] ${status[0] === "applied" || status[0] === "responded" ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-emerald-600'}`}>
                {(status[0] === "applied" || status[0] === "responded") && <FaCheck className="text-white" />}
              </div>
            </div>
            <div className="mt-[-30px] text-gray-600 text-sm mr-[-64px]">Sent</div>
          </div>

          {/* Circle 3 - Recruiter Action */}
          <div className="flex flex-col items-center" style={{ left: `100%` }}>
            <div className="relative flex items-center justify-center w-10 h-10">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center  mt-[-62px] mr-[-68px] ${status[0] === "responded" ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-emerald-600'}`}>
                {status[0] === "responded" && <FaCheck className="text-white" />}
              </div>
            </div>
            <div className="mt-[-30px] text-gray-600 text-sm">Recruiter Action</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
