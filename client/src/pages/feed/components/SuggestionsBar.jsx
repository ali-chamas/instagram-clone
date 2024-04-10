import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../../request-method/request";
import UsersBriefInfo from "../../../common/components/UsersBriefInfo";
const SuggestionsBar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    const res = await sendRequest("GET", "/get-recommendations?_limit=1");
    const data = res.data;
    setSuggestions(data.recommendations);
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="suggestion flex column big-gap">
      <div className="w-full flex justify-between">
        <p className="text-gray font-larger">Suggested for you</p>
        <b className="cursor-pointer" onClick={() => navigate("/followings")}>
          See All
        </b>
      </div>
      <div className="flex column gap">
        {suggestions.length > 0 &&
          suggestions.map((sug, i) => (
            <UsersBriefInfo key={i} user={sug.following} />
          ))}
      </div>
    </div>
  );
};

export default SuggestionsBar;
