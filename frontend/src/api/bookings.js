// api/bookings.js
import { updateCsrfToken } from "../utils"; // Assuming you have this function

export const fetchBookings = async () => {
    const response = await fetch("/api/bookings/", {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": updateCsrfToken(), // Hämta uppdaterad CSRF-token
          },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch bookings");
    }
    return response.json();
};

export const createBooking = async (data) => {
    const response = await fetch("/api/bookings/create/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": updateCsrfToken(), // Add CSRF token here
        },
        body: data,
    });
    if (!response.ok) {
        throw new Error("Failed to create booking");
    }
    return response.json();
};

export const updateBooking = async (id, data) => {
    const response = await fetch(`/api/bookings/${id}/`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": updateCsrfToken(), // Hämta uppdaterad CSRF-token
          },
        body: data,
    });
    if (!response.ok) {
        throw new Error("Failed to update booking");
    }
    return response.json();
};

export const deleteBooking = async (id) => {
    const response = await fetch(`/api/bookings/${id}/`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": updateCsrfToken(), // Hämta uppdaterad CSRF-token
          },
    });
    if (!response.ok) {
        throw new Error("Failed to delete booking");
    }
};
