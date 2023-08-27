import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import userContext from "../context/userContext";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import Sidebar from "./Sidebar";
// import Data from "./learning-app.users.json";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "About", href: "/about", current: false },
  { name: "Projects", href: "/projects", current: false },
  { name: "Contact", href: "/contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const context = useContext(userContext);
  const { user } = context;
  const [showsearchModal, setShowsearchmodal] = React.useState(false);
  const [query, setQuery] = useState("");

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("going for login")
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const handleKeyPress = useCallback((event) => {
    // console.log(`Key pressed: ${event.key}`);
    if (event.key === "/") {
      setShowsearchmodal(true);
    }
    if (event.key === "Escape") {
      setShowsearchmodal(false);
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://localhost:3005/api/auth/getalluser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "userdata");
        setData(data.data);
      });
  }, []);

  return (
    <>
      <Disclosure as="nav" className="sidebarfornav bg-gray-800 ">
        {({ open }) => (
          <>
            <div className="ml-3">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    {/* <img
                    className="h-8 w-auto"
                    src="https://icons8.com/icon/17949/google"
                    alt="Your Company"
                  /> */}
                    <svg
                      className="h-8 w-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="48px"
                      height="48px"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                    </svg>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link
                        to="/"
                        className={`${
                          location.pathname === "/"
                            ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        }`}
                      >
                        Home
                      </Link>

                      <Link
                        to="/about"
                        className={`${
                          location.pathname === "/about"
                            ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        }`}
                      >
                        About
                      </Link>

                      <Link
                        to="/services"
                        className={`${
                          location.pathname === "/services"
                            ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        }`}
                      >
                        Services
                      </Link>

                      <Link
                        to="/contact"
                        className={`${
                          location.pathname === "/contact"
                            ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        }`}
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {!localStorage.getItem("token") ? (
                    <form>
                      <Link
                        to="/login"
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        type="button"
                        className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Signup
                      </Link>{" "}
                    </form>
                  ) : (
                    <>
                      <form>
                        <div className="relative text-gray-600 focus-within:text-gray-400 mr-2">
                          <button
                            type="button"
                            onClick={() => {
                              setShowsearchmodal(true);
                            }}
                            className="hidden sm:flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-lg rounded-lg text-slate-400 dark:bg-slate-700 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-500"
                          >
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="flex-none text-slate-300 dark:text-slate-400"
                              aria-hidden="true"
                            >
                              <path d="m19 19-3.5-3.5"></path>
                              <circle cx="11" cy="11" r="6"></circle>
                            </svg>
                            <span className="flex-auto">Quick search...</span>
                            <kbd className="font-sans font-semibold dark:text-slate-600">
                              <abbr
                                title="Control"
                                className="no-underline text-slate-300 dark:text-slate-600"
                              >
                                <kbd className="rounded-sm p-0.5 border-solid border-2 border-slate-600">
                                  /
                                </kbd>
                              </abbr>{" "}
                            </kbd>
                          </button>
                        </div>
                      </form>

                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span
                              onClick={() => {
                                setShowsearchmodal(true);
                              }}
                              className="absolute -inset-1.5"
                            />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.image}
                              alt={user.name}
                            />
                          </Menu.Button>
                        </div>
                      </Menu>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* 
            {showsearchModal ? (
              <form className="z-50">
                <div
                  className="relative"
                  aria-labelledby="modal-title"
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"></div>
                  <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <div className=" text-gray-600 focus-within:text-gray-400 flex hover:shadow-lg items-center p-6 space-x-6 bg-gray-800 rounded-xl shadow-lg transform transition duration-500">
                        <div className="flex bg-gray-700 p-4 w-72 space-x-4 rounded-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 opacity-30"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <input
                            className="bg-gray-700 outline-none text-white"
                            type="text"
                            placeholder="Article name or keyword..."
                          />
                        </div>

                        <div
                          onClick={() => {
                            setShowsearchmodal(false);
                          }}
                          className="bg-gray-700 p-1 text-gray-500 font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer"
                        >
                          Esc
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : null} */}

            {showsearchModal ? (
              <div
                class="fixed w-full inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24"
                id="headlessui-dialog-13"
                role="dialog"
                aria-modal="true"
                data-headlessui-state="open"
              >
                <div class="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100"></div>
                <div class="relative w-full max-w-lg transform px-4 transition-all opacity-100 scale-100">
                  <div
                    class="overflow-hidden rounded-lg bg-white shadow-md"
                    id="headlessui-dialog-panel-14"
                    data-headlessui-state="open"
                  >
                    <div class="relative">
                      <input
                        class="block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
                        placeholder="Find anything..."
                        aria-label="Search components"
                        id="headlessui-combobox-input-15"
                        // role="combobox"
                        type="text"
                        // aria-expanded="true"
                        // aria-autocomplete="list"
                        data-headlessui-state="open"
                        onChange={(event) => setQuery(event.target.value)}
                        tabindex="0"
                        // style="caret-color: rgb(107, 114, 128);"
                      />
                      <svg
                        class="pointer-events-none absolute right-4 top-4 h-6 w-6 fill-slate-400"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    {
                    // eslint-disable-next-line
                    data.filter((user) => {
                        if (query === "") {
                          //if query is empty
                          return null;
                        } else if (
                          user.name.toLowerCase().includes(query.toLowerCase())
                        ) {
                          //returns filtered array
                          return user;
                        }
                      })
                      .map((user, index) => (
                        <a
                          key={index}
                          href={`http://localhost:3000/user/${user._id}`}
                          className="border-solid border-2 hover:border-dashed border-white flex bg-gray-700  rounded-lg mt-2 mb-2 text-white hover:text-black hover:bg-white"
                        >
                          <div className="h-12 w-12 rounded-lg overflow-hidden border-r-2">
                            <img src={user.image} alt={user.name} />
                          </div>
                          <div className="ml-2 text-sm grid m-auto ">
                            <p>
                              {user.name} {user.lname}
                            </p>
                            <p>{user.email}</p>
                          </div>
                          {/* <div className="flex justify-center items-center w-24 ">
                          <button className="flex justify-center items-center border-solid border-2 w-24 m-2 rounded-lg ">
                            <i class="bx bx-plus"></i><p className="text-sm"> add</p>
                          </button>
                        </div> */}
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            ) : null}

            <Disclosure.Panel className="sm:hidden border-2 bg-gray-800 border-gray-900 rounded-b-lg">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {!localStorage.getItem("token") ? (
        console.log("user dose'n loged in")
      ) : (
        <Sidebar />
      )}
    </>
  );
}
