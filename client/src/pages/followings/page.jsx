import React, { useState } from "react";
import "./style.css";
const Follwings = () => {
  const [switchTo, setSwitchTo] = useState("requests");
  return (
    <section className="flex w-full column align-center p followings">
      <div className="flex align-center gap">
        <h3
          className={`btn-p border-radius ${
            switchTo == "requests" && "bg-blue"
          }`}
        >
          Requests
        </h3>
        <h3>Following</h3>
        <h3>Followers</h3>
      </div>
    </section>
  );
};

export default Follwings;
