import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../apiUtils";

export const LogoutButton = () => {
    const navigate = useNavigate(); // Skapa navigate-instans
    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = "/admin/login";
        } catch (error) {
            console.error("Kunde inte logga ut:", error);
        }
    };

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
            />
            <MenuList>
                <MenuItem onClick={() => navigate("/admin/manage-workshops")}>
                    Hantera Workshops
                </MenuItem>
                <MenuItem onClick={handleLogout} color="red">
                    Logga ut
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default LogoutButton;