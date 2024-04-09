import React from "react";
import loginLogo from "../../../assets/login-logo.PNG";

const SignupForm = ({ switchLogin }) => {
  return (
    <div className="form-container flex column gap ">
      <form className="flex column gap border-gray p align-center">
        <img src={loginLogo} alt="" />
        <input type="text" placeholder="name" className="login-input" />
        <input type="text" placeholder=" email" className="login-input" />
        <input type="text" placeholder="username" className="login-input" />
        <input type="text" placeholder="password" className="login-input" />
        <button className="btn-style font-larger bg-blue text-white w-full">
          Singup
        </button>
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
