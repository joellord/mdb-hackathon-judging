import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import PrivateRoute from "../utils/PrivateRoute";
import Scorecards from "../pages/Scorecards";
import Scorecard from "../pages/Scorecard";
import Register from "../pages/Register";

export const AppRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/" element={<PrivateRoute/>}>
            <Route path="/scorecards" element={<Scorecards />} />
            <Route path="/scorecards/:id" element={<Scorecards />} />
            <Route path="/scorecards/:id/:scorecardId" element={<Scorecard />} />
          </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}