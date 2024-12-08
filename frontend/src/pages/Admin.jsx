import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/Admin.css";

function Admin() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await api.get("/api/bookings/");
            setBookings(res.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Admin Panel</h1>
            <h2>Bookings</h2>
            <div className="bookings-list">
                {bookings.map((booking) => (
                    <div key={booking.id} className="booking-card">
                        <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
                        <p><strong>Email:</strong> {booking.email}</p>
                        <p><strong>Workshop:</strong> {booking.workshop.title}</p>
                        <p><strong>Organization:</strong> {booking.organizationName}</p>
                        <p><strong>Message:</strong> {booking.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin;


