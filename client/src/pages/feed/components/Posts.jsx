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
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPots();
  }, []);
  return (
    <div className="flex column align-center big-gap w-full">
      {loading ? (
        <Loader />
      ) : !posts.length > 0 ? (
        "no posts from your followings"
      ) : (
        posts.map((post, i) => <SinglePost key={i} post={post} />)
      )}
    </div>
  );
};

export default Posts;
