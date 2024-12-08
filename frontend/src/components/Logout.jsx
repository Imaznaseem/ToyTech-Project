import { logout } from "../api";

export const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await logout();
            console.log("Du har loggats ut.");
            window.location.href = "/admin/login"; // Navigera till login-sidan
        } catch (error) {
            console.error("Kunde inte logga ut:", error);
        }
    };

    return <button onClick={handleLogout}>Logga ut</button>;
};

export default LogoutButton;