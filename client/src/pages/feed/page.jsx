import React from "react";
import SuggestionsBar from "./components/SuggestionsBar";
import "./style.css";
const Feed = () => {
  return (
    <div className="flex justify-between w-full p">
      posts
      <SuggestionsBar />
    </div>
  );
};

export default Feed;
