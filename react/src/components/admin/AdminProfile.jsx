import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePass, getUser, updateUser } from "../../redux/slice/authSlice";
import { getPicture, uploadProfilePicture } from "../../redux/slice/adminSlice";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.id); // Assuming userId is stored in auth slice
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user); // Assuming user data is stored in auth slice

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [passError, setPassError] = useState(null);

  const [isPersonalDetailsEditable, setIsPersonalDetailsEditable] = useState(false);
  const [isContactInfoEditable, setIsContactInfoEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
    role: "",
    mobile: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getUser(id))
        .then((response) => {
          const userData = response.payload;
          setFormData({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            username: userData.username || "",
            email: userData.email || "",
            gender: userData.gender || "",
            mobile: userData.mobile || "",
            role: userData.role || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(getPicture(id))
        .then((response) => {
          setProfileImage(response.payload);
        })
        .catch((error) => {
          console.error("Error fetching profile image:", error);
        });
    }
  }, [dispatch, id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      handleDocumentSubmit(file);
    }
  };

  const handleDocumentSubmit = (file) => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    if (file.size === 0) {
      console.error("Please upload a file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      console.error("File size exceeds 10MB limit.");
      return;
    }
    dispatch(uploadProfilePicture({ file, id, token }))
      .then((response) => {
        console.log(response.payload);
        setProfileImage(response.payload);
      })
      .catch((error) => {
        console.error("Error uploading profile picture:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditPersonalDetails = () => {
    setIsPersonalDetailsEditable(!isPersonalDetailsEditable);
  };

  const handleSubmitPersonalDetails = () => {
    dispatch(updateUser({ id, token, data: formData }))
      .then((response) => {
        console.log(response.payload);
        setIsPersonalDetailsEditable(false); // Disable editing after successful update
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const handleEditContactInfo = () => {
    setIsContactInfoEditable(true);
    
  };

  const handleSubmitContactInfo = () => {
    dispatch(updateUser({ id, token, data: formData }))
      .then((response) => {
        console.log(response.payload);
        setIsContactInfoEditable(false);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const handleEditPassword = () => {
    setIsPasswordEditable(true);
  };

  const handleSubmitPassword = () => {
    console.log(formData.oldPassword,formData.newPassword,formData.confirmPassword)
    if (formData.newPassword !== formData.confirmPassword) {
      
      return;
    }

    const passData = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      id,
    };

    if(id) {
      dispatch(changePass(passData))
      .then(response => {
        console.log("Password updated successfully:", response);
        // Handle success, e.g., disable editing after successful update
        setIsPasswordEditable(false);
      })
      .catch(error => {
        console.error("Error updating password:", error);
        // Handle error, e.g., show error message
      });
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard / Recruiter Profile
        </h2>
      </div>
      <div className="overflow-x-auto">
        <div className="flex flex-col md:flex-row items-center md:items-end mb-8">
          <div className="text-center">
            <input
              type="file"
              className="hidden"
              id="profile-picture"
              onChange={handleFileChange}
            />
            <label htmlFor="profile-picture" className="cursor-pointer">
              <div className="w-28 h-28 max-w-[112px] max-h-[112px] mx-auto relative">
                <img
                  className="rounded-full shadow ring-4 ring-white"
                  src={previewUrl || profileImage}
                  alt="Profile"
                />
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 hover:opacity-100">
                  <span>Change</span>
                </div>
              </div>
            </label>
          </div>
          <div className="mt-4 md:mt-0 md:ml-5 text-center md:text-left">
            <h5 className="text-xl font-semibold">
              {formData.firstName} {formData.lastName}
            </h5>
            <p className="text-gray-500">{formData.role}</p>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="p-6 rounded-md shadow bg-white border border-gray-300">
              <h5 className="text-lg font-semibold mb-4">Personal Details:</h5>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium" htmlFor="firstname">
                    First Name:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="First Name"
                    id="firstname"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isPersonalDetailsEditable}
                  />
                </div>
                <div>
                  <label className="font-medium" htmlFor="lastname">
                    Last Name:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Last Name"
                    id="lastname"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isPersonalDetailsEditable}
                  />
                </div>
                <div>
                  <label className="font-medium" htmlFor="email">
                    Email:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isPersonalDetailsEditable}
                  />
                </div>
                <div>
                  <label className="font-medium" htmlFor="gender">
                    Gender:<span className="text-red-600">*</span>
                  </label>
                  <select
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!isPersonalDetailsEditable}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-span-2">
                  {isPersonalDetailsEditable ? (
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                      onClick={handleSubmitPersonalDetails}
                    >
                      Save Changes
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                      onClick={handleEditPersonalDetails}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div className="p-6 rounded-md shadow bg-white border border-gray-300">
              <h5 className="text-lg font-semibold mb-4">
                Contact Information:
              </h5>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium" htmlFor="phone">
                    Phone:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Phone"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    disabled={!isContactInfoEditable}
                  />
                </div>
                <div className="col-span-2">
                  {isContactInfoEditable ? (
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                      onClick={handleSubmitContactInfo}
                    >
                      Save Changes
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                      onClick={handleEditContactInfo}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div className="p-6 rounded-md shadow bg-white border border-gray-300">
              <h5 className="text-lg font-semibold mb-4">Change Password:</h5>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium" htmlFor="oldPassword">
                    Old Password:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Old Password"
                    id="oldPassword"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    disabled={!isPasswordEditable}
                  />
                </div>
                <div>
                  <label className="font-medium" htmlFor="newPassword">
                    New Password:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="New Password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    disabled={!isPasswordEditable}
                  />
                </div>
                <div>
                  <label className="font-medium" htmlFor="confirmPassword">
                    Confirm Password:<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 p-2 mt-2 rounded-md"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={!isPasswordEditable}
                  />
                </div>
                <div className="col-span-2">
                  {isPasswordEditable ? (
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                      onClick={handleSubmitPassword}
                    >
                      Save Changes
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                      onClick={handleEditPassword}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
