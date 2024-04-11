import React, { useContext } from "react";
import profileImage from "../../../assets/profile.png";
import { UserContext } from "../../../context/userContext";
import { FollowButton } from "./FollowButton";

const ProfileInfo = ({ user, setTrigger }) => {
  const loggedInUser = useContext(UserContext).user;

  return (
    loggedInUser && (
      <div className="flex w-full justify-between align-center profile-info">
        <img
          src={!user.image ? profileImage : user.image}
          alt=""
          className="profile-img"
        />
        <div className="flex column gap ">
          <h1>{user.name}</h1>
          <h3 className="text-gray">{user.username}</h3>
          <div className="flex gap justify-evenly">
            <div className="flex column small-gap">
              <h3> {user.total_followers} followers</h3>
            </div>
            <div className="flex column small-gap">
              <h3> {user.total_followings} followings</h3>
            </div>
          </div>
          <p className="text-gray">{user.bio ? user.bio : "no bio yet"}</p>
          {user.id == loggedInUser.id ? (
            <div className="flex gap ">
              <button className="btn-style bg-primary text-white">
                edit profile
              </button>
            </div>
          ) : (
            <div className="">
              <FollowButton user={user} setTrigger={setTrigger} />
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
