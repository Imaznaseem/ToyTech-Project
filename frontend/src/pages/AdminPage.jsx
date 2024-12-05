// components/AdminPage.jsx

import React from "react";

const AdminPage = () => {
  const styles = {
    container: {
      paddingTop: "80px",
      background: "linear-gradient(180deg, #104470 0%, #FFFFFF 100%)",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <p>Välkommen till adminpanelen!</p>
    </div>
  );
};

export default AdminPage;
