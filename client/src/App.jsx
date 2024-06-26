import React from "react";
import Login from "./pages/login/page";
import "./common/styles/utilities.css";
import "./common/styles/colors.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProtection from "./protectedRoutes/AuthProtection";
import LoginProtection from "./protectedRoutes/LoginProtection";
import Followings from "./pages/followings/page";
import Feed from "./pages/feed/page";
import Profile from "./pages/profile/page";
import Layout from "./common/components/Layout";

import Post from "./pages/single-post/page";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthProtection />}>
            <Route path="/" element={<Layout children={<Feed />} />} />
            <Route
              path="/profile/:user_id"
              element={<Layout children={<Profile />} />}
            />
            <Route
              path="/followings"
              element={<Layout children={<Followings />} />}
            />
            <Route
              path="/post/:post_id"
              element={<Layout children={<Post />} />}
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
