import React, { useState } from "react";
import { Container, Form, Button, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const SignUp = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");

  const handleSignUp = async () => {
    const response = await axiosInstance.post("/login/", {
      username: "testadmin",
      password: "testadmin",
    });
    if (response) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("authToken", response?.data?.token);
      alert("User created successfully");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      alert("Something went wrong");
    }
  };

  const handleContinue = async () => {
    if (!validateEmail(email)) {
      console.log("pppp");

      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    try {
      setStep(2);
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  console.log("emailError", emailError);

  return (
    <div>
      <Container
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <img src="logo.png" alt="Logo" style={{ marginBottom: "20px" }} />{" "}
          {/* Replace with your logo */}
        </div>
        {step === 1 && (
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h2 className="mb-3">STEP 1</h2>
            <h4 className="mb-4">Enter your email address to continue</h4>
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: emailError ? "block" : "none" }}
                  >
                    {emailError}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Button
                variant="dark"
                onClick={handleContinue}
                className="w-100 mt-3"
              >
                Continue
              </Button>
            </Form>
          </div>
        )}
        {step === 2 && (
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h2 className="mb-3">STEP 2</h2>
            <h4 className="mb-4">Create an account to continue</h4>
            <Form>
              <Form.Group controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Choose a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!emailError}
                />
              </Form.Group>
              <Button
                variant="dark"
                onClick={() => handleSignUp()}
                className="w-100 mt-3"
              >
                Agree & Continue
              </Button>
            </Form>
          </div>
        )}
        <footer className="mt-5">
          <Navbar bg="dark" variant="dark">
            <Nav className="m-auto">
              <Nav.Link href="#">Privacy Policy</Nav.Link>
              <Nav.Link href="#">Contact Us</Nav.Link>
              <Nav.Link href="#">Cookie Preferences</Nav.Link>
              <Nav.Link href="#">Corporate Information</Nav.Link>
            </Nav>
          </Navbar>
        </footer>
      </Container>
    </div>
  );
};

export default SignUp;
