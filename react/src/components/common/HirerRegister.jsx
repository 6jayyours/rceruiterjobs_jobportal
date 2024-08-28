import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  registerUser,
  resendOTP,
  verifyDoc,
  verifyOTP,
} from "../../redux/slice/authSlice";
import toast from "react-hot-toast";

const HirerRegister = () => {
  // State variables for form fields
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State variables for form validation errors
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const [showDocUploadForm, setShowDocUploadForm] = useState(false);
  const [docError, setDocError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle firstname change
  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);

    // Validate firstname
    if (e.target.value.trim() === "") {
      setFirstnameError("First name cannot be empty");
    } else {
      setFirstnameError("");
    }
  };

  // Function to handle lastname change
  const handleLastnameChange = (e) => {
    setLastname(e.target.value);

    // Validate lastname
    if (e.target.value.length < 4) {
      setLastnameError("Last name must be at least 4 characters long");
    } else {
      setLastnameError("");
    }
  };

  // Function to handle username change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);

    // Validate lastname
    if (e.target.value.trim() === "") {
      setLastnameError("Last name cannot be empty");
    } else {
      setLastnameError("");
    }
  };

  // Function to handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    // Validate email
    if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  // Function to handle password change
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);

    // Validate password for special character, number, uppercase, and lowercase
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and include one special character, one number, one uppercase letter, and one lowercase letter"
      );
    } else {
      setPasswordError("");
    }
  };

  // Function to handle confirm password change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

    // Validate confirm password
    if (e.target.value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstname < 6) {
      setFirstnameError("First name must be at least 6 characters long");
    }
    if (lastname < 4) {
      setLastnameError("Last name must be at least 4 characters long");
    }
    if (username < 5) {
      setUsernameError("Username must be at least 5 characters long");
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and include one special character, one number, one uppercase letter, and one lowercase letter"
      );
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    }

    const formData = {
      username,
      password,
      firstname,
      lastname,
      email,
      role: "RECRUITER",
    };
    dispatch(registerUser(formData))
      .then((response) => {
        if (response.payload.message === "User registered successfully.") {
          setShowDocUploadForm(true);
        } else {
          setRegisterError(response.payload.message);
        }
      })
      .catch((error) => {
        notifyError();
      });
  };

  const handleDocumentSubmit = (e) => {
    e.preventDefault();
    const fileInput = e.target.elements.document;
    const file = fileInput.files[0];
    console.log(file.size)
    if (!file || file.size === 0) {
      setDocError("upload a file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      console.log(file.size)
      setDocError("File size exceeds 10MB limit.");
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);
    dispatch(verifyDoc(formData))
      .then(response => {
        setShowDocUploadForm(false);
        toast.success("User Registered Successfully.")
        navigate('/login');
      })
      .catch(error => {
        toast.error("Error in submission");
      });
  }

  return (
    <>
      <section className="h-screen flex items-center justify-center relative overflow-hidden bg-register-bg bg-no-repeat bg-center bg-cover">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto p-4">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              <div className="relative overflow-hidden bg-white shadow-lg rounded-md p-6">
                <div className="flex items-center justify-center lg:justify-center">
                  <img
                    src={logo}
                    alt="Recruiter Logo"
                    className="w-11 mb-4 lg:mr-4 lg:mb-0"
                  />
                  <h1 className="text-2xl font-bold">Recruiter</h1>
                </div>
                <h5 className="my-6 text-2xl font-semibold text-center lg:text-left">
                  Recruiter Registration
                </h5>
                {!showDocUploadForm && (
                  <form className="text-left" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4">
                      {registerError && (
                        <p className="text-red-500 text-sm mt-1">
                          {registerError}
                        </p>
                      )}
                      <div className="mb-2">
                        <label className="font-semibold">First Name:</label>
                        <input
                          className="form-input mt-1 rounded-md w-full border border-gray-300 p-1"
                          type="text"
                          value={firstname}
                          onChange={handleFirstnameChange}
                        />
                        {firstnameError && (
                          <p className="text-red-500 text-sm mt-1">
                            {firstnameError}
                          </p>
                        )}
                      </div>
                      <div className="mb-2">
                        <label className="font-semibold">Last Name:</label>
                        <input
                          className="form-input mt-1 rounded-md w-full border border-gray-300 p-1"
                          type="text"
                          value={lastname}
                          onChange={handleLastnameChange}
                        />
                        {lastnameError && (
                          <p className="text-red-500 text-sm mt-1">
                            {lastnameError}
                          </p>
                        )}
                      </div>
                      <div className="mb-2">
                        <label className="font-semibold">Username:</label>
                        <input
                          className="form-input mt-1 rounded-md w-full border border-gray-300 p-1"
                          type="text"
                          value={username}
                          onChange={handleUsernameChange}
                        />
                        {usernameError && (
                          <p className="text-red-500 text-sm mt-1">
                            {usernameError}
                          </p>
                        )}
                      </div>
                      <div className="mb-2">
                        <label className="font-semibold">Email:</label>
                        <input
                          className="form-input mt-1 rounded-md w-full border border-gray-300 p-1"
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                        />
                        {emailError && (
                          <p className="text-red-500 text-sm mt-1">
                            {emailError}
                          </p>
                        )}
                      </div>
                      <div className="mb-2">
                        <label className="font-semibold">Password:</label>
                        <input
                          className="form-input mt-1 rounded-md w-full border border-gray-300 p-1"
                          type="password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        {passwordError && (
                          <p className="text-red-500 text-sm mt-1">
                            {passwordError}
                          </p>
                        )}
                      </div>
                      <div className="mb-2">
                        <label className="font-semibold">
                          Confirm Password:
                        </label>
                        <input
                          className="form-input mt-1 rounded-md w-full border border-gray-300 p-1"
                          type="password"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                        />
                        {confirmPasswordError && (
                          <p className="text-red-500 text-sm mt-1">
                            {confirmPasswordError}
                          </p>
                        )}
                      </div>
                      <div className="mb-2">
                        <input
                          type="submit"
                          className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-md w-full py-2"
                          value="Register"
                        />
                      </div>
                      <div className="text-center">
                        <span className="text-gray-600 mr-2">
                          Already have an account?
                        </span>
                        <Link to={"/login"}>
                          <span className="text-indigo-700 font-bold cursor-pointer hover:underline">
                            Sign In
                          </span>
                        </Link>
                      </div>
                    </div>
                  </form>
                )}
                {showDocUploadForm && (
                  <form onSubmit={handleDocumentSubmit}>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Upload Document
                    </label>
                    <div className="flex flex-col md:rounded-s-md rounded w-72 mx-auto mb-4">
                      <p className="text-gray-400x">Max file size is 10MB</p>
                      <input
                        type="file"
                        id="document"
                        accept="image/*"
                        className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    {docError && (
                      <p className="text-red-500 text-xs mt-1 items-center">
                        {docError}
                      </p>
                    )}
                    <div className="flex justify-center items-center mt-4">
                      <button
                        type="submit"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-32"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HirerRegister;
