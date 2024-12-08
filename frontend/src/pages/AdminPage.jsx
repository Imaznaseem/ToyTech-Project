import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutButton } from "../components/Logout"; 

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const Navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await fetch("/api/admin/check/", {
          method: "GET",
          credentials: "include", // Skicka med sessionscookie
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Användare validerad:", data);
          setIsAuthenticated(true); // Användaren är autentiserad
        } else {
          console.error("Validering misslyckades:", response.status);
          Navigate("/api/admin/login"); // Om valideringen misslyckas
        }
      } catch (error) {
        console.error("Fel vid validering:", error);
        Navigate("/api/admin/login"); // Vid fel
      } finally {
        setLoading(false);
      }
    };

    validateUser();
  }, [Navigate]);

  if (loading) {
    return <div>Kontrollerar behörighet...</div>;
  }

  if (!isAuthenticated) {
    return null; // Blockera rendering om inte autentiserad
  }


  return (
    <div>
      <h1>Admin Page</h1>
      {/* Lägg till admin-funktioner här */}
      <LogoutButton />

    </div>
  );
};

export default AdminPage;
