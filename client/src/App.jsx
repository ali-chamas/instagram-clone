import React from "react";
import Login from "./pages/login/page";
import "./common/styles/utilities.css";
import "./common/styles/colors.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProtection from "./protectedRoutes/AuthProtection";
import LoginProtection from "./protectedRoutes/LoginProtection";

import Feed from "./pages/feed/page";
import Profile from "./pages/profile/page";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthProtection />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<LoginProtection />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
