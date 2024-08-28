import React from "react";
import { Link } from "react-router-dom";
import defImg from '../../../assets/default.jpg'

const UserCard = ({ id, firstname, lastname,profileImgPath,role,loc,gender }) => {
  return (
    <div className="group bg-white overflow-hidden rounded-md shadow text-center p-6 mb-4">
      <img src={profileImgPath ? profileImgPath : defImg} className="size-20 rounded-full shadow mx-auto" />
      <div className="mt-2">
        <h3 className="hover:text-indigo-600 font-semibold text-lg">
          {firstname} {lastname}
        </h3>
        <p className="text-sm text-slate-400">{role ? role : 'candidate'} </p>
      </div>
      <div className="flex justify-between mt-2">
        <div className="block">
          <span className="text-slate-400">Place</span>
          <span className="block text-sm font-semibold">{loc ? loc : 'NA'}</span>
        </div>
        <div className="block">
          <span className="text-slate-400">Gender</span>
          <span className="block text-sm font-semibold">{gender ? gender : 'NA'}</span>
        </div>
      </div>
      <div className="mt-3">
        <Link to={`/userdetail/${id}`}>
          <button className="bg-indigo-600 hover:bg-indigo-600 text-white rounded-md py-[5px] px-[1rem]">
            Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
