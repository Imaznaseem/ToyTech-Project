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
        <ul>
            {workshops.map((workshop) => (
                <li key={workshop.id}>{workshop.title}</li>
            ))}
        </ul>
    );
};

export default WorkshopList;
