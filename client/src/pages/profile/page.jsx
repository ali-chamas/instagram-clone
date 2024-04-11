import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { sendRequest } from "../../request-method/request";
const Profile = () => {
  const user_id = useParams().user_id;
  const getUser = async () => {
    try {
      const res = await sendRequest("GET", `get-user/${user_id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return <div></div>;
};

export default Profile;
