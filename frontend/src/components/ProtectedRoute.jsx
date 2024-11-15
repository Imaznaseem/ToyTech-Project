import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import Cookies from "js-cookie";  // Prefer cookies for secure token storage

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => handleUnauthorized());
    }, []);

    const handleUnauthorized = () => {
        Cookies.remove(ACCESS_TOKEN);
        Cookies.remove(REFRESH_TOKEN);
        setIsAuthorized(false);
    };

    const refreshToken = async () => {
        const refreshToken = Cookies.get(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                Cookies.set(ACCESS_TOKEN, res.data.access, { secure: true, sameSite: 'Strict' });
                setIsAuthorized(true);
            } else {
                handleUnauthorized();
            }
        } catch (error) {
            console.error("Failed to refresh token:", error);
            handleUnauthorized();
        }
    };

    const auth = async () => {
        const token = Cookies.get(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decode payload safely
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
