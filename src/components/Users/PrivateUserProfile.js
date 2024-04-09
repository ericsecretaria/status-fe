import { useDispatch, useSelector } from "react-redux";
import {
  sendAccountVerificationEmailAction,
  uploadProfileImageAction,
  userPrivateProfileAction,
} from "../../redux/slices/users/usersSlices";
import { useEffect } from "react";

import { CgTrack } from "react-icons/cg";
import { AiFillCamera } from "react-icons/ai";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import UserPosts from "./UserPosts";
import Followers from "./Followers";
import SuccessMsg from "../Alert/SuccessMsg";
import { Link } from "react-router-dom";

export default function PrivateUserProfile() {
  //! Get data from store
  const dispatch = useDispatch();

  //get user private profile
  useEffect(() => {
    dispatch(userPrivateProfileAction());
  }, [dispatch]);

  // const { user, loading, error, profile, userAuth, isEmailSent } = useSelector(
  //   (state) => state?.users
  // );
  const { profile, userAuth, isEmailSent } = useSelector(
    (state) => state?.users
  );

  const posts = useSelector((state) => state.users?.profile?.user?.posts || []);

  //! Send Account Verification Email Handler
  const sendAccountVerificationEmailHandler = () => {
    dispatch(sendAccountVerificationEmailAction());
  };

  return (
    <>
      {/* Success Message*/}
      {isEmailSent && (
        <SuccessMsg message="Email successfully sent, Check your email" />
      )}
      <div className="flex h-full">
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                {/* Profile header */}
                <div>
                  <div>
                    <div>
                      <img
                        className="object-cover w-full h-32 lg:h-48"
                        src={profile?.user?.coverImage}
                        alt={profile?.user?.username}
                      />

                      <label
                        htmlFor="coverImageInput"
                        className="cursor-pointer"
                      >
                        <Link to={"/upload-cover-image"}>
                          <AiFillCamera className="absolute top-0  right-0 w-6 h-6 m-4 text-gray-200" />
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      {/* Add CameraIcon for profile image upload */}
                      <div className="relative flex items-center justify-center">
                        <img
                          className="w-24 h-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                          src={profile?.user?.profilePicture}
                          alt={profile?.user?.username}
                        />
                        <label
                          htmlFor="profileImageInput"
                          className="absolute bottom-0 right-0 cursor-pointer"
                        >
                          <Link to={"/upload-profile-image"}>
                            <AiFillCamera className="w-6 h-6 m-1 text-gray-500" />
                          </Link>
                        </label>
                      </div>

                      <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="flex-1 min-w-0 mt-6 sm:hidden 2xl:block">
                          <h1 className="text-2xl font-bold text-gray-900 truncate">
                            {profile?.user?.username}
                          </h1>
                        </div>
                        {!userAuth?.userInfo?.isVerified && (
                          <button
                            onClick={sendAccountVerificationEmailHandler}
                            className="rounded-md mt-6 bg-yellow-50 p-4"
                          >
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <ExclamationTriangleIcon
                                  className="h-5 w-5 text-yellow-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">
                                  Click here to verify your account
                                </h3>
                              </div>
                            </div>
                          </button>
                        )}
                        <div className="flex flex-col mt-6 space-y-3 justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4">
                          {/* Profile Views */}
                          <button
                            type="button"
                            className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            <CgTrack size={20} />
                            Created Tracks ({profile?.user?.posts?.length})
                          </button>

                          {/* follow */}
                          <button
                            type="button"
                            className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            <svg
                              className="-ml-0.5 h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.5 5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM5 6.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm10.086 2.914a1 1 0 00-1.086.914A4.998 4.998 0 0013 15a5 5 0 10-10 0 4.998 4.998 0 00.786-2.828 1 1 0 10-1.972-.329A6.997 6.997 0 012 15a7 7 0 1014 0 6.997 6.997 0 00-.914-5.586z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Followers ({profile?.user?.followers?.length})
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 hidden min-w-0 mt-6 sm:block 2xl:hidden">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">
                        {profile?.user?.username}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Profile details */}
                <div className="max-w-5xl px-4 mx-auto mt-6 sm:px-6 lg:px-8">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Email: {profile?.user?.email}
                      </dt>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Date Joined:{" "}
                        {new Date(profile?.user?.createdAt).toDateString()}
                      </dt>
                      <div className="grid grid-cols-2 gap-2 mt-5">
                        {/* First column: "Business" or "Businesses" label */}
                        <dt className="text-sm font-medium text-gray-500 mb-2">
                          {posts.length <= 1 ? "Business:" : "Businesses:"}
                        </dt>
                        {/* Second column: "Origin" label */}
                        <dt className="text-sm font-medium text-gray-500">
                          Origin:
                        </dt>
                        {posts.length < 1 ? (
                          <>
                            {/* First column: Title */}
                            <div className="flex mt-0">
                              <dt className="text-sm font-medium text-gray-500 mr-2 italic">
                                None
                              </dt>
                            </div>
                            {/* Second column: Released */}
                            <div className="flex mt-0">
                              <dt className="text-sm font-medium text-gray-500 italic">
                                None
                              </dt>
                            </div>
                          </>
                        ) : (
                          posts.map((post) => (
                            <>
                              {/* First column: Title */}
                              <div className="flex mt-0">
                                <dt className="text-sm font-medium text-gray-500 mr-2">
                                  {post.title}
                                </dt>
                              </div>
                              {/* Second column: Released */}
                              <div className="flex mt-0">
                                <dt className="text-sm font-medium text-gray-500">
                                  {post.released}
                                </dt>
                              </div>
                            </>
                          ))
                        )}
                      </div>
                    </div>

                    {/* <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        About
                      </dt>
                      <dd className="mt-1 space-y-5 text-sm text-gray-900 max-w-prose">
                        lorem label
                      </dd>
                    </div> */}
                  </dl>
                </div>
                {/* Posts Lists */}
                <UserPosts posts={profile?.user?.posts} />
                <Followers followers={profile?.user?.followers} />
                {/* Followed Users */}
                {/* <UsersLists /> */}
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
