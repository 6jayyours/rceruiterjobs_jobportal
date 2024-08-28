import React, { useEffect, useState } from "react";
import { getUser } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

const AppHeader = ({ title }) => {
  const [user, setUser] = useState(null);

  const id = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(id))
      .then((response) => {
        setUser(response.payload);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [dispatch, id]);

  if (!user) {
    return null; // or return a loading indicator if needed
  }

  return (
    <div className="h-18 bg-indigo-500 py-4 px-6 flex justify-between items-center ">
      <h4 className="text-white text-xl font-semibold">{title}</h4>
      <div className="flex items-center">
        <img
          src={user.profileImageUrl}
          alt="profileimage"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-white ml-2">{user.firstName} {user.lastName}</span>
      </div>
    </div>
  );
};

export default AppHeader;
