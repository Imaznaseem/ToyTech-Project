import React, { useEffect, useState } from "react";
import { fetchWorkshops } from "../api/workshops";

const WorkshopList = () => {
    const [workshops, setWorkshops] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadWorkshops = async () => {
            try {
                const data = await fetchWorkshops();
                setWorkshops(data);
            } catch (err) {
                setError(err.message);
            }
        };

        loadWorkshops();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {workshops.map((workshop) => (
                <div key={workshop.id} style={{ border: "1px solid #ddd", padding: "10px", width: "200px" }}>
                    <img
                        src={`http://localhost:8000${workshop.image}`} // Kombinera backend URL och bildsökväg
                        alt={workshop.title}
                        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                    />
                    <h3>{workshop.title}</h3>
                    <p>{workshop.description}</p>
                </div>
            ))}
        </div>
    );
};

export default WorkshopList;
