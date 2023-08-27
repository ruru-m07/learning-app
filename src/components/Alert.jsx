import React from "react";

function Alert(props) {
  // const capitalize = (word) => {
  //   const lower = word.toLowerCase();
  //   return lower.charAt(0).toUpperCase() + lower.slice(1);
  // };

  return (
    // <div style={{ height: "50px" }}>
    //   {props.alert && (
    //     <div
    //       className={`alert alert-${props.alert.type} alert-dismissible fade show`}
    //       role="alert"
    //     >
    //       <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
    //     </div>
    //   )}
    // </div>

    // https://tailwindtemplates.io/templates?category=alert

    <div>
      {props.alert && (
        <div className="relative">
          <div class="p-8 space-y-4 absolute">
            <div class="flex shadow-lg rounded-lg">
              <div class="bg-green-600 py-4 px-6 rounded-l-lg flex items-center border border-l-transparent border-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-white fill-current"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                  ></path>
                </svg>
              </div>
              <div className="px-4 w-fit py-6 bg-Slate-500 dark:text-white rounded-r-lg flex justify-between items-center w-96 border border-l-transparent border-gray-200">
                <div>{props.alert.msg}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alert;
