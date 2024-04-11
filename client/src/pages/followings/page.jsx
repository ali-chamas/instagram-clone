import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import MyFollowers from "./components/MyFollowers";
import Requests from "./components/Requests";
import MyFollowings from "./components/MyFollowings";
import { UserContext } from "../../context/userContext";
import { sendRequest } from "../../request-method/request";
import Loader from "../../common/components/Loader";

const Follwings = () => {
  const { user } = useContext(UserContext);

  const [switchTo, setSwitchTo] = useState("requests");
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [triggerRequests, setTriggerRequests] = useState(false);
  const [triggerFollowings, setTriggerFollowings] = useState(false);
  const [loading, setLoading] = useState(false);

  const getRequests = async () => {
    setLoading(true);
    try {
      const res = await sendRequest("GET", "/get-requests");
      const data = res.data;
      setRequests(data.requests);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getFollowings = async () => {
    setLoading(true);
    try {
      const res = await sendRequest("GET", "/get-follow");
      const data = res.data;
      setFollowers(data.followers);
      setFollowings(data.followings);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getFollowings();
  }, [triggerFollowings, triggerRequests]);

  useEffect(() => {
    getRequests();
  }, [triggerRequests]);

  return (
    <section className="flex w-full column align-center p followings">
      <div className="flex align-center gap">
        <h3
          className={`btn-p border-radius ${
            switchTo == "requests" && "bg-blue"
          }`}
          onClick={() => setSwitchTo("requests")}
        >
          Requests
        </h3>
        <h3
          className={`btn-p border-radius ${
            switchTo == "followers" && "bg-blue"
          }`}
          onClick={() => setSwitchTo("followers")}
        >
          Followers
        </h3>
        <h3
          className={`btn-p border-radius ${
            switchTo == "followings" && "bg-blue"
          }`}
          onClick={() => setSwitchTo("followings")}
        >
          Followings
        </h3>
      </div>
      {loading ? (
        <Loader />
      ) : switchTo == "requests" ? (
        <Requests
          user={user}
          requests={requests}
          setTrigger={setTriggerRequests}
        />
      ) : switchTo == "followers" ? (
        <MyFollowers
          user={user}
          followers={followers}
          setTrigger={setTriggerFollowings}
        />
      ) : (
        <MyFollowings
          user={user}
          followings={followings}
          setTrigger={setTriggerFollowings}
        />
      )}
    </section>
  );
};

export default Follwings;
