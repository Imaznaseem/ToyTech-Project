// components/Login.jsx

import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/login/",
        { username, password },
        { withCredentials: true }  // Skicka cookies med förfrågan
      );
      onLoginSuccess();
    } catch (error) {
      setError("Fel användarnamn eller lösenord");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Logga in</h2>
      <div>
        <label>Användarnamn:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Lösenord:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Logga in</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
