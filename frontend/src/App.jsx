import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Uppdatera tillståndet till inloggad
  };

  return (
    <ChakraProvider>
      <Router>
        <div>
          <Routes>
            {/* Omdirigera startsidan direkt till dashboard */}
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />
            <Route
              path="/register"
              element={<Register onRegisterSuccess={() => console.log("Registrering lyckades!")} />}
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLoginSuccess} />
              }
            />
            <Route
              path="/dashboard"
              element={<Dashboard isAuthenticated={isAuthenticated} />}
            />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;