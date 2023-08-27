import React, { useContext, useEffect } from "react";
import userContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const context = useContext(userContext);
  const { user } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log(null);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  // console.log(user);

  return (
    <div className="ml-16 bg-gray-800 h-screen text-white" >
      <h1
        key={user._id}
        className="ml-20 mt-10 text-5xl"
      >
        Hello {user.name}
      </h1>
    </div>
  );
};
export default Home;
