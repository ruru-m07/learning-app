import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services";
import userContext from "./context/userContext";
import Userinfo from "./components/Userinfo";
import Pagenotfound from "./components/Pagenotfound";
import Uploadpost from "./components/Uploadpost";


function App() {
  const [alert, setAlert] = useState(null);

  const [user, setUser] = useState("");
  const context = useContext(userContext);
  const { getUser } = context;

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  useEffect(() => {
    (async () => {
    if (localStorage.getItem("token")) {
      getUser();
      const userinfo = await getUser()
      setUser(userinfo);
    } else {
      console.log("auth noy found");
    }
  })();
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <Router>
        {/* <div className="grid h-screen md:w-full"> */}
        <Navbar user={user} />
        {/* <Sidebar /> */}
        <Alert alert={alert} />
        <div className="grid md:w-full">
          <Routes>
            <Route
              exact
              path="/"
              element={<Home showAlert={showAlert} user={user} />}
            ></Route>
            <Route
              exact
              path="/about"
              element={<About showAlert={showAlert} />}
            ></Route>
            <Route exact path="/user/:id" element={<Userinfo />}></Route>
            <Route
              exact
              path="/services"
              element={<Services showAlert={showAlert} />}
            ></Route>
            <Route
              exact
              path="/contact"
              element={<Contact showAlert={showAlert} />}
            ></Route>
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            ></Route>
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            ></Route>
            <Route
              exact
              path="/uploadpost"
              element={<Uploadpost />}
            ></Route>
          <Route path="*" element={<Pagenotfound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
