import React, { useState } from "react";
import UsersBriefInfo from "./UsersBriefInfo";
import { PostSlider } from "./PostSlider";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart, FaRegComment } from "react-icons/fa";
import "../styles/singlepost.css";
import { sendRequest } from "../../request-method/request";
import { useNavigate } from "react-router-dom";
const SinglePost = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.is_liked_by_user);
  const [totalLikes, setTotalLikes] = useState(post.total_likes);

  const navigate = useNavigate();

  const toggleLike = async () => {
    try {
      const res = await sendRequest("POST", `/like-post/${post.id}`);

      if (isLiked) {
        setTotalLikes((t) => t - 1);
      } else {
        setTotalLikes((t) => t + 1);
      }
      setIsLiked((l) => !l);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex column gap single-post p bg-primary border-radius">
      <div className="flex justify-between w-full">
        <UsersBriefInfo user={post.user} />
      </div>
      <p>{post.caption}</p>
      <PostSlider images={post.images} />
      <div className="flex w-full justify-between">
        <div className="flex small-gap column align-center">
          {isLiked ? (
            <h2 className="text-danger cursor-pointer" onClick={toggleLike}>
              <FaHeart />
            </h2>
          ) : (
            <h2 className="cursor-pointer" onClick={toggleLike}>
              <FaRegHeart />
            </h2>
          )}
          <p className="text-gray">{totalLikes} likes</p>
        </div>
        <div className="flex small-gap column align-center">
          <h2
            className="cursor-pointer"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            <FaRegComment />
          </h2>
          <p className="text-gray ">{post.total_comments}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
