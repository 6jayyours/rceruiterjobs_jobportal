import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  getEdu,
  getExp,
  getSkill,
  getUser,
} from "../../../redux/slice/authSlice";
import profImg from "../../../assets/admin.jpg";
import { FaEnvelope, FaMapPin, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [candidate, setCandidate] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    dispatch(getExp(id))
      .then((response) => {
        setExperiences(response.payload);
      })
      .catch((error) => {
        console.error("Error fetching experience:", error);
      });
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getEdu(id))
      .then((response) => {
        setEducations(response.payload);
      })
      .catch((error) => {
        console.error("Error fetching education:", error);
      });
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getSkill(id))
      .then((response) => {
        const skillsArray = response.payload.flatMap((item) =>
          item.skills.split(",").map((skill) => skill.trim())
        );
        setSkills(skillsArray);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getUser(id))
      .then((response) => {
        setCandidate(response.payload);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [dispatch, id]);

  const handleSendMessage = () => {
    const queryString = `userId=${encodeURIComponent(id)}`;
    window.location.href = `/message/recruiter?${queryString}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6 py-10 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start mb-10 px-11 py-6 shadow-md bg-indigo-50 rounded-lg">
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
            <img
              src={candidate.profileImageUrl || profImg}
              className="h-24 w-24 rounded-full border-4 border-indigo-500 shadow-md"
              alt="Profile"
            />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {candidate.firstName} {candidate.lastName}
            </h1>
            <h2 className="text-xl font-medium text-gray-600 mb-2">
              {candidate.position}
            </h2>
            <div className="flex justify-center md:justify-start gap-4 text-gray-600 mb-4">
              <span>{candidate.gender}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
              onClick={handleSendMessage}
            >
              Send Message
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row px-10">
          <div className="w-full md:w-3/4 mb-10 md:mb-0 pr-0 md:pr-10">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-indigo-600 mb-2">
                Experience
              </h1>
              <ul className="list-disc list-inside text-gray-700 space-y-4">
                {experiences.map((exp, index) => (
                  <li key={index} className="bg-indigo-100 p-4 rounded-lg shadow-sm">
                    <span className="font-semibold">{exp.role}</span> at{" "}
                    <span className="text-indigo-500">{exp.companyName}</span> (
                    {exp.startDate} - {exp.endDate})
                    <p className="mt-2 text-gray-600">{exp.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-indigo-600 mb-2">
                Education
              </h1>
              <ul className="list-disc list-inside text-gray-700 space-y-4">
                {educations.map((edu, index) => (
                  <li key={index} className="bg-indigo-100 p-4 rounded-lg shadow-sm">
                    <span className="font-semibold">{edu.degree}</span> from{" "}
                    <span className="text-indigo-500">{edu.collegeName}</span> (
                    {edu.year})
                    <p className="mt-2 text-gray-600">{edu.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-indigo-600 mb-2">
                Skills
              </h1>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-600 transition duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-indigo-600 mb-2">
                Contact Details
              </h1>
              <div className="flex flex-wrap gap-4 items-center text-gray-700">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-indigo-600" />
                  <span>{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-indigo-600" />
                  <span>{candidate.mobile}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapPin className="text-indigo-600" />
                  <span>{candidate.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
