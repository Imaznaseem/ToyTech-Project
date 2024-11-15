import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin"; // Import the Admin component
import api from "./api"; // Assume you have a helper for making API requests

function Logout() {
  Cookies.remove("access_token"); // Clear the access token cookie
  return <Navigate to="/home" />; // Redirect to the home page
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("access_token"));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      async function fetchAdminStatus() {
        try {
          const res = await api.get("/api/user/status/"); // Fetch admin status
          setIsAdmin(res.data.is_staff); // Set isAdmin based on the response
        } catch (error) {
          console.error("Failed to fetch admin status", error);
          setIsAdmin(false); // Default to false if the request fails
        }
      }
      fetchAdminStatus();
    }
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to /home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Home page accessible at /home */}
        <Route
          path="/home"
          element={<Home isAuthenticated={isAuthenticated} />}
        />

        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/home" />}
        />

        <Route path="/logout" element={<Logout />} />

        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/home" />}
        />

        {/* Admin page route */}
        <Route
          path="/admin"
          element={
            isAuthenticated && isAdmin ? (
              <Admin />
            ) : (
              <Navigate to="/home" /> // Redirect non-admins to home
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
