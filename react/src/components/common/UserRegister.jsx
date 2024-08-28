import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  registerUser,
  resendOTP,
  verifyOTP,
} from "../../redux/slice/authSlice";
import toast from "react-hot-toast";

const UserRegister = () => {
  // State variables for form fields
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const otpInputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
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

  // State variables for OTP form
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(30);
  const [resetOtp, setResetOtp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputs = useRef([]);

  // Timer effect for OTP form
  useEffect(() => {
    let interval;
    if (showOtpForm && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpForm, timer]);

  // Reset OTP state when timer reaches 0
  useEffect(() => {
    if (timer === 0) {
      clearInterval(timer);
      setResetOtp(true);
    }
  }, [timer]);

  // Handle key up events in OTP inputs
  const handleKeyUp = (index, e) => {
    if (e.keyCode === 8 && index > 0 && e.target.value === "") {
      otpInputRefs.current[index - 1].current.focus();
    } else if (
      index < otpInputRefs.current.length - 1 &&
      e.target.value !== ""
    ) {
      otpInputRefs.current[index + 1].current.focus();
    }
  };

  // Handle key down events in OTP inputs
  const handleKeyDown = (e, index) => {
    if (e.keyCode === 39) {
      e.preventDefault();
      if (index < otpInputRefs.current.length - 1) {
        otpInputRefs.current[index + 1].current.focus();
      }
    } else if (e.keyCode === 37) {
      e.preventDefault();
      if (index > 0) {
        otpInputRefs.current[index - 1].current.focus();
      }
    }
  };

  // Handle OTP change events
  const handleOtpChange = (index, value) => {
    setOtp((prevOtp) => {
      let newOtp =
        prevOtp.substring(0, index) + value + prevOtp.substring(index + 1);
      newOtp = newOtp.replace(/\D/g, "");
      return newOtp.slice(0, 4);
    });
  };

  // Handle OTP verification form submission
  const handleOTPVerificationSubmit = (e) => {
    e.preventDefault();
    const otpValue = inputs.current.map((input) => input.value).join("");
    const userData = { email, otp };
    dispatch(verifyOTP(userData))
      .then((response) => {
        if (response.payload === "OTP verified successfully.") {
          toast.success("User registered Successfully.");
          setShowOtpForm(false);
          navigate("/login");
        } else if (
          response.payload === "Invalid OTP." ||
          response.payload === "OTP has expired."
        ) {
          setOtpError(response.payload);
        }
      })
      .catch((error) => {
        toast.error("An error occurred during OTP verification.");
      });
    setOtp("");
  };

  // Handle OTP reset click
  const handleResetotpClick = () => {
    const userData = { email };
    dispatch(resendOTP(userData))
      .then((response) => {
        console.log(response)
        toast.success("OTP resent successfully.");
      })
      .catch((error) => {
        toast.success("Error resending OTP.");
      });
    setTimer(30);
    setResetOtp(false);
    setOtpError("");
  };

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
    if (e.target.value.trim() === "") {
      setLastnameError("Last name cannot be empty");
    } else {
      setLastnameError("");
    }
  };

  // Function to handle username change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);

    // Validate username
    if (e.target.value.length < 5) {
      setUsernameError("Username must be at least 5 characters long");
    } else {
      setUsernameError("");
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

    
    let hasErrors = false;

    if (firstname.trim() === "") {
      setFirstnameError("First name cannot be empty");
      hasErrors = true;
    } else {
      setFirstnameError("");
    }

    if (lastname.trim() === "") {
      setLastnameError("Last name cannot be empty");
      hasErrors = true;
    } else {
      setLastnameError("");
    }

    if (username.length < 5) {
      setUsernameError("Username must be at least 5 characters long");
      hasErrors = true;
    } else {
      setUsernameError("");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      hasErrors = true;
    } else {
      setEmailError("");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 6 characters long and include one special character, one number, one uppercase letter, and one lowercase letter");
      hasErrors = true;
    } else {
      setPasswordError("");
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      hasErrors = true;
    } else {
      setConfirmPasswordError("");
    }

    if (hasErrors) {
      return;
    }

    const formData = {
      username,
      password,
      firstname,
      lastname,
      email,
      role: "USER",
    };
    dispatch(registerUser(formData))
      .then((response) => {
        if (response.payload.message === "User registered successfully.") {
          setShowOtpForm(true);
        } else {
          setRegisterError(response.payload.message);
        }
      })
      .catch((error) => {
        notifyError();
      });
  };

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
                  User Registration
                </h5>
                {!showOtpForm && (
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
                {showOtpForm && (
                  <form onSubmit={handleOTPVerificationSubmit}>
                    <div className="flex items-center justify-center mb-4">
                      <p>Time remaining: {timer} seconds</p>
                    </div>
                    <div className="flex space-x-2 items-center justify-center">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <input
                          key={index}
                          type="password"
                          maxLength="1"
                          ref={otpInputRefs.current[index]}
                          value={otp[index] || ""}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyUp={(e) => handleKeyUp(index, e)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          className="w-10 border border-gray-300 rounded-md py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-center mt-4">
                      {otpError && (
                        <p className="text-red-500 text-sm mt-1">{otpError}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-center mt-4">
                      {resetOtp && (
                        <button
                          style={{ backgroundColor: "white", color: "blue" }}
                          onClick={handleResetotpClick}
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                    <div className="flex justify-center items-center mt-4">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32"
                      >
                        Verify OTP
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

export default UserRegister;
