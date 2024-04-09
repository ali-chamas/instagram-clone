import { createContext } from "react";
import { useState } from "react";
import { sendRequest } from "../request-method/request";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("token"))
  );

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
      console.log(res);
    } catch (error) {
      return error.response.data.message;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem("session");
    window.localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ token, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
