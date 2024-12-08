import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Booking.css";

function Booking() {
    const { workshopId } = useParams(); // Get workshop ID from URL
    const navigate = useNavigate(); // To navigate back after booking

    const [formData, setFormData] = useState({
        title: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        organization_type: "school", // Default to 'school'
        organization_name: "",
        postcode: "",
        hear_about_us: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { workshop_id: workshopId, ...formData };
        console.log("Submitting booking with payload:", payload); // Log the payload
        try {
            await api.post("/api/bookings/", payload);
            alert("Booking submitted successfully!");
            navigate("/"); // Redirect to home page
        } catch (error) {
            console.error("Error submitting booking:", error);
            alert("Failed to submit booking. Please check the form and try again.");
        }
    };
    

    return (
        <div className="booking-container">
            <h1>Workshop Booking Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email Address:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Organization Type:
                    <select
                        name="organization_type"
                        value={formData.organization_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="school">School</option>
                        <option value="company">Company</option>
                        <option value="individual">Individual</option>
                    </select>
                </label>
                <label>
                    Organization Name:
                    <input
                        type="text"
                        name="organization_name"
                        value={formData.organization_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Postcode:
                    <input
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    How did you hear about us?
                    <select
                        name="hear_about_us"
                        value={formData.hear_about_us}
                        onChange={handleChange}
                    >
                        <option value="">Select an option</option>
                        <option value="website">Website</option>
                        <option value="social_media">Social Media</option>
                        <option value="word_of_mouth">Word of Mouth</option>
                        <option value="advertisement">Advertisement</option>
                    </select>
                </label>
                <label>
                    Message:
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Provide details such as number of children, year group, and workshop preferences."
                        required
                    />
                </label>
                <button type="submit">Submit Booking</button>
            </form>
        </div>
    );
}

export default Booking;

