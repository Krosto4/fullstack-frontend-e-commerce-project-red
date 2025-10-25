import axios from "axios";
import "./registerStyles.css";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Register() {
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    authorithatedUserCheck();
  });

  const authorithatedUserCheck = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    } else {
      return;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const validateForm = () => {
    if (formData.password.length < 6) {
      setError("Your password must have more than 6 symbols!");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Password do not match!");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false || !validateForm()) {
      setValidated(true);
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;

    axios
      .post(`${baseUrl}/auth/register`, dataToSend)
      .then((response) => {
        console.log(response.data);
        alert(
          response.data.message
            ? `Successful registration: ${response.data.message}`
            : "Registration completed successfully!"
        );
        setFormData({
          name: "",
          surname: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          alert(`Registration error: ${error.response.data}`);
        } else if (error.request) {
          alert(`Request error: No response from the server`);
        } else {
          alert(`Unknown error: ${error.message}`);
        }
      });

    setValidated(true);
  };

  return (
    <>
      <div className="container formDiv">
        <h1>Create an account</h1>
        <Form
          onSubmit={handleSubmit}
          validated={validated}
          noValidate
          className="d-flex flex-column justify-content-center"
        >
          <Form.Group className="mb-3 formGroup" controlId="validationCustom01">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              type="text"
              placeholder="Enter your name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 formGroup" controlId="validationCustom02">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
              type="text"
              placeholder="Enter your surname"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-3 formGroup"
            controlId="validationCustomEmail"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
              placeholder="Enter your email"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-3 formGroup"
            controlId="validationCustomUsername"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              type="text"
              placeholder="Choose a username"
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-3 formGroup"
            controlId="validationCustomPassword"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              type="password"
              minLength={6}
              placeholder="Enter your password"
            />
            <Form.Control.Feedback type="invalid">
              {error || "Please provide a password."}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-3 formGroup"
            controlId="validationCustomConfirmPassword"
          >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              type="password"
              minLength={6}
              placeholder="Confirm your password"
            />
            <Form.Control.Feedback type="invalid">
              {error || "Passwords must match."}
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="registerBtn" type="submit" variant="danger">
            Create an account
          </Button>

          <span className="my-4">
            Already have an account?{" "}
            <Link className="text-danger" to={"/login"}>
              Log in
            </Link>
          </span>
        </Form>
      </div>
    </>
  );
}
