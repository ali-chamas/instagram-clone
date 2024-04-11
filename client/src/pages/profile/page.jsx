import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendRequest } from "../../request-method/request";
import Loader from "../../common/components/Loader";
import "./style.css";
import ProfileInfo from "./components/ProfileInfo";
import UserPosts from "./components/UserPosts";
const Profile = () => {
  const user_id = useParams().user_id;
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await sendRequest("GET", `get-user/${user_id}`);
      console.log(res);
      setUser(res.data.user[0]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [trigger]);
  return loading ? (
    <div className="w-full h-full flex center">
      <Loader />
    </div>
  ) : (
    user && (
      <section className="flex column big-gap profile-section p align-center w-full">
        <ProfileInfo user={user} setTrigger={setTrigger} />
        <UserPosts posts={user.post} />
      </section>
    )
  );
};

export default Profile;
