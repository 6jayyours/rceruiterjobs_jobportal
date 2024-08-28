import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { logoutUser } from '../../redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const DropDownProfile = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        // Dispatch logout action
        dispatch(logoutUser());
    };

    const role = useSelector((state) => state.auth.role);
    const dashPath = role === "USER" ? "/user/profile" : "/recruiter/profile";

    return (
        <div className='flex flex-col absolute w-[100px] bg-white items-center p-[15px] top-[4.2rem] right-[0rem] border border-gray-300 rounded shadow-xl'>
            <ul className='flex flex-col gap-4'>

                <li>
                    <Link to={dashPath} className="text-black hover:text-blue-600">Settings</Link>
                </li>
                <li className='cursor-pointer text-red-500 hover:text-red-600' onClick={handleLogout}>Logout</li>
            </ul>
        </div>
    );
};

export default DropDownProfile;
