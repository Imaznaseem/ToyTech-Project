import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
    const navigate = useNavigate();

    const workshops = [
        {
            id: 1,
            title: "Technology Workshop",
            description: "Explore the fascinating world of technology through hands-on activities and challenges.",
        },
        {
            id: 2,
            title: "Engineering Workshop",
            description: "Dive into engineering concepts with practical experiments and projects.",
        },
    ];

    const handleBookingRedirect = (workshopId) => {
        navigate(`/booking/${workshopId}`);
    };

    return (
        <div className="home-container">
            <h1>Welcome to Our Workshops</h1>
            {workshops.map((workshop) => (
                <div key={workshop.id} className="workshop-card">
                    <h2>{workshop.title}</h2>
                    <p>{workshop.description}</p>
                    <button onClick={() => handleBookingRedirect(workshop.id)}>
                        Book Now
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Home;

