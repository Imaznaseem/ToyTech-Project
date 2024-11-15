// components/Dashboard.jsx

import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <Navbar /> {/* Navbar at the top of the dashboard */}
      
      {/* Home Section */}
      <section id="home" style={styles.section}>
        <p style={styles.description}>
          Upptäck våra interaktiva STEM-workshops som inspirerar barn att utforska teknik och kreativitet genom lek!
        </p>
      </section>

      {/* Workshops Section */}
      <div style={styles.workshopsContainer}>
        <div style={styles.workshopBox}></div>
        <div style={styles.workshopBox}></div>
        <div style={styles.workshopBox}></div>
      </div>

      {/* About Us Section */}
      <section id="about-us" style={styles.section}>
        <h2 style={styles.heading}>Om oss</h2>
        <p style={styles.infoText}>
          ToyTech är dedikerat till att skapa interaktiva och lärorika workshops för barn. Vi fokuserar på att uppmuntra kreativitet och teknisk förståelse genom lekfulla och engagerande aktiviteter.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.section}>
        <h2 style={styles.heading}>Contact</h2>
        <p style={styles.infoText}>Phone: +46 123 456 789</p>
        <p style={styles.infoText}>Email: info@toytech.com</p>
        <p style={styles.infoText}>
          <a href="https://instagram.com/toytech" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          {' | '}
          <a href="https://linkedin.com/company/toytech" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </p>
      </section>
    </div>
  );
};

const styles = {
    container: {
      paddingTop: '80px', // Space for the Navbar height
      background: 'linear-gradient(180deg, #7587C1 0%, #FFFFFF 100%)',
      textAlign: 'center',
    },
    section: {
      padding: '60px 20px',
    },
    description: {
      fontFamily: "'Newsreader', serif",
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '36px',
      lineHeight: '120%',
      textAlign: 'center',
      letterSpacing: '-0.02em',
      color: '#FFF9F9',
      marginBottom: '50px',
      maxWidth: '800px',
      margin: '0 auto', // Center the text within its container
    },
    workshopsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      width: '100%',
      maxWidth: '1200px',
      padding: '0 20px',
      marginBottom: '60px', // Add margin for better spacing
    },
    workshopBox: {
      width: '250px',
      height: '400px',
      background: '#FFF9F9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between', // Use space-between to place items at top and bottom
      padding: '20px', // Add padding for inner spacing
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    button: {
      alignSelf: 'center', // Center button horizontally
      width: '173px',
      height: '40px', // Increase height for better vertical alignment
      fontFamily: "'Inter', sans-serif",
      fontWeight: '600',
      fontSize: '20px',
      lineHeight: '130%',
      color: '#FFFFFF',
      backgroundColor: '#1F476B',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center', // Center text vertically
      justifyContent: 'center', // Center text horizontally
      marginTop: 'auto', // Push button to the bottom
    },
    heading: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '20px',
    },
    infoText: {
      fontSize: '18px',
      color: '#333',
      marginBottom: '10px',
    },
  };
  
export default Dashboard;
