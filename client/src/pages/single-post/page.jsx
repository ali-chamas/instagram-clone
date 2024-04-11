import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendRequest } from "../../request-method/request";
import Loader from "../../common/components/Loader";
import SinglePost from "../../common/components/SinglePost";
import Comment from "./components/Comment";
const Post = () => {
  const post_id = useParams().post_id;

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [input, setInput] = useState("");

  const getPost = async () => {
    setLoading(true);
    try {
      const res = await sendRequest("GET", `get-post/${post_id}`);
      setPost(res.data.post);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getComments = async () => {
    setLoading(true);
    try {
      const res = await sendRequest("GET", `/get-comments/${post_id}`);
      setComments(res.data.comments);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const addComment = async () => {
    try {
      const res = await sendRequest("POST", `/add-comment/${post_id}`, {
        comment: input,
      });
      console.log(res);
      setTrigger((t) => !t);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    getComments();
  }, [trigger]);

  console.log(comments);
  return (
    <div className="w-full flex column gap align-center p">
      {loading ? (
        <Loader />
      ) : (
        post.length > 0 && (
          <div className="flex column gap align-center">
            <SinglePost post={post[0]} />
            <div className="flex small-gap align-center ">
              <textarea
                type="text"
                placeholder="add comment"
                className="input w-full"
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="button"
                className="btn-style bg-blue text-white"
                onClick={addComment}
              >
                Add
              </button>
            </div>
            <div className="w-full flex column gap">
              {!comments.length > 0
                ? "add the first comment"
                : comments.map((comment, i) => (
                    <Comment key={i} comment={comment} />
                  ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Post;
