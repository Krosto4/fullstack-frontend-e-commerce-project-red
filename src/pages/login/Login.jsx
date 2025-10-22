import "./loginStyles.css";

import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import AuthContext from "../../components/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  const { setUser, getUserAccount } = useContext(AuthContext);

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  let navigate = useNavigate();

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

    axios
      .post(`${baseUrl}/auth/login`, formData)
      .then((response) => {
        if (!response.data) {
          throw new Error("No token recieved");
        }
        console.log(response.data);
        alert("Log in succesful!");
        localStorage.setItem("token", response.data);
        getUserAccount();
        setFormData({
          username: "",
          password: "",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          alert(`Login error: ${error.response.data}`);
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
        <h1>Login</h1>
        <Form
          onSubmit={handleSubmit}
          validated={validated}
          noValidate
          className="d-flex flex-column justify-content-center"
        >
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
              placeholder="Enter your password"
              minLength={6}
            />
            <Form.Control.Feedback type="invalid">
              {error || "Please provide a password."}
            </Form.Control.Feedback>
          </Form.Group>
          <Button className="loginBtn" type="submit" variant="danger">
            Login
          </Button>
          <span className="my-4">
            Don't have an account?{" "}
            <Link className="text-danger" to={"/register"}>
              Create an account
            </Link>
          </span>
        </Form>
      </div>
    </>
  );
}
