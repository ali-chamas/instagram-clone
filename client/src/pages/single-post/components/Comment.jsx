import React from "react";
import UsersBriefInfo from "../../../common/components/UsersBriefInfo";

const Comment = ({ comment }) => {
  const user = {
    id: comment.id,
    name: comment.name,
    image: comment.image,
    username: comment.username,
  };
  return (
    <div className="flex w-full big-gap align-center p bg-primary border-radius">
      <UsersBriefInfo user={user} />
      <p>{comment.pivot.comment}</p>
    </div>
  );
};

export default Comment;
