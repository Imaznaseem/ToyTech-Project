import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Booking from "./pages/Booking"; // Import the Booking page
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public home page */}
        <Route path="/" element={<Home />} />

        {/* Booking route */}
        <Route path="/booking/:workshopId" element={<Booking />} />

        {/* Protected admin page */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        />

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
