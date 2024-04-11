import React from "react";
import FollowUserCard from "../../../common/components/FollowUserCard";
const MyFollowings = ({ user, followings, setTrigger }) => {
  return (
    <div className="p flex column gap requests-container w-full h-max align-center">
      {!followings.length > 0
        ? "no followings yet"
        : followings.map((following, i) => (
            <FollowUserCard
              key={i}
              user={following.following}
              setTrigger={setTrigger}
            />
          ))}
    </div>
  );
};

export default MyFollowings;
