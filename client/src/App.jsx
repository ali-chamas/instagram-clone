import React from "react";
import Login from "./pages/login/page";
import "./common/styles/utilities.css";
import "./common/styles/colors.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
