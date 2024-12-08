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

export default App;
