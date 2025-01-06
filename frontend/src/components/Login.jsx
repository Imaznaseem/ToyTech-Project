import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, Text, FormControl, FormLabel } from "@chakra-ui/react";
import { getCsrfToken} from "../apiUtils"; // Anpassa om sökvägen är annorlunda 
import { updateCsrfToken } from "../utils"; // Anpassa om sökvägen är annorlunda

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Hämta CSRF-token innan inloggning
      await getCsrfToken();

      // Skicka inloggningsbegäran
      const response = await fetch("/api/admin/login/", {
        method: "POST",
        credentials: "include", // Skicka och ta emot cookies
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": updateCsrfToken(), // Hämta uppdaterad CSRF-token
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Inloggning lyckades:", data);

        // Uppdatera autentiseringsstatus och navigera
        updateCsrfToken(); // Uppdatera CSRF-token efter inloggning
        console.log("navigerar till /admin/dashboard");
        navigate("/admin/dashboard");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || "Inloggningen misslyckades.");
        console.error("Fel vid inloggning:", errorData);
      }
    } catch (error) {
      console.error("Ett fel inträffade:", error);
      setErrorMessage("Ett tekniskt fel inträffade. Försök igen senare.");
    }
  };
  

  return (
    <Box p={6} maxW="400px" mx="auto" mt={10} boxShadow="lg" borderRadius="md" bg="gray.50">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Admin Login
      </Text>
      {errorMessage && <Text color="red.500" mb={4}>{errorMessage}</Text>}
      <form onSubmit={handleLogin}>
        <FormControl id="username" mb={4} isRequired>
          <FormLabel>Användarnamn</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ange användarnamn"
          />
        </FormControl>
        <FormControl id="password" mb={4} isRequired>
          <FormLabel>Lösenord</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ange lösenord"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full" mt={4}>
          Logga in
        </Button>
      </form>
    </Box>
  );
};

export default Login;
