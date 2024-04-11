import React from "react";
import UsersBriefInfo from "./UsersBriefInfo";
import { sendRequest } from "../../request-method/request";

const FollowUserCard = ({ user, setTrigger }) => {
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
    const reqBody = { following_id: user.id };
    try {
      const res = await sendRequest(
        "DELETE",
        `/cancel-follow/${user.id}`,
        reqBody
      );
      console.log(res);
      setTrigger((t) => !t);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex align-center w-full justify-between">
      <UsersBriefInfo user={user} />
      {user.is_followed_by_user && !user.is_requested_by_user ? (
        <p className="text-danger cursor-pointer" onClick={handleUnFollow}>
          Unfollow
        </p>
      ) : !user.is_followed_by_user && user.is_requested_by_user ? (
        <p
          className="text-danger cursor-pointer"
          type="button"
          onClick={handleUnFollow}
        >
          Cancel
        </p>
      ) : (
        <p
          className="text-blue cursor-pointer"
          type="button"
          onClick={handleFollow}
        >
          Follow
        </p>
      )}
    </div>
  );
};

export default FollowUserCard;
