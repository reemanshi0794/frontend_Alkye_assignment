import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import axiosInstance from "../axios"; // Import the Axios instance with defaults

const DashboardPage = () => {
  const getDashboardContent = async () => {
    const response = await axiosInstance.get();
  };

  useEffect(() => {
    getDashboardContent();
  }, []);
  return (
    <Container>
      <h2>Dashboard</h2>
      <p>Welcome to the dashboard!</p>
    </Container>
  );
};

export default DashboardPage;
