import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerAction } from "../../redux/slices/users/usersSlices";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
import LoadingComponent from "../Alert/LoadingComponent";

const Register = () => {
  //! Navigation hook
  const navigate = useNavigate();
  //! Dispatch
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  //handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerAction({
        username: formData.username,
        password: formData.password,
        email: formData.email,
      })
    );
    // reset form
    setFormData({
      email: "",
      password: "",
      username: "",
    });
  };

  // data in store
  const { user, error, success, loading } = useSelector(
    (state) => state?.users
  );
  //! Redirect
  useEffect(() => {
    if (user?.status === "success") {
      navigate("/login");
    }
  }, [user?.status]);

  return (
    <>
      <section class="bg-white">
        <div class="flex flex-col items-center justify-center mx-auto md:h-screen top-0">
          <div class="bg-white rounded-lg shadow shadow-2xl dark:border md:mt-24 dark:border-coolGray-700">
            <div class="md:p-18">
              <h2 class="text-2xl md:text-3xl text-coolGray-900 font-bold text-center p-8">
                Get Connected
              </h2>
              {/* Display error here */}
              {error && <ErrorMsg message={error?.message} />}
              {/* Success message */}
              {success && <SuccessMsg message="You are now registered." />}
              <form class="w-full px-16 py-10 pt-0" onSubmit={handleSubmit}>
                <div className="pt-5">
                  <span className="mb-1 text-coolGray-800 font-medium">
                    Username
                  </span>
                  <input
                    className="placeholder:italic py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 rounded-lg shadow-sm"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    name="username"
                    required=""
                  />
                </div>
                <div className="pt-5">
                  <span className="mb-1 text-coolGray-800 font-medium">
                    Email
                  </span>
                  <input
                    className="placeholder:italic py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 rounded-lg shadow-sm"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    required=""
                  />
                </div>
                <div className="pt-5">
                  <span className="mb-1 text-coolGray-800 font-medium">
                    Password
                  </span>
                  <input
                    className="placeholder:italic py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 rounded-lg shadow-sm"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    required=""
                  />
                </div>

                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button
                    className="mb-4 mt-6 inline-block py-3 px-7 w-full leading-6 text-white font-medium text-center bg-lime-500 hover:bg-lime-400 focus:ring-2 focus:ring-lime-400 focus:ring-opacity-50 rounded-md"
                    type="submit"
                  >
                    Register
                  </button>
                )}
                <p className="text-sm text-coolGray-400 font-medium text-center">
                  <span>Already have an account? &nbsp;</span>
                  <Link
                    className="text-lime-500 hover:text-lime-400"
                    to="/login"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
