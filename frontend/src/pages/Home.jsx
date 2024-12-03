import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";

function Home() {
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        fetchWorkshopsWithDates();
    }, []);

    const fetchWorkshopsWithDates = async () => {
        const token = localStorage.getItem("ACCESS_TOKEN"); // Use your access token
        try {
            const res = await api.get("/api/workshops/with-dates/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setWorkshops(res.data);
        } catch (error) {
            console.error("Error fetching workshops with dates:", error);
        }
    };
    
    

    const handleBooking = async (workshopId) => {
        try {
            await api.post("/api/bookings/", { workshop: workshopId });
            alert("Booking successful!");
        } catch (error) {
            console.error("Error booking workshop:", error);
            alert("Failed to book workshop. Please try again.");
        }
    };

    return (
        <div className="home-container">
            <h1>Welcome to the Workshops</h1>
            <div className="workshops-container">
                {workshops.map((workshop) => (
                    <div className="workshop-card" key={workshop.id}>
                        <h2>{workshop.title}</h2>
                        <p>{workshop.description}</p>
                        <p>
                            <strong>Date:</strong> {workshop.date}
                        </p>
                        <p>
                            <strong>Time:</strong> {workshop.time}
                        </p>
                        <p>
                            <strong>Location:</strong> {workshop.location}
                        </p>
                        <p>
                            <strong>Available Slots:</strong> {workshop.available_slots}
                        </p>
                        <button onClick={() => handleBooking(workshop.id)}>
                            Book Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;

