import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../../request-method/request";
import FollowUserCard from "../../../common/components/FollowUserCard";
import Loader from "../../../common/components/Loader";
const SuggestionsBar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const res = await sendRequest("GET", "/get-recommendations");
      const data = res.data;
      console.log(res);

      setSuggestions(data.recommendations);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSuggestions();
  }, [trigger]);

  return (
    <div className="suggestion flex column big-gap">
      <div className="w-full flex justify-between">
        <p className="text-gray font-larger">Suggested for you</p>
        <b className="cursor-pointer" onClick={() => navigate("/followings")}>
          See All
        </b>
      </div>
      <div className="flex column gap">
        {loading ? (
          <Loader />
        ) : suggestions.length > 0 ? (
          suggestions.map((sug, i) => (
            <FollowUserCard
              key={i}
              user={sug}
              res={sug}
              setTrigger={setTrigger}
            />
          ))
        ) : (
          "Follow users to get suggestions"
        )}
      </div>
    </div>
  );
};

export default SuggestionsBar;
