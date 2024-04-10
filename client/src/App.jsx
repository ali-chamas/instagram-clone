import React from "react";
import Login from "./pages/login/page";
import "./common/styles/utilities.css";
import "./common/styles/colors.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProtection from "./protectedRoutes/AuthProtection";
import LoginProtection from "./protectedRoutes/LoginProtection";

import Feed from "./pages/feed/page";
import Profile from "./pages/profile/page";
import Layout from "./common/components/Layout";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthProtection />}>
            <Route path="/" element={<Layout children={<Feed />} />} />
            <Route
              path="/profile"
              element={<Layout children={<Profile />} />}
            />
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
