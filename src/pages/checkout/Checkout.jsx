import "./checkoutStyles.css";
import Visa from "../../assets/visa.png";
import MasterCard from "../../assets/mastercard.png";
import Maestro from "../../assets/maestro.png";
import Discover from "../../assets/discover.jpeg";
import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import AuthContext from "../../components/AuthContext";
import { Button, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Checkout() {
  const [validated, setValidated] = useState(false);
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();
  const location = useLocation();
  const subtotal = location.state.totalPrice;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    
    setValidated(true);
    purchaseSubmit();
  };

  const purchaseSubmit = () => {
    const token = localStorage.getItem("token");

    axios
      .delete(`${baseUrl}/cart/clear`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Purchase completed successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error purchasing your cart:", error.message);
      });
  };

  return (
    <>
      <section className="container">
        <h1 className="mb-4">Checkout</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="g-4">
            {/* Left side - User Information */}
            <Col lg={6}>
              <div className="border rounded p-4">
                <h4 className="mb-3">Personal Information</h4>
                
                <Form.Group controlId="validationName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your name"
                    value={user.name}
                    readOnly
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validationSurname" className="mb-3">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your surname"
                    value={user.surname}
                    readOnly
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your surname.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validationEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="example@email.com"
                    value={user.email}
                    readOnly
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validationPhone" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    placeholder="+994 55 493 3423"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid phone number.
                  </Form.Control.Feedback>
                </Form.Group>

                <h4 className="mb-3 mt-4">Shipping Address</h4>

                <Form.Group controlId="validationCity" className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your city"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validationAddress" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="123 Main St"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid address.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validationZip" className="mb-3">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="e.g. 12345"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid zip code.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                  />
                </Form.Group>
              </div>
            </Col>

            {/* Right side - Payment Information */}
            <Col lg={6}>
              <div className="border rounded p-4">
                <h4 className="mb-3">Payment Information</h4>

                <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                  <img className="w-80px" src={Visa} alt="Visa" />
                  <img className="w-80px" src={MasterCard} alt="MasterCard" />
                  <img className="w-80px" src={Maestro} alt="Maestro" />
                  <img className="w-80px" src={Discover} alt="Discover" />
                </div>

                <Form.Group className="mb-3" controlId="cardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    pattern="^(\d{4}\s){3}\d{4}$"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid 16-digit card number (e.g. 1234 5678
                    9012 3456).
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Form.Group as={Col} controlId="expMonth" className="mb-3">
                    <Form.Label>Exp. Month (MM)</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="expMonth"
                      placeholder="MM"
                      pattern="^(0[1-9]|1[0-2])$"
                    />
                    <Form.Control.Feedback type="invalid">
                      Invalid month (01–12).
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="expYear" className="mb-3">
                    <Form.Label>Exp. Year (YY)</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="expYear"
                      placeholder="YY"
                      pattern="^\d{2}$"
                    />
                    <Form.Control.Feedback type="invalid">
                      Invalid year (e.g. 26).
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="cvv" className="mb-3">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="cvv"
                      placeholder="123"
                      pattern="^\d{3}$"
                    />
                    <Form.Control.Feedback type="invalid">
                      3-digit code required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <div className="mt-4 border-top pt-3">
                  <h4 className="mb-3">Order Summary</h4>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-5">Subtotal:</span>
                    <span className="fs-5 text-success fw-bold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-5">Shipping:</span>
                    <span className="fs-5 text-success">FREE</span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between mb-3">
                    <span className="fs-4 fw-bold">Total:</span>
                    <span className="fs-4 text-success fw-bold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    variant="danger"
                    type="submit"
                    className="w-100"
                    size="lg"
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </section>
    </>
  );
}