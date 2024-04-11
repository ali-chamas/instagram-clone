import React, { useState } from "react";
import SuggestionsBar from "./components/SuggestionsBar";
import "./style.css";
import Posts from "./components/Posts";
const Feed = () => {
  return (
    <div className="flex justify-between w-full p">
      <Posts />
      <SuggestionsBar />
    </div>
  );
};

export default Feed;
