// src/Router.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import SignupPage from "../components/SignupPage";
import DashboardPage from "../components/Dashboard";

const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? <Outlet /> : <Navigate to="/signup" />;
};

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route exact path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
