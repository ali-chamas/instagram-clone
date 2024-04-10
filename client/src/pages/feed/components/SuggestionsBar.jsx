import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../../request-method/request";
const SuggestionsBar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    const res = await sendRequest("GET", "/get-recommendations");
    console.log(res);
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="suggestion flex column gap">
      <div className="w-full flex justify-between">
        <p className="text-gray font-larger">Suggested for you</p>
        <b className="cursor-pointer" onClick={() => navigate("/followings")}>
          See All
        </b>
      </div>
      <div></div>
    </div>
  );
};

export default SuggestionsBar;
