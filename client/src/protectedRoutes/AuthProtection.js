import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navigate, Outlet } from "react-router-dom";
const AuthProtection = () => {
  const { token } = useContext(UserContext);
  return !token ? <Navigate to={"/login"} /> : <Outlet />;
};

export default AuthProtection;
