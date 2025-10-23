import "./checkoutStyles.css";
import Visa from "../../assets/visa.png";
import MasterCard from "../../assets/mastercard.png";
import Maestro from "../../assets/maestro.png";
import Discover from "../../assets/discover.jpeg";
import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import AuthContext from "../../components/AuthContext";
import { Button, Col } from "react-bootstrap";
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
    event.preventDefault()
    event.stopPropagation();
    if(form.checkValidity()===false){
        return
    } else {
        purchaseSubmit()
    }

    setValidated(true);
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
        alert("Purchase completed successfully!")
        navigate('/')
      })
      .catch((error) => {
        console.error("Error purchasing your cart:", error.message);
      });
  };

  return (
    <>
      <section className="container">
        <h1>Checkout</h1>
        <div className="form-control my-3 gap-2">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="d-flex flex-row align-items-between justify-content-start gap-3 p-4 w-100"
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            <div className="d-flex flex-column align-items-start">
              <Form.Group controlId="validationName" className="w-100">
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

              <Form.Group controlId="validationSurname" className="w-100">
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

              <Form.Group controlId="validationEmail" className="w-100">
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

              <Form.Group controlId="validationPhone" className="w-100">
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

              <Form.Group controlId="validationCity" className="w-100">
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

              <Form.Group controlId="validationAddress" className="w-100">
                <Form.Label>Address</Form.Label>
                <Form.Control required type="text" placeholder="123 Main St" />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationZip" className="w-100">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control required type="text" placeholder="e.g. 12345" />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip code.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="w-100">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>
            </div>

            <div className="d-flex flex-column align-items-center">
              <div className="cardsDiv d-flex align-items-center justify-content-center gap-3">
                <img className="w-80px" src={Visa} />
                <img className="w-80px" src={MasterCard} />
                <img className="w-80px" src={Maestro} />
                <img className="w-80px" src={Discover} />
              </div>
              <Form.Group className="mb-3 w-100" controlId="cardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  pattern="^(\d{4}\s){3}\d{4}$"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid 16-digit card number (e.g. 1234 5678 9012
                  3456).
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex align-items-center justify-content-center">
                <Form.Group as={Col} controlId="expMonth">
                  <Form.Label>Expiration (MM)</Form.Label>
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

                {/* Expiration Year */}
                <Form.Group as={Col} controlId="expYear">
                  <Form.Label>Expiration (YY)</Form.Label>
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

                {/* CVV */}
                <Form.Group as={Col} controlId="cvv">
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
              </div>
              <div className="my-2 d-flex flex-column w-100">
                <p className="d-flex align-items-center justify-content-between">
                    <span className="fs-2">Subtotal</span> <span className="fs-2 text-success">{subtotal}$</span>
                </p>
                <hr />
                <p className="d-flex align-items-center justify-content-between">
                    <span className="fs-2">Shipping</span> <span className="fs-2">FREE</span>
                </p>
                <hr />
                <p className="d-flex align-items-center justify-content-between">
                    <span className="fs-2">Total</span> <span className="fs-2 text-success">{subtotal}$</span>
                </p>
                <Button variant="danger" type="submit" className="w-50">
                    Place order
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
}
