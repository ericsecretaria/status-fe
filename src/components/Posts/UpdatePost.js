import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePostAction } from "../../redux/slices/posts/postsSlice";
import LoadingComponent from "../Alert/LoadingComponent";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CgCloseO } from "react-icons/cg";

const UpdatePost = () => {
  const navigate = useNavigate();
  //! Get the post id from params
  const { postId } = useParams();

  const dispatch = useDispatch();

  //! Get post from store
  const { loading, success } = useSelector((state) => state?.posts);

  const [formData, setFormData] = useState({
    title: "",
    released: "",
    image: null,
    targetAmount: "",
    trackMonth: "",
  });

  //1. Validate form
  const validateForm = (data) => {
    let errors = {};
    if (!data.title) errors.title = "This field is required";
    if (!data.released) errors.released = "This field is required";
    if (!data.image) errors.image = "This field is required";
    if (!data.targetAmount) errors.targetAmount = "This field is required";
    if (!data.trackMonth) errors.trackMonth = "This field is required";
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //! Handle image change
  const HandleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updatePostAction({ ...formData, postId }));
    e.preventDefault();
    setFormData({
      title: "",
      released: "",
      image: null,
      targetAmount: "",
      trackMonth: "",
    });
  };

  //! Redirect Post Handler
  const redirectPostHandler = () => {
    navigate(`/posts`);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  const cancelUpdateTargetHandler = () => {
    navigate(`/posts/${postId}`);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  return (
    <>
      <section class="bg-white">
        <div class="flex flex-col items-center justify-center mx-auto md:h-screen top-0">
          <div class="bg-white rounded-lg shadow shadow-2xl dark:border md:mt-24 dark:border-coolGray-700">
            <div class="md:p-18">
              {/* <h1 class="text-2xl md:text-3xl text-coolGray-900 font-bold text-center p-8">
                Let's Get Started
              </h1> */}
              <button
                className="ml-56 mb-5"
                onClick={cancelUpdateTargetHandler}
              >
                ❌
              </button>
              <p className="italic p-8 text-base md:text-sm text-red-500 font-medium text-center">
                (Note: Leave boxes empty if it doesn't need to be updated)
              </p>
              <form
                class="w-full px-3 md:px-16 py-10 pt-0"
                onSubmit={handleSubmit}
              >
                <div className="pt-5">
                  <span className="mb-1 text-coolGray-800 font-medium">
                    Make / Brand / Model
                  </span>
                  <input
                    className="placeholder:italic py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 rounded-lg shadow-sm"
                    type="text"
                    placeholder="e.g. CHEVROLET-CAMARO"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required=""
                  />
                </div>
                <div className="pt-5">
                  <span className="mb-1 text-coolGray-800 font-medium">
                    Released / Received Unit
                  </span>
                  <input
                    className="placeholder:italic py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 rounded-lg shadow-sm"
                    type="date"
                    // placeholder="e.g. February 27 2024"
                    name="released"
                    value={formData.released}
                    onChange={handleChange}
                    required=""
                  />
                </div>
                <div className="pt-5">
                  <span className="mb-1 text-coolGray-800 font-medium">
                    Image
                  </span>
                  <input
                    className="placeholder:italic py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 rounded-lg shadow-sm"
                    type="file"
                    name="image"
                    onChange={HandleFileChange}
                    required=""
                  />
                </div>
                <div className="pt-5">
                  <span className="mb-1 text-coolGray-800 font-medium">
                    Target Amount
                  </span>
                  <input
                    className="placeholder:italic py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 rounded-lg shadow-sm"
                    type="number"
                    min="1"
                    max="999999"
                    placeholder="e.g. 17000"
                    name="targetAmount"
                    value={formData.targetAmount}
                    onChange={handleChange}
                    required=""
                  />
                </div>
                <div className="pt-5">
                  <span className="mb-1 text-coolGray-800 font-medium">
                    Track Month
                  </span>
                  <input
                    className="placeholder:italic py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 rounded-lg shadow-sm"
                    type="date"
                    // placeholder="e.g. April"
                    name="trackMonth"
                    value={formData.trackMonth}
                    onChange={handleChange}
                    required=""
                  />
                </div>
                <p className="italic mb-7 text-base md:text-sm text-red-500 font-medium text-center">
                  (Note: This is just to know the Month you need to track)
                </p>

                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button
                    className="mb-4 inline-block py-3 px-7 w-full leading-6 text-white font-medium text-center bg-lime-500 hover:bg-lime-400 focus:ring-2 focus:ring-lime-400 focus:ring-opacity-50 rounded-md"
                    type="submit"
                  >
                    Update
                  </button>
                )}
                {success && redirectPostHandler()}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdatePost;
