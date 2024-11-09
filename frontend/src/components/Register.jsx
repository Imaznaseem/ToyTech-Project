// components/Register.jsx

import React, { useState } from "react";
import axios from "axios";

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/user/register/", {
        username,
        email,
        password,
      });
      onRegisterSuccess();
      alert("Registrering lyckades!");
    } catch (error) {
      setError("Kunde inte registrera användare");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registrera dig</h2>
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
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <button type="submit">Registrera</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;
