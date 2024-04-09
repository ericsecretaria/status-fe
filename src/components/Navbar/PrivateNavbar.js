import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/slices/users/usersSlices";
import { useDispatch, useSelector } from "react-redux";
import ErrorMsg from "../Alert/ErrorMsg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const { profile, userAuth } = useSelector((state) => state?.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutAction());
    navigate("/", { replace: true });
    //reload
    window.location.reload();
  };

  const addPostHandler = () => {
    if (!userAuth?.userInfo?.isVerified) {
      // navigate("/add-post");
      // alert("Not Verified");
      <ErrorMsg message={"test"} />;
    }
    navigate("/add-post");
  };
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <span class="relative whitespace-nowrap ">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 418 42"
                      class="absolute top-2/3 left-0 h-[0.58em] w-full fill-lime-500"
                      preserveAspectRatio="none"
                    >
                      <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                    </svg>
                    <span class="relative font-extrabold">Status.</span>
                  </span>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8"></div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* <Link
                    to={"/add-post"}
                    className="ml-2 relative inline-flex items-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-white  bg-lime-600 hover:bg-lime-700 transition ease-in-out duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                  >
                    <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Business
                  </Link> */}
                  <button
                    onClick={addPostHandler}
                    className="ml-2 relative inline-flex items-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-white  bg-lime-500 hover:bg-lime-400 transition ease-in-out duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                  >
                    <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Business
                  </button>
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3 z-40">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src={
                            userAuth?.userInfo?.profilePicture
                              ? userAuth?.userInfo?.profilePicture
                              : "https://www.clipartmax.com/png/small/319-3191274_male-avatar-admin-profile.png"
                          }
                          alt={userAuth?.userInfo?.username}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={"/user-profile"}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/posts"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Businesses
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/update-profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              onClick={logoutHandler}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={userAuth?.userInfo?.profilePicture}
                    alt={userAuth?.userInfo?.username}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {profile?.user?.username}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {profile?.user?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 z-40 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Disclosure.Button
                  as="a"
                  href="/user-profile"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/posts"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Businesses
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="update-profile"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  onClick={logoutHandler}
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
