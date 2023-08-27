import UserContext from "./userContext"
import { useState } from "react"

const UserState = (props) => {
  // const host = "http://localhost:3005";
  // const userInitial = [];
  // const [user, setUser] = useState(userInitial);
  const [user, setUser] = useState("");
  
  // Get all Notes
  const getUser = async (e) => {
    
    // API Call
    const response = await fetch("http://localhost:3005/api/auth/getuser", {
      method: "POST",
      headers: {
       "auth-token": localStorage.getItem("token"),
     },
   });
   
   const json = await response.json();


   setUser(json);
  //  console.log(json);
  };
  //  console.log(user);
  
  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
export default UserState;