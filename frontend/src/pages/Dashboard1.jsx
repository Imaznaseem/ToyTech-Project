import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import technologyImage from '../assets/technology1.png'; // Import the technology image
import engineeringImage from '../assets/engineering.png'; // Import the engineering image

const Dashboard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const workshops = [
    {
      id: 1,
      title: "Technology",
      description: "Bygg och programmera med Micro:bit och upplev den senaste teknologin inom AI och VR.",
      image: technologyImage
    },
    {
      id: 2,
      title: "Engineering",
      description: "Designa och bygg robotar med LEGO Spike och lär dig grunderna i mekanik och konstruktion.",
      image: engineeringImage
    },
  ];

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
      <div id="workshops-section" style={styles.workshopsContainer}>
        {workshops.map((workshop, index) => (
          <div
            key={workshop.id}
            style={
              hoveredIndex === index
                ? { ...styles.workshopBox, ...styles.workshopBoxHover }
                : styles.workshopBox
            }
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={workshop.image}
              alt={`${workshop.title} Workshop`}
              style={styles.workshopImage}
            />
            <h3 style={styles.workshopTitle}>{workshop.title}</h3>
            <p style={styles.workshopDescription}>{workshop.description}</p>
            {/* Show "BOKA" endast on hover */}
            {hoveredIndex === index && (
              <button style={styles.button}>Boka</button>
            )}
          </div>
        ))}
      </div>

      {/* About Us Section */}
      <section id="about-us" style={styles.section}>
        <h2 style={styles.heading}>Om oss</h2>
        <p style={styles.infoText}>
          Vi är passionerade läkar- och ingenjörsstudenter som erbjuder interaktiva workshops för att inspirera unga att
          utforska teknikens värld. Genom praktiska och engagerande aktiviteter väcker vi intresse för vetenskap, teknik,
          ingenjörskonst och matematik (STEM). Välkommen till ToyTech, där vi tillsammans formar en framtid av innovatörer!
        </p>
        <h3 style={styles.subHeading}>Varför välja oss</h3>
        <ul style={styles.whyChooseUsList}>
          <li>
            <strong>Inspirera Innovatörer:</strong> Våra workshops engagerar barn i STEM-ämnen genom praktiska och roliga aktiviteter.
          </li>
          <li>
            <strong>Senaste Tekniken:</strong> Vi använder den senaste teknologin inom AI och andra framväxande områden.
          </li>
          <li>
            <strong>Kreativt Lärande:</strong> Interaktivt och roligt lärande är vårt fokus.
          </li>
          <li>
            <strong>Förebilder:</strong> Våra ledare är studenter från prestigefyllda utbildningar som delar sina kunskaper och passioner med nästa generation.
          </li>
        </ul>
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.section}>
        <h2 style={styles.heading}>Contact</h2>
        <p style={styles.infoText}>Phone: +46 734 438 006</p>
        <p style={styles.infoText}>Email: kontakt@toytech.com</p>
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
    background: 'linear-gradient(180deg, #104470 0%, #FFFFFF 100%)',
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
    color: 'black',
    marginBottom: '50px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  workshopsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      gap: '20px', // Mellanrum mellan workshops
      padding: '20px', // Padding runt innehållet
  },
  workshopBox: {
    width: '250px',
    height: '450px',
    background: '#A4D5FD',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  workshopBoxHover: {
    transform: 'scale(1.05)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  },
  workshopImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  workshopTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1F476B',
    marginBottom: '10px',
  },
  workshopDescription: {
    fontSize: '16px',
    color: '#555',
    textAlign: 'center',
    marginBottom: '20px',
  },
  button: {
    alignSelf: 'center',
    width: '173px',
    height: '40px',
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
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
  whyChooseUsList: {
    listStyleType: 'disc',
    margin: '0 auto',
    padding: '0',
    maxWidth: '800px',
    textAlign: 'left',
    color: '#333',
    lineHeight: '1.8',
  },
  subHeading: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '20px 0 10px',
    color: '#333',
  },
};

export default Dashboard;
