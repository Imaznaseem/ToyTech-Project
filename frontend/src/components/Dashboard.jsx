// components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png'; // Adjust the path to where your image is stored

const Dashboard = ({ isAuthenticated }) => {
  const [workshops, setWorkshops] = useState([]);
  const [authView, setAuthView] = useState(false);

  useEffect(() => {
    // Fetch workshops data when component mounts
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/workshops/');
        setWorkshops(response.data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    fetchWorkshops();

    // Set authenticated view if the user is authenticated
    if (isAuthenticated) {
      setAuthView(true);
    }
  }, [isAuthenticated]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={logo} alt="ToyTech Logo" style={styles.logo} />
        <h1 style={styles.title}>
          Upptäck våra interaktiva STEM-workshops som inspirerar barn att utforska teknik och kreativitet genom lek!
        </h1>
      </div>

      {/* Content for authenticated users */}
      {authView ? (
        <div style={styles.authContent}>
          <h2>Welcome, authenticated user!</h2>
          <p>This is a special view only visible to logged-in users.</p>
        </div>
      ) : (
        <p>You are viewing as a guest. Please log in to see additional content.</p>
      )}

      {/* Displaying workshops */}
      <div style={styles.workshopsContainer}>
        {workshops.map((workshop) => (
          <div key={workshop.id} style={styles.workshopCard}>
            <h3>{workshop.title}</h3>
            <p>{workshop.description}</p>
            <p>Location: {workshop.location}</p>
            <p>Available Slots: {workshop.available_slots}</p>
            <p>Date: {workshop.date}</p>
            <p>Time: {workshop.time}</p>
            <button style={styles.button}>Läs mer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#e0e7ff',
    padding: '20px',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflowX: 'hidden',
    boxSizing: 'border-box',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    maxWidth: '80%',
  },
  logo: {
    width: '50%',  // Set width as a percentage of the parent container
    height: 'auto',
    marginBottom: '10px',
  },
  title: {
    fontSize: '1.8rem',
    color: '#333',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  authContent: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  workshopsContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '1200px',
  },
  workshopCard: {
    backgroundColor: '#f0f4ff',
    padding: '15px',
    borderRadius: '8px',
    width: '200px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default Dashboard;
