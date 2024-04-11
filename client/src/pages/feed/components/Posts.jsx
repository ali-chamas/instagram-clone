import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { sendRequest } from "../../../request-method/request";
import Loader from "../../../common/components/Loader";
import SinglePost from "../../../common/components/SinglePost";
const Posts = () => {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPots = async () => {
    setLoading(true);
    try {
      const res = await sendRequest("GET", "/get-posts");
      const data = res.data;

      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  console.log(posts);
  useEffect(() => {
    getPots();
  }, []);
  return (
    <div className="flex column align-center big-gap w-full">
      {loading ? (
        <Loader />
      ) : posts && !posts.length > 0 ? (
        "no posts from your followings"
      ) : (
        posts && posts.map((post, i) => <SinglePost key={i} post={post} />)
      )}
    </div>
  );
};

export default Posts;
