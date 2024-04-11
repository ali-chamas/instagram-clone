import React, { useEffect, useState } from "react";

import FollowUserCard from "../../../common/components/FollowUserCard";

const MyFollowers = ({ user, followers, setTrigger }) => {
  return (
    <div className="p flex column gap requests-container w-full h-max align-center">
      {!followers.length > 0
        ? "no follwers yet"
        : followers.map((follower, i) => (
            <FollowUserCard
              key={i}
              user={follower.follower}
              setTrigger={setTrigger}
            />
          ))}
    </div>
  );
};

export default MyFollowers;
