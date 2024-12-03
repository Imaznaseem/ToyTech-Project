import { Navigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import { useEffect, useState } from "react";

function ProtectedAdminRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    async function fetchAdminStatus() {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsAdmin(false);
        return;
      }

      try {
        const res = await api.get("/api/user/status/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAdmin(res.data.is_staff);
      } catch {
        setIsAdmin(false);
      }
    }

    fetchAdminStatus();
  }, []);

  if (isAdmin === null) {
    return <div>Loading...</div>; // While checking admin status
  }

  return isAdmin ? children : <Navigate to="/" />;
}

export default ProtectedAdminRoute;

