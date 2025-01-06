<<<<<<< HEAD
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

=======
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {


  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/* Startsidan visar dashboard, tillgänglig för alla */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Admin-login, tillgänglig för alla */}
          <Route
            path="/admin/login"
            element={<Login />}
          />

          {/* Skyddad admin-dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

>>>>>>> testing_frontend
export default App;
