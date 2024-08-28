import React, { useEffect, useState } from "react";
import { UserLinks, HirerLinks } from "../../constants/NavLinks";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import MobileMenu from "./section/MobileMenu";
import navLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaMessage } from "react-icons/fa6";
import { getUser } from "../../redux/slice/authSlice";
import DropDownProfile from "./DropDownProfile";
import { FaVideo } from "react-icons/fa";
import MeetingModal from "./MeetingModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  const id = useSelector((state) => state.auth.id);
  const role = useSelector((state) => state.auth.role);

  const path = role === "USER" ? "/message/user" : "/message/recruiter";

  const links = role === "RECRUITER" ? HirerLinks : UserLinks;

  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUsername] = useState(null);
  const [openDrop, setOpenDrop] = useState(false);

  const [showVideoModal, setShowVideoModal] = useState(false);

  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  useEffect(() => {
    if (authenticated) {
      dispatch(getUser(id))
        .then((response) => {
          setProfileImage(response.payload.profileImageUrl);
          const firstname = response.payload.firstName;
          const lastName = response.payload.lastName;
          setUsername(`${firstname} ${lastName}`);
        })
        .catch((error) => {
          console.error("Failed to fetch user:", error);
        });
    }
  }, [dispatch, authenticated, id]);

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };



  // Conditionally render the "Get Started" button based on authentication status
  const getStartedButton = !authenticated && (
    <Link to={"/login"}>
      <button className="hidden md:block bg-indigo-700 text-white hover:bg-sky-950 duration-300 rounded-lg py-2 px-4">
        Get Started
      </button>
    </Link>
  );

  const userDetailsAndIcon = authenticated && (
    <div className="flex items-center space-x-4">
       
        <FaVideo className="cursor-pointer text-3xl mr-4 text-indigo-800" 
        onClick={openVideoModal}/>
    
      
      <Link to={path}>
        <FaMessage className="cursor-pointer text-2xl mr-4 text-indigo-800" />
      </Link>{" "}

      <span className="font-semibold">{userName}</span>
      <img
        src={profileImage}
        alt="User Profile"
        className="w-12 h-12 rounded-full"
        onClick={() => setOpenDrop((prev) => !prev)}
      />
      {openDrop && <DropDownProfile />}
    </div>
  );

  return (
    <>
      <nav className="">
        <div className="fixed bg-white container py-3 px-5 md:py-2 md:px-5 z-10">
          <div className="flex justify-between items-center">
            {/* logo section */}
            <div>
              <a href="/" className="flex items-center">
                <img src={navLogo} alt="logo" className="w-12 mt-1" />
                <span className="text-xl sm:text-4xl font-bold text-indigo-500">
                  Recruiter
                </span>
              </a>
            </div>

            {/* desktop navlinks section */}
            <div className="hidden md:block">
              <ul className="flex items-center gap-8">
                {links.map(({ id, name, link }) => (
                  <li key={id} className="cursor-pointer py-4">
                    <a
                      href={link}
                      className="text-lg font-medium hover:text-sky-600 py-2 hover:border-b-2 hover:border-sky-900 transition-all duration-300"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conditionally render the "Get Started" button */}
            {getStartedButton}

            {/* Conditionally render user details and message icon */}
            {userDetailsAndIcon}

            {/* mobile view */}
            <div className="md:hidden">
              {showMenu ? (
                <HiMenuAlt1
                  onClick={toggleMenu}
                  className="cursor-pointer text-2xl md:hidden"
                />
              ) : (
                <HiMenuAlt3
                  onClick={toggleMenu}
                  className="cursor-pointer text-2xl md:hidden"
                />
              )}
            </div>
          </div>
        </div>

        {/* mobile view links */}
        <MobileMenu showMenu={showMenu} toggleMenu={toggleMenu} />
      </nav>
      {showVideoModal && (
        <MeetingModal
          closeModal={closeVideoModal} // Pass close function to the modal
        />
      )}
    </>
  );
};

export default Navbar;
