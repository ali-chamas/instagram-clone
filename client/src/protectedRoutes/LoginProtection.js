import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navigate, Outlet } from "react-router-dom";
const LoginProtection = ({ children }) => {
  const { token } = useContext(UserContext);
  return token ? <Navigate to={"/"} /> : <Outlet />;
};

export default LoginProtection;
