// App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Uppdatera tillståndet till inloggad
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/register"
            element={<Register onRegisterSuccess={() => console.log("Registrering lyckades!")} />}
          />
          {/* Om användaren är autentiserad, omdirigera till /dashboard eller annan skyddad sida */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />
            }
          />
          {/* Exempel på skyddad rutt som användaren endast kan se om de är inloggade */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <h2>Välkommen till Dashboard</h2>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
