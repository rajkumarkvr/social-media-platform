import React, { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken } from "./setToken";
const UserContext = createContext(null);
export const useProfile = () => {
  return useContext(UserContext);
};
const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("_auth") || null));
    setAuthToken(JSON.parse(localStorage.getItem("_auth") || null));
    setCurrentUser(JSON.parse(localStorage.getItem("_user")) || null);
  }, []);
  return (
    <UserContext.Provider value={{ currentUser, token ,setCurrentUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
