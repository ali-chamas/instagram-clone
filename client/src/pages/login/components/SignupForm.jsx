import React, { useContext, useState } from "react";
import loginLogo from "../../../assets/login-logo.PNG";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
const SignupForm = ({ switchLogin }) => {
  const navigate = useNavigate();
  const { register } = useContext(UserContext);

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const res = await register(
      user.name,
      user.username,
      user.email,
      user.password
    );
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
          placeholder="name"
          className="login-input"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="text"
          placeholder=" email"
          className="login-input"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="username"
          className="login-input"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
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
          onClick={handleSignup}
        >
          Singup
        </button>
        {error && <p className="text-danger">{error}</p>}
      </form>
      <div className="border-gray p flex small-gap center ">
        <p>Already have an account yet?</p>
        <b
          className="text-blue cursor-pointer"
          onClick={() => switchLogin(true)}
        >
          Signup
        </b>
      </div>
    </div>
  );
};

export default SignupForm;
