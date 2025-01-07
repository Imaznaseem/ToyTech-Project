import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import { fetchWorkshops } from "./api/workshops";
import { fetchBlogPosts } from "./api/blogposts"; // Import for fetching blogs
import ManageWorkshopsPage from "./pages/ManageWorkshopsPage";
import ManageBlogsPage from "./pages/ManageBlogsPage"; // Import ManageBlogsPage

function App() {
  const [workshops, setWorkshops] = useState([]);
  const [blogs, setBlogs] = useState([]); // State for blogs

  // Funktion för att hämta workshops
  const refreshWorkshops = async () => {
    try {
      const data = await fetchWorkshops();
      setWorkshops(data);
    } catch (error) {
      console.error("Failed to fetch workshops:", error);
    }
  };

  // Funktion för att hämta bloggar
  const refreshBlogs = async () => {
    try {
      const data = await fetchBlogPosts();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  // Hämta workshops och bloggar vid laddning av applikationen
  useEffect(() => {
    refreshWorkshops();
    refreshBlogs();
  }, []);

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
          
          {/* Hantera Workshops */}
          <Route
            path="/admin/manage-workshops"
            element={
              <ProtectedRoute>
                <ManageWorkshopsPage
                  workshops={workshops}
                  onRefresh={refreshWorkshops}
                />
              </ProtectedRoute>
            }
          />

          {/* Hantera Bloggar */}
          <Route
            path="/admin/manage-blogs"
            element={
              <ProtectedRoute>
                <ManageBlogsPage
                  blogs={blogs}
                  onRefresh={refreshBlogs}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
