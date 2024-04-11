import React from "react";
import { useNavigate } from "react-router-dom";
const UserPosts = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <div className="user-posts-cointainer">
      {posts.map((post, i) => (
        <img
          key={i}
          src={post.images[0].image}
          alt=""
          className="post-image"
          onClick={() => navigate(`/post/${post.id}`)}
        />
      ))}
    </div>
  );
};

export default UserPosts;
