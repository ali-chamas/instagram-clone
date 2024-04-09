import React, { useState } from "react";
import "./style.css";

import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="login-section flex gap center">
      <img src="https://i.imgur.com/P3Vm1Kq.png" alt="Instagram Screenshots" />
      {isLogin ? (
        <LoginForm switchLogin={setIsLogin} />
      ) : (
        <SignupForm switchLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Login;
