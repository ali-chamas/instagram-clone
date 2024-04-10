import { createContext } from "react";
import { useState } from "react";
import { sendRequest } from "../request-method/request";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const login = async (username_email, password) => {
    const reqBody = {
      username_email: username_email,
      password: password,
    };
    try {
      const res = await sendRequest("POST", "/login", reqBody);
      const data = res.data;
      setUser(data.user);
      setToken(data.authorisation.token);
      window.localStorage.setItem("token", data.authorisation.token);
      console.log(res);
    } catch (error) {
      return error.response.data.message;
    }
  };

  const logout = async () => {
    try {
      const res = await sendRequest("GET", "/logout");

      console.log(res);
      setUser(null);
      setToken(null);
      window.localStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (name, username, email, password) => {
    const reqBody = {
      name: name,
      username: username,
      email: email,
      password: password,
    };
    try {
      const res = await sendRequest("POST", "/register", reqBody);
      const data = res.data;
      setUser(data.user);
      setToken(data.authorisation.token);
      window.localStorage.setItem("token", data.authorisation.token);
      console.log(res);
    } catch (error) {
      return error.response.data.message;
    }
  };

  return (
    <UserContext.Provider value={{ token, user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
