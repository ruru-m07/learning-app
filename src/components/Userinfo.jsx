import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Userinfo = () => {
  const params = useParams();
  const id = params.id;
  // console.log(params);

  const [userdata, setUserdata] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3005/api/auth/getalluser/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((userdata) => {
        console.log(userdata, "userdata");
        setUserdata(userdata.user);
      });
    // eslint-disable-next-line
  }, []);


  console.log(userdata);

  return (
    <div className="ml-20 mt-2 h-screen bg-gray-800">
      <div className="rounded-tl-3xl bg-gray-700 flex items-center justify-center ">
        <div className="mr-40">

        <img src={userdata.image} className="mt-5 rounded-full w-40" alt={userdata.name} />
        </div>
        <div className="text-white">
            <span>{userdata.name} </span>
          <span>{userdata.lname}</span>
          <h3>{userdata.email}</h3>

        </div>
        
      </div>
    </div>
  );
};

export default Userinfo;
