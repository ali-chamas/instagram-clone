import React, { useContext, useState } from "react";
import loginLogo from "../../../assets/login-logo.PNG";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
const LoginForm = ({ switchLogin }) => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [user, setUser] = useState({ username_email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await login(user.username_email, user.password);
    if (typeof res == "string") {
      setError(res);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="form-container flex column gap ">
      <form className="flex column gap border-gray p align-center">
        <img src={loginLogo} alt="" />
        <input
          type="text"
          placeholder="username or email"
          className="login-input"
          onChange={(e) => setUser({ ...user, username_email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          className="login-input"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          type="button"
          className="btn-style font-larger bg-blue text-white w-full"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <p className="text-danger">{error}</p>}
      </form>
      <div className="border-gray p flex small-gap center ">
        <p>Don't have an account yet?</p>
        <b
          className="text-blue cursor-pointer"
          onClick={() => switchLogin(false)}
        >
          Signup
        </b>
      </div>
    </div>
  );
};

export default LoginForm;
