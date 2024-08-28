import React from 'react'
import { Link } from 'react-router-dom'
import navLogo from '../../../assets/logo.png'
import { PiSuitcaseSimpleFill } from 'react-icons/pi'
import { MdLibraryAdd, MdLogout, MdManageAccounts } from 'react-icons/md'
import { RiMailSendLine } from 'react-icons/ri'
import { logoutUser } from '../../../redux/slice/authSlice'
import { useDispatch } from 'react-redux'
import { FaHome, FaTachometerAlt } from 'react-icons/fa'

const HirerSidebar = () => {
  const dispatch = useDispatch();

    const handleLogout = () => {
        // Dispatch logout action
        dispatch(logoutUser());
    };
  return (
    <div className="h-screen bg-gray-800 text-white fixed w-64 flex flex-col">
      <div className="flex items-center justify-center py-6">
        <Link to="/" className="flex items-center">
          <img src={navLogo} alt="logo" className="w-12 mt-1" />
          <span className="text-xl sm:text-4xl font-bold text-indigo-500 ml-3">
            Recruiter
          </span>
        </Link>
      </div>
      <div className="flex-grow">
        <div className="px-4 py-2">
          <Link
            to="/recruiter/profile"
            className="flex items-center justify-between mb-4 hover:bg-gray-600 transition-all duration-300 cursor-pointer p-2 rounded"
          >
            <div className="flex items-center">
              <MdManageAccounts className="mr-2" />
              <h2 className="text-lg font-semibold">Profile Settings</h2>
            </div>
          </Link>
          <Link
            to="/recruiter/myjobs"
            className="flex items-center mb-4 hover:bg-gray-600 transition-all duration-300 cursor-pointer p-2 rounded"
          >
            <PiSuitcaseSimpleFill className="mr-2" />
            <h2 className="text-lg font-semibold">My Jobs</h2>
          </Link>
          <Link
            to="/recruiter/myapplications"
            className="flex items-center mb-4 hover:bg-gray-600 transition-all duration-300 cursor-pointer p-2 rounded"
          >
            <RiMailSendLine className="mr-2" />
            <h2 className="text-lg font-semibold">Applications</h2>
          </Link>
          <Link
            to="/recruiter/postjob"
            className="flex items-center mb-4 hover:bg-gray-600 transition-all duration-300 cursor-pointer p-2 rounded"
          >
            <MdLibraryAdd className="mr-2" />
            <h2 className="text-lg font-semibold">Post Job</h2>
          </Link>
          <Link
            to="/recruiter/candidates"
            className="flex items-center mb-4 hover:bg-gray-600 transition-all duration-300 cursor-pointer p-2 rounded"
          >
            <FaHome  className="mr-2" />
            <h2 className="text-lg font-semibold">Home</h2>
          </Link>
        </div>
      </div>
      <div className="mt-auto px-4 py-2">
        <button
          onClick={handleLogout}
          className="flex items-center mb-4 hover:bg-gray-600 transition-all duration-300 cursor-pointer p-2 rounded"
        >
          <MdLogout  className="mr-2" />
          <h2 className="text-lg font-semibold">Logout</h2>
        </button>
      </div>
    </div>
  )
}

export default HirerSidebar