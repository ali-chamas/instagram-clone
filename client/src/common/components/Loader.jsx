import React from "react";
import "../styles/loader.css";

const Loader = () => {
  return (
    <div className="flex center loader-container">
      <img
        src="https://samherbert.net/svg-loaders/svg-loaders/grid.svg"
        className="loader"
        alt=""
      />
    </div>
  );
};

export default Loader;
