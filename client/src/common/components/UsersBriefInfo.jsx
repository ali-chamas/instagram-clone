import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/usersBriefInfo.css";
import profileImage from "../../assets/profile.png";
const UsersBriefInfo = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="user-brief-info flex gap align-center">
      <img src={user.image ? user.image : profileImage} alt="" />
      <div className="flex column small-gap">
        <h3
          className="cursor-pointer"
          onClick={() => navigate(`/profile/${user.id}`)}
        >
          {user.username}
        </h3>
        <p className="text-gray">{user.name}</p>
      </div>
    </div>
  );
};

export default UsersBriefInfo;
