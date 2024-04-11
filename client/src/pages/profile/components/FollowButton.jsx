import React from "react";
import { sendRequest } from "../../../request-method/request";

export const FollowButton = ({ user, setTrigger }) => {
  const handleFollow = async () => {
    const reqBody = { following_id: user.id };
    try {
      const res = await sendRequest("POST", "/send-request", reqBody);
      console.log(res);
      setTrigger((t) => !t);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnFollow = async () => {
    try {
      const res = await sendRequest("DELETE", `/cancel-follow/${user.id}`);
      console.log(res);
      setTrigger((t) => !t);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {user.is_followed_by_user ? (
        <button
          className="bg-danger text-white btn-style"
          onClick={handleUnFollow}
        >
          Unfollow
        </button>
      ) : user.is_requested_by_user ? (
        <button
          className="bg-danger text-white btn-style"
          onClick={handleUnFollow}
        >
          Cancel
        </button>
      ) : (
        <button className="bg-blue text-white btn-style" onClick={handleFollow}>
          Follow
        </button>
      )}
    </div>
  );
};
