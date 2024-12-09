import { updateCsrfToken } from "../utils"; // Anpassa om sökvägen är annorlunda

// api/workshops.js

export const fetchWorkshops = async () => {
    const response = await fetch("/api/workshops/", {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch workshops");
    }
    return response.json();
};

export const createWorkshop = async (data) => {
    const response = await fetch("/api/workshops/create/", {
        method: "POST",
        credentials: "include",
        headers: {
            "X-CSRFToken": updateCsrfToken(), // Hämta uppdaterad CSRF-token
          },
        body: data,
    });
    if (!response.ok) {
        throw new Error("Failed to create workshop");
    }
    return response.json();
};

export const updateWorkshop = async (id, data) => {
    const response = await fetch(`/api/workshops/${id}/`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": updateCsrfToken(), // Hämta uppdaterad CSRF-token
          },
        body: data,
    });
    if (!response.ok) {
        throw new Error("Failed to update workshop");
    }
    return response.json();
};

export const deleteWorkshop = async (id) => {
    const response = await fetch(`/api/workshops/${id}/`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": updateCsrfToken(), // Hämta uppdaterad CSRF-token
          },
    });
    if (!response.ok) {
        throw new Error("Failed to delete workshop");
    }
};
