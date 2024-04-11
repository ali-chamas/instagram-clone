import React, { useEffect, useState } from "react";
import { sendRequest } from "../../../request-method/request";
import UsersBriefInfo from "../../../common/components/UsersBriefInfo";
import Loader from "../../../common/components/Loader";
const Requests = ({ user, requests, setTrigger }) => {
  const handleAccept = async (id) => {
    try {
      const res = await sendRequest("GET", `/accept-request/${id}`);

      console.log(res);
      setTrigger((t) => !t);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await sendRequest("DELETE", `/reject-request/${id}`);
      console.log(res);
      setTrigger((t) => !t);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p flex column gap requests-container w-full h-max align-center">
      {!requests.length > 0
        ? "No requests yet"
        : requests.map((req, i) => (
            <div
              className="flex w-full justify-between req-container align-center"
              key={i}
            >
              <UsersBriefInfo user={req.follower} />
              <div className="flex gap">
                <p
                  className=" text-blue cursor-pointer"
                  onClick={() => handleAccept(req.id)}
                >
                  accept
                </p>
                <p
                  className=" text-danger cursor-pointer"
                  onClick={() => handleReject(req.id)}
                >
                  decline
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Requests;
