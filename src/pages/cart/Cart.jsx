import axios from "axios";
import "./cartStyles.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getCartProducts();
  }, []);

  useEffect(() => {
    const total = cartProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartProducts]);

  const getCartProducts = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${baseUrl}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCartProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const token = localStorage.getItem("token");

    if (newQuantity < 1) return;

    axios
      .put(
        `${baseUrl}/cart/${productId}?quantity=${newQuantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getCartProducts();
      })
      .catch((error) => {
        console.error("Error updating quantity:", error.message);
      });
  };

  const handleRemove = (productId) => {
    const token = localStorage.getItem("token");
    console.log("Product ID:", productId);

    axios
      .delete(`${baseUrl}/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getCartProducts();
      })
      .catch((error) => {
        console.error("Error removing product:", error.message);
      });
  };

  return (
    <>
      <section className="container my-4">
        <h1 className="mb-4">Cart</h1>
        {cartProducts.length > 0 ? (
          <>
            <Table
              striped
              bordered
              hover
              responsive
              className="align-middle shadow-sm"
            >
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price ($)</th>
                  <th>Quantity</th>
                  <th>Subtotal ($)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="d-flex align-items-center">
                      <img
                        src={product.imageUrl}
                        width="60"
                        height="60"
                        className="me-3 rounded shadow-sm"
                        alt={product.model}
                      />
                      <span>
                        {product.brand} {product.model}
                      </span>
                    </td>
                    <td>${product.price}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(product.productId, +e.target.value)
                        }
                        className="w-80px"
                      />
                    </td>
                    <td>${(product.price * product.quantity).toFixed(2)}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemove(product.productId)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end mt-4">
              <div className="border p-3 rounded shadow-sm">
                <h4>Total: ${totalPrice.toFixed(2)}</h4>
                <Button variant="success" className="w-100 mt-2">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center my-5">
            <h3 className="text-muted">Your cart is empty</h3>
          </div>
        )}
      </section>
    </>
  );
}
