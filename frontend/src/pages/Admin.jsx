import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Admin.css";

function Admin() {
    const [workshops, setWorkshops] = useState([]);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [date, setDate] = useState("");
    const [availableSlots, setAvailableSlots] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchWorkshops();
    }, []);

    // Fetch all workshops from the API
    const fetchWorkshops = async () => {
        try {
            const res = await api.get("/api/workshops/");
            setWorkshops(res.data);
        } catch (error) {
            console.error("Error fetching workshops:", error);
            alert("Failed to load workshops. Please refresh the page.");
        }
    };

    // Handle adding a booking date to the selected workshop
    const handleAddDate = async (e) => {
        e.preventDefault();

        // Ensure all fields are filled
        if (!selectedWorkshop || !date || !availableSlots || !location) {
            alert("Please fill out all fields.");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                date,
                available_slots: parseInt(availableSlots, 10),
                location,
                workshop_id: selectedWorkshop.id, // Pass the selected workshop ID
            };

            const token = localStorage.getItem("ACCESS_TOKEN");

            await api.post("/api/admin/add-booking-date/", payload, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass authorization header
                },
            });

            alert(`Date successfully added for "${selectedWorkshop.title}"!`);
            // Reset form fields
            setDate("");
            setAvailableSlots("");
            setLocation("");
            setSelectedWorkshop(null);
        } catch (error) {
            console.error("Error adding booking date:", error);
            alert("Failed to add date. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-container">
            <h1>Admin Panel</h1>
            <p>Assign dates to workshops to make them available for booking.</p>

            {/* List all workshops */}
            <div className="workshops-container">
                {workshops.map((workshop) => (
                    <div
                        className={`workshop-card ${
                            selectedWorkshop?.id === workshop.id ? "selected" : ""
                        }`}
                        key={workshop.id}
                        onClick={() => setSelectedWorkshop(workshop)}
                    >
                        <h2>{workshop.title}</h2>
                        <p>{workshop.description}</p>
                    </div>
                ))}
            </div>

            {/* Form to assign date to the selected workshop */}
            <form onSubmit={handleAddDate} className="assign-date-form">
                {selectedWorkshop && (
                    <p>
                        <strong>Selected Workshop:</strong> {selectedWorkshop.title}
                    </p>
                )}
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Available Slots:
                    <input
                        type="number"
                        min="1"
                        value={availableSlots}
                        onChange={(e) => setAvailableSlots(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Date"}
                </button>
            </form>
        </div>
    );
}

export default Admin;

