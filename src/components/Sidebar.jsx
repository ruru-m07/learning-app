import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const [showModal, setShowModal] = React.useState(false);
  
  let location = useLocation();
   let navigate = useNavigate();

   const handleLogout = () => {
     localStorage.removeItem("token");
     setShowModal(false);
     navigate("/login");
   };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);


  return (
    <div>
      <div className="sidebar bg-gray-800">
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus icon"></i>
          <i className="flex items-center justify-center" id="btn">
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
          </i>
        </div>
        <ul className="nav-list">
          <li>
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search..." />
            <span className="tooltip">Search</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Dashboard</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-user"></i>
              <span className="links_name">User</span>
            </a>
            <span className="tooltip">User</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-chat"></i>
              <span className="links_name">Messages</span>
            </a>
            <span className="tooltip">Messages</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Analytics</span>
            </a>
            <span className="tooltip">Analytics</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-folder"></i>
              <span className="links_name">File Manager</span>
            </a>
            <span className="tooltip">Files</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-cart-alt"></i>
              <span className="links_name">Order</span>
            </a>
            <span className="tooltip">Order</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-heart"></i>
              <span className="links_name">Saved</span>
            </a>
            <span className="tooltip">Saved</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-cog"></i>
              <span className="links_name">Setting</span>
            </a>
            <span className="tooltip">Setting</span>
          </li>
          <li className="profile">
            <div className="profile-details">
              <img src="profile.jpg" alt="profileImg" />
              <div className="name_job">
                <div className="name">Prem Shahi</div>
                <div className="job">Web designer</div>
              </div>
            </div>
            <button onClick={() => setShowModal(true)}>
              <i className="bx bx-log-out" id="log_out"></i>
            </button>
          </li>
        </ul>
        <div className="ml-16"></div>
      </div>
      <div className="mt-16"></div>
      <section className="home-section">
        {showModal ? (
          <>
            <div
              className="relative z-10"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"></div>
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="backdrop-blur transition-opacity opacity-100 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden rounded-lg bg-gray-800 text-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3
                            className="text-base font-semibold leading-6 text-white"
                            id="modal-title"
                          >
                            Logout account
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to logout your account?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        onClick={handleLogout}
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      >
                        Logout
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {/* component */}
      </section>
    </div>
  );
};

export default Sidebar;
