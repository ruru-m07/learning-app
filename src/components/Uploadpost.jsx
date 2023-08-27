import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Uploadpost = () => {
  const [image, setImage] = useState();
  const [credentials, setCredentials] = useState({
    name: "azqzaqazq",
    lname: "xedcedce",
    email: "dcedce",
  });

  const submitimage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    console.log("formdata");

    let host = "http://localhost:3005";

    const responce = await fetch(`${host}/api/posts/addpost`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: credentials.name,
        description: credentials.lname,
        tag: credentials.email,
        image: image,
      }),
    }); 

    const json = await responce.json();
    console.log(json);
    if (json.success) {
      // redirect
      Navigate("/");
    } else {
      console.log("Invalid Credentials", "danger");
    }
  };

  const oninputchange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <div className="ml-16 bg-gray-800 h-screen text-white">
      <div className="ml-20 mt-10 ">
        <form onSubmit={submitimage}>
          <input type="file" onChange={oninputchange} action="image/*" />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};

export default Uploadpost;
