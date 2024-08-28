import React from "react";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-700 p-6 text-gray-300">
      <div className="container mx-auto flex flex-col md:flex-row lg:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row lg:flex-row justify-between w-full items-center md:items-center lg:items-start">
          <div className="flex flex-col md:flex-row lg:flex-row items-center mb-6 md:mb-0 lg:mb-0 w-full justify-between">
            <div className="flex flex-row items-center justify-center md:justify-center lg:justify-start w-full md:w-auto lg:w-auto">
              <img src={logo} alt="Recruiter Logo" className="w-11 mr-4" />
              <h1 className="text-xl font-bold">Recruiter</h1>
            </div>
            <ul className="flex flex-col md:flex-row lg:flex-row md:justify-center lg:justify-end items-center mt-4 md:mt-0 lg:mt-0 md:ml-8 lg:ml-8 space-y-2 md:space-y-0 lg:space-y-0 md:space-x-6 lg:space-x-6">
              <li className="hover:text-blue-400">
                <a href="#home">Home</a>
              </li>
              <li className="hover:text-blue-400">
                <a href="#how-it-works">How Recruiter works</a>
              </li>
              <li className="hover:text-blue-400">
                <a href="#features">Features</a>
              </li>
              <li className="hover:text-blue-400">
                <a href="#about-us">About us</a>
              </li>
              <li className="hover:text-blue-400">
                <a href="#contact-us">Contact us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row lg:flex-row justify-between items-center mt-6">
        <div className="flex flex-col md:flex-row lg:flex-row items-center md:items-center lg:items-start w-full md:w-auto lg:w-auto">
          <p className="text-center md:text-center lg:text-left mb-4 md:mb-0 lg:mb-0">
            ©2024 Recruiter. Design &amp; Develop by Arjun
          </p>
        </div>
        <div className="flex space-x-4">
          <a href="#google" className="text-gray-400 hover:text-red-500 p-2 rounded-md bg-gray-800 hover:bg-gray-600">
            <FaGoogle size={20} />
          </a>
          <a href="#facebook" className="text-gray-400 hover:text-blue-600 p-2 rounded-md bg-gray-800 hover:bg-gray-600">
            <FaFacebook size={20} />
          </a>
          <a href="#twitter" className="text-gray-400 hover:text-blue-400 p-2 rounded-md bg-gray-800 hover:bg-gray-600">
            <FaTwitter size={20} />
          </a>
          <a href="#instagram" className="text-gray-400 hover:text-pink-500 p-2 rounded-md bg-gray-800 hover:bg-gray-600">
            <FaInstagram size={20} />
          </a>
          <a href="#linkedin" className="text-gray-400 hover:text-blue-700 p-2 rounded-md bg-gray-800 hover:bg-gray-600">
            <FaLinkedin size={20} />
          </a>
          <a href="#whatsapp" className="text-gray-400 hover:text-green-500 p-2 rounded-md bg-gray-800 hover:bg-gray-600">
            <FaWhatsapp size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
