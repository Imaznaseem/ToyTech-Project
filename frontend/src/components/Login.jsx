// components/Login.jsx

import React, { useState } from "react";
import axios from "axios";
import { Box, Button, FormControl, FormLabel, Input, Text, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/login/",
        { username, password },
        { withCredentials: true }
      );
      const { role } = response.data; // Kontrollera rollen från svaret
      if (role === "admin") {
        navigate("/admin");
      } else {
        onLoginSuccess();
      }
    } catch (error) {
      setError("Fel användarnamn eller lösenord");
    }
  };

  return (
    <Box maxWidth="400px" mx="auto" mt="50px" p="20px" borderRadius="8px" boxShadow="md" bg="white">
      <Heading as="h2" size="lg" mb="4" textAlign="center">
        Logga in
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Användarnamn:</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Lösenord:</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Logga in
        </Button>
        {error && <Text color="red.500" mt="2">{error}</Text>}
      </form>
    </Box>
  );
};

export default Login;
