// Login component with corrected links
import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

/**
 * Login Component
 * Renders a login form and handles user authentication.
 */
const Login = () => {
  // Toast notifications for success and error messages
  const notifySuccess = () => toast.success("Login Successful.");
  const notifyError = (message) => toast.error(message || "Login failed.");

  // State variables for form fields and error messages
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  // Hooks for dispatching actions and navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles username input change and validation.
   * @param {Object} e - Event object
   */
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length < 5) {
      setUsernameError("Username must be at least 5 characters long");
    } else {
      setUsernameError("");
    }
  };

  /**
   * Handles password input change and validation.
   * @param {Object} e - Event object
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  /**
   * Handles form submission.
   * Dispatches the login action and handles the response.
   * @param {Object} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate before submitting
    if (username < 5) {
      setUsernameError("Username must be at least 5 characters long");
    }
    if (password < 6) {
      setPasswordError("Password must be at least 6 characters long");
    }
    if (username.length >= 5 && password.length >= 6) {
      const formData = {
        username,
        password,
      };
      dispatch(loginUser(formData))
        .then((response) => {
          if (response.payload.message === "User logged in successfully") {
            notifySuccess();
            if(response.payload.role==="ADMIN"){
              navigate("/admin/dashboard")
            } else {
              navigate("/");
            }
          } else {
            console.log(response.payload.message)
            console.log(response.payload.blockReason)
            setLoginError(response.payload.message);
          }
        })
        .catch((error) => {
          notifyError();
          console.error("Login failed: ", error);
        });
    }
  };

  return (
    <>
      <section className="h-screen flex items-center justify-center relative overflow-hidden bg-register-bg bg-no-repeat bg-center bg-cover">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto p-4">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              <div className="relative overflow-hidden bg-white shadow-lg rounded-md p-6">
                <div className="flex items-center justify-center lg:justify-start">
                  <img
                    src={logo}
                    alt="Recruiter Logo"
                    className="w-11 mb-4 lg:mr-4 lg:mb-0"
                  />
                  <h1 className="text-2xl font-bold">Recruiter</h1>
                </div>
                <h5 className="my-6 text-2xl font-semibold text-center lg:text-left">
                  Login
                </h5>
                <form className="text-left" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4">
                    {loginError && (
                      <p className="text-red-500 text-sm mt-1">{loginError}</p>
                    )}
                    <div className="mb-4">
                      <label className="font-semibold">Username:</label>
                      <input
                        className="form-input mt-2 rounded-md w-full border border-gray-300 p-2"
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
                    <div className="mb-4">
                      <label className="font-semibold">Password:</label>
                      <input
                        className="form-input mt-2 rounded-md w-full border border-gray-300 p-2"
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
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <input
                          className="rounded border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
                          type="checkbox"
                        />
                        <label className="text-gray-600">Remember Me</label>
                      </div>
                      <div>
                        <Link
                          to="/forgotPassword"
                          className="text-indigo-600 hover:underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                    <div className="mb-4">
                      <input
                        type="submit"
                        className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-md w-full py-2"
                        value="Login"
                      />
                    </div>
                    <div className="text-center flex flex-col">
                      <div>
                        <span className="text-gray-600 mr-2">
                          Don't have an account?
                        </span>
                      </div>
                      <div className="flex justify-center gap-3">
                        <Link
                          to="/userRegistration"
                          className="text-indigo-700 font-bold cursor-pointer hover:underline"
                        >
                          User Sign Up
                        </Link>
                        <Link
                          to="/hirerRegistration"
                          className="text-indigo-700 font-bold cursor-pointer hover:underline"
                        >
                          Recruiter Sign Up
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
