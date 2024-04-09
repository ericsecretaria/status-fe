import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { addPostAction } from "../../redux/slices/posts/postsSlice";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
import { uploadCoverImageAction } from "../../redux/slices/users/usersSlices";
import { useNavigate } from "react-router-dom";

const UploadCoverImage = () => {
  const navigate = useNavigate();
  //fetch categories
  const dispatch = useDispatch();
  //! Error state
  const [errors, setErrors] = useState({});

  useEffect(() => {}, [dispatch]);

  const [formData, setFormData] = useState({
    image: null,
  });

  const { success, loading, error } = useSelector((state) => state?.users);

  //1. Validate form
  const validateForm = (data) => {
    let errors = {};
    if (!data.image) errors.image = "Image is required";
    return errors;
  };
  //2. Handle Blur
  const handleBlur = (e) => {
    const { name } = e.target;
    const formErrors = validateForm(formData);
    setErrors({ ...errors, [name]: formErrors[name] });
  };

  //! Handle image change
  const HandleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      // console.log(formData);
      // dispatch the action
      dispatch(uploadCoverImageAction(formData));
      e.preventDefault();
    }
  };

  const redirectCoverImageHandler = () => {
    navigate("/user-profile");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Upload Cover Image
          </h2>
          {/* Error Here */}
          {/* {error && <ErrorMsg message={error?.message} />}
          {success && <SuccessMsg message="Post created successfully" />} */}

          <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
            Upload or update Cover Image
          </h3>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Image</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="image"
              onChange={HandleFileChange}
              onBlur={handleBlur}
            />
            {/* error here */}
            {errors?.image && <p className="text-red-500">{errors.image}</p>}
          </label>

          {/* button */}
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-lime-500 hover:bg-lime-400 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
              type="submit"
            >
              Upload Cover Image
            </button>
          )}
          {success && redirectCoverImageHandler()}
        </div>
      </form>
    </div>
  );
};

export default UploadCoverImage;
