import React, { useContext } from "react";
import feedLogo from "../../assets/feed-logo.PNG";
import "../styles/sidebar.css";
import { IoMdHome } from "react-icons/io";
import { UserContext } from "../../context/userContext";
import profileImage from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { IoPeopleSharp } from "react-icons/io5";
const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  console.log(user);
  return (
    <div className="flex column justify-between h-full sidebar p">
      <div className="flex column gap">
        <img className="logo" src={feedLogo} alt="" />
        <div className="flex column">
          <h3
            className="w-full p flex align-center gap"
            onClick={() => navigate("/")}
          >
            <span className="large-font">
              <IoMdHome />
            </span>{" "}
            Home
          </h3>
          <h3
            className="w-full p flex align-center gap"
            onClick={() => navigate("/followings")}
          >
            <span className="large-font">
              <IoPeopleSharp />
            </span>{" "}
            Followings
          </h3>
          <h3
            className="w-full p flex align-center gap"
            onClick={() => navigate(`/profile/${user.id}`)}
          >
            {user ? (
              <img
                className="profile"
                src={!user.image ? profileImage : user.image}
                alt=""
              />
            ) : (
              <div className="image-loader" />
            )}
            Profile
          </h3>
        </div>
      </div>
      <button
        type="button"
        className="bg-danger self-center btn-style text-white"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
